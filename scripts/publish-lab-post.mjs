/**
 * Publish a Lab post to Sanity from a markdown draft.
 *
 * Reads a draft written in the content-ops delivery format (front matter plus
 * markdown body), converts it to Portable Text, uploads the hero image, and
 * writes the blogPost document plus its faq documents with createOrReplace,
 * so re-running on the same slug updates rather than duplicates.
 *
 * Usage:
 *   node scripts/publish-lab-post.mjs <draft.md> [--hero <image.png>] [--dry-run] [--draft]
 *
 *   --dry-run   print the documents that would be written, write nothing
 *   --draft     write to drafts.<id> so the post is visible in Studio but not live
 *
 * Front matter keys (one per line, "key: value"; lists as comma separated):
 *   title, slug, category, tags, excerpt, tldr, pullQuote, metaTitle,
 *   metaDescription, readTime, publishedAt (ISO, defaults to now),
 *   heroAlt, hero (path to a PNG or JPG, relative to the draft, optional),
 *   featured (true/false), showCTA (true/false, default true)
 *
 * Body markdown supported:
 *   ## and ### headings, paragraphs, **bold**, *italic*, `code`,
 *   [text](url) links, - bullets, 1. numbered items, > quotes,
 *   pipe tables (| a | b |) which become simpleTable blocks, and a final
 *   "## Questions people ask" section whose ### questions and following
 *   paragraphs become faq documents (they are removed from the body because
 *   the Lab page renders faq documents in its own accordion).
 *
 * A markdown table whose first header cell is "Line item" and which has exactly
 * three more columns becomes a costTable block instead.
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";

dotenv.config({ path: ".env.local", quiet: true });

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const asDraft = args.includes("--draft");
const heroFlag = args.indexOf("--hero");
const heroOverride = heroFlag >= 0 ? args[heroFlag + 1] : undefined;
const draftPath = args.find((a, i) => !a.startsWith("--") && (heroFlag < 0 || i !== heroFlag + 1));

if (!draftPath) {
  console.error("usage: node scripts/publish-lab-post.mjs <draft.md> [--hero <image>] [--dry-run] [--draft]");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-03-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
});

/* ─── Front matter ─── */

function parseFrontMatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) throw new Error("Draft needs a front matter block delimited by --- lines.");
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    meta[key] = value;
  }
  return { meta, body: src.slice(m[0].length) };
}

const LIST_KEYS = new Set(["tags"]);
const BOOL_KEYS = new Set(["featured", "showCTA"]);

function normaliseMeta(meta) {
  const out = { ...meta };
  for (const k of LIST_KEYS) {
    if (typeof out[k] === "string") {
      out[k] = out[k]
        .replace(/^\[|\]$/g, "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  for (const k of BOOL_KEYS) {
    if (typeof out[k] === "string") out[k] = /^(true|yes|1)$/i.test(out[k]);
  }
  if (out.readTime) out.readTime = Number(String(out.readTime).replace(/\D/g, "")) || undefined;
  return out;
}

/* ─── Portable Text helpers ─── */

let _key = 0;
const k = () => `k${(_key++).toString(36)}`;

function inlineToChildren(text, markDefs) {
  // Tokenise **bold**, *italic*, `code`, [text](url). Nesting of bold inside a link is supported.
  const children = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m;
  const push = (t, marks = []) => {
    if (t) children.push({ _type: "span", _key: k(), text: t, marks });
  };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) push(tok.slice(2, -2), ["strong"]);
    else if (tok.startsWith("`")) push(tok.slice(1, -1), ["code"]);
    else if (tok.startsWith("*")) push(tok.slice(1, -1), ["em"]);
    else {
      const lm = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const linkKey = k();
      markDefs.push({ _type: "link", _key: linkKey, href: lm[2] });
      let label = lm[1];
      const marks = [linkKey];
      if (label.startsWith("**") && label.endsWith("**")) {
        label = label.slice(2, -2);
        marks.push("strong");
      }
      push(label, marks);
    }
    last = m.index + tok.length;
  }
  push(text.slice(last));
  return children;
}

function block(style, text, listItem, level) {
  const markDefs = [];
  const children = inlineToChildren(text, markDefs);
  const b = { _type: "block", _key: k(), style, markDefs, children };
  if (listItem) {
    b.listItem = listItem;
    b.level = level ?? 1;
  }
  return b;
}

function splitRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function tableBlock(lines) {
  const header = splitRow(lines[0]);
  // The separator row (| --- | --- |) is optional; drafts often omit it.
  const hasSeparator = /^\|?\s*:?-{2,}/.test(lines[1]?.trim() ?? "");
  const bodyRows = lines
    .slice(hasSeparator ? 2 : 1)
    .filter((l) => l.trim().startsWith("|"))
    .map(splitRow);
  const isCost = /^line item$/i.test(header[0] ?? "") && header.length === 4;
  if (isCost) {
    const rows = bodyRows.map((r) => ({
      _key: k(),
      label: r[0] ?? "",
      low: r[1] || undefined,
      mid: r[2] || undefined,
      high: r[3] || undefined,
    }));
    const totalIdx = rows.findIndex((r) => /^total/i.test(r.label));
    let totals = {};
    if (totalIdx >= 0) {
      const t = rows.splice(totalIdx, 1)[0];
      totals = { totalLabel: t.label, totalLow: t.low, totalMid: t.mid, totalHigh: t.high };
    }
    return {
      _type: "costTable",
      _key: k(),
      headerLow: header[1],
      headerMid: header[2],
      headerHigh: header[3],
      rows,
      ...totals,
    };
  }
  return {
    _type: "simpleTable",
    _key: k(),
    columns: header,
    rows: bodyRows.map((cells) => ({ _type: "row", _key: k(), cells })),
  };
}

/**
 * Convert markdown to Portable Text blocks. Returns { body, faqs }.
 * The "Questions people ask" section is lifted out into faqs.
 */
function markdownToPortableText(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const body = [];
  const faqs = [];
  let i = 0;
  let inFaq = false;
  let currentFaq = null;
  let paragraph = [];
  let pendingCaption = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    paragraph = [];
    if (!text) return;
    if (inFaq && currentFaq) {
      currentFaq.answer = currentFaq.answer ? `${currentFaq.answer}\n\n${text}` : text;
    } else {
      body.push(block("normal", text));
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      i++;
      continue;
    }

    const h = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flushParagraph();
      const level = h[1].length;
      const text = h[2].trim();
      if (level === 2 && /^questions people ask/i.test(text)) {
        inFaq = true;
        currentFaq = null;
        i++;
        continue;
      }
      if (inFaq) {
        if (level >= 3) {
          currentFaq = { question: text.replace(/\?*$/, "?"), answer: "" };
          faqs.push(currentFaq);
        } else {
          // A new H2 after the FAQ section ends it.
          inFaq = false;
          body.push(block(`h${level}`, text));
        }
        i++;
        continue;
      }
      body.push(block(level === 1 ? "h2" : `h${level}`, text));
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      flushParagraph();
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const t = tableBlock(tableLines);
        if (pendingCaption) {
          if (t._type === "simpleTable") t.caption = pendingCaption;
          else t.title = pendingCaption;
          pendingCaption = null;
        }
        // A line right after the table starting with "Source:" or "Sources:" becomes the note.
        const next = lines[i]?.trim();
        if (next && /^sources?:/i.test(next)) {
          t.sourcesNote = next.replace(/^sources?:\s*/i, "");
          i++;
        }
        body.push(t);
      }
      continue;
    }

    // "Table: caption" line immediately before a table.
    const cap = trimmed.match(/^table:\s*(.+)$/i);
    if (cap && lines[i + 1]?.trim().startsWith("|")) {
      flushParagraph();
      pendingCaption = cap[1].trim();
      i++;
      continue;
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      const q = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        q.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      body.push(block("blockquote", q.join(" ")));
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (inFaq && currentFaq) {
        currentFaq.answer = `${currentFaq.answer ? currentFaq.answer + "\n" : ""}- ${bullet[1]}`;
      } else {
        body.push(block("normal", bullet[1], "bullet", 1));
      }
      i++;
      continue;
    }

    const numbered = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (numbered) {
      flushParagraph();
      if (inFaq && currentFaq) {
        currentFaq.answer = `${currentFaq.answer ? currentFaq.answer + "\n" : ""}${trimmed}`;
      } else {
        body.push(block("normal", numbered[1], "number", 1));
      }
      i++;
      continue;
    }

    paragraph.push(trimmed);
    i++;
  }
  flushParagraph();
  return { body, faqs };
}

/* ─── Hero upload ─── */

async function uploadHero(file) {
  if (!file) return null;
  if (!fs.existsSync(file)) {
    console.warn(`  hero image not found at ${file}, publishing without one`);
    return null;
  }
  const buf = fs.readFileSync(file);
  const ext = path.extname(file).toLowerCase();
  const contentType = ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
  const asset = await client.assets.upload("image", buf, {
    filename: path.basename(file),
    contentType,
  });
  console.log(`  uploaded hero ${path.basename(file)} as ${asset._id}`);
  return asset._id;
}

/* ─── Run ─── */

async function main() {
  const src = fs.readFileSync(draftPath, "utf8");
  const { meta: rawMeta, body: md } = parseFrontMatter(src);
  const meta = normaliseMeta(rawMeta);

  for (const required of ["title", "slug", "excerpt"]) {
    if (!meta[required]) throw new Error(`front matter is missing "${required}"`);
  }
  if (/—/.test(src)) {
    throw new Error("Draft contains an em-dash. Constitution rule 1. Fix the draft before publishing.");
  }

  const { body, faqs } = markdownToPortableText(md);
  if (body.length === 0) throw new Error("Body converted to zero blocks; check the markdown.");

  const slug = meta.slug;
  const idPrefix = asDraft ? "drafts." : "";
  const postId = `${idPrefix}blogPost-${slug}`;

  const heroFile = heroOverride
    ? path.resolve(heroOverride)
    : meta.hero
      ? path.resolve(path.dirname(draftPath), meta.hero)
      : undefined;

  const heroRef = dryRun ? (heroFile ? "dry-run-asset" : null) : await uploadHero(heroFile);

  const post = {
    _id: postId,
    _type: "blogPost",
    title: meta.title,
    slug: { _type: "slug", current: slug },
    excerpt: meta.excerpt,
    ...(meta.tldr ? { tldr: meta.tldr } : {}),
    ...(meta.pullQuote ? { pullQuote: meta.pullQuote } : {}),
    ...(heroRef
      ? {
          heroImage: {
            _type: "image",
            asset: { _type: "reference", _ref: heroRef },
            alt: meta.heroAlt || meta.title,
          },
        }
      : {}),
    body,
    ...(meta.category ? { category: meta.category } : {}),
    ...(meta.tags ? { tags: meta.tags } : {}),
    publishedAt: meta.publishedAt || new Date().toISOString(),
    ...(meta.readTime ? { readTime: meta.readTime } : {}),
    author: "Oyekola Obajuwon",
    featuredToggle: meta.featured === true,
    showCTA: meta.showCTA !== false,
    ...(meta.metaTitle ? { metaTitle: meta.metaTitle } : {}),
    ...(meta.metaDescription ? { metaDescription: meta.metaDescription } : {}),
  };

  const faqDocs = faqs
    .filter((f) => f.question && f.answer)
    .map((f, i) => ({
      _id: `${idPrefix}faq-${slug}-q${i + 1}`,
      _type: "faq",
      question: f.question,
      answer: f.answer,
      page: { _type: "reference", _ref: `blogPost-${slug}` },
      order: i + 1,
    }));

  if (dryRun) {
    console.log(JSON.stringify({ post, faqs: faqDocs }, null, 2));
    console.log(`\n(dry run) ${body.length} body blocks, ${faqDocs.length} faqs, hero: ${heroFile ?? "none"}`);
    return;
  }

  const r1 = await client.createOrReplace(post);
  console.log(`  blogPost written: ${r1._id}`);

  // Replace the post's faq set: delete stale ones beyond the new count, then write.
  const existing = await client.fetch(
    `*[_type == "faq" && page._ref == $id]{_id}`,
    { id: `blogPost-${slug}` },
  );
  const keep = new Set(faqDocs.map((f) => f._id));
  const tx = client.transaction();
  for (const e of existing) if (!keep.has(e._id)) tx.delete(e._id);
  for (const f of faqDocs) tx.createOrReplace(f);
  if (existing.length || faqDocs.length) {
    const r2 = await tx.commit();
    console.log(`  faqs written: ${faqDocs.length} (tx ${r2.transactionId})`);
  }

  console.log(`\nDone. ${asDraft ? "Draft in Studio" : "Live after the next deploy"}: /lab/${slug}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
