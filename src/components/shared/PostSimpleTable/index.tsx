import type { PostSimpleTableBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostSimpleTableProps extends React.ComponentPropsWithoutRef<"figure"> {
  data: PostSimpleTableBlock;
}

/**
 * Comparison table for Lab posts, built on the pattern that feature and
 * pricing comparison tables actually use:
 *
 * - every comparison column reads as its own object, and the last one, the
 *   option the article is steering the reader towards, sits on a tinted,
 *   bordered panel that runs the full height of the table;
 * - short cell values, with "Yes" / "No" rendered as a check or a cross;
 * - when the table has four or more columns, the last column is treated as
 *   the explanation for the row and set under the row label in the body
 *   serif, so no prose gets squeezed into a quarter of the page;
 * - on phones the same semantic table stacks: one block per row, each cell
 *   carrying its column name as a small label.
 */

const YES = /^(yes|✓|✔|true|included)$/i;
const NO = /^(no|✗|✕|×|false|not included|none)$/i;

function CellValue({ value }: { value: string }) {
  const v = value.trim();
  if (YES.test(v)) {
    return (
      <span className="inline-flex items-center text-brand-mid">
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8.5l3 3 7-7" />
        </svg>
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (NO.test(v)) {
    return (
      <span className="inline-flex items-center text-text-tertiary">
        <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <>{value}</>;
}

const STACKED_CELL =
  "max-md:block max-md:border-0 max-md:px-0 max-md:pb-0 max-md:pt-3 max-md:before:mb-1 max-md:before:block max-md:before:font-mono max-md:before:text-[10px] max-md:before:font-semibold max-md:before:uppercase max-md:before:tracking-[0.16em] max-md:before:text-brand-mid max-md:before:content-[attr(data-label)]";

export function PostSimpleTable({ data, className, ...props }: PostSimpleTableProps) {
  const { caption, columns, rows, sourcesNote } = data;

  if (!columns || columns.length < 2 || !rows || rows.length === 0) return null;

  const count = columns.length;
  const hasNote = count >= 4;
  const noteIndex = hasNote ? count - 1 : -1;
  const compareIndexes = columns.map((_, i) => i).filter((i) => i !== 0 && i !== noteIndex);
  const highlight = compareIndexes[compareIndexes.length - 1];

  // The label column carries the explanation too, so it gets more room.
  const labelWidth = hasNote ? "38%" : "30%";
  const compareWidth = `${(hasNote ? 62 : 70) / compareIndexes.length}%`;

  return (
    <figure className={cn("my-12", className)} {...props}>
      {caption && (
        <div className="mb-5 flex items-baseline gap-3">
          <span aria-hidden className="h-px w-6 shrink-0 translate-y-[-3px] bg-brand-mid" />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
            {caption}
          </p>
        </div>
      )}

      <table className="w-full border-separate border-spacing-0 text-left max-md:block">
        <colgroup className="max-md:hidden">
          <col style={{ width: labelWidth }} />
          {compareIndexes.map((i) => (
            <col key={i} style={{ width: compareWidth }} />
          ))}
        </colgroup>

        <thead className="max-md:sr-only">
          <tr>
            <th scope="col" className="pb-4 pr-6 align-bottom">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary">
                {columns[0]}
                {hasNote ? ` / ${columns[noteIndex]}` : ""}
              </span>
            </th>
            {compareIndexes.map((i) => (
              <th
                key={i}
                scope="col"
                className={cn(
                  "heading-font px-5 pb-4 pt-5 align-bottom text-base font-semibold text-text-primary",
                  i === highlight &&
                    "rounded-t-2xl border-x border-t border-brand-mid/30 bg-brand-mid/[0.07] text-brand-light",
                )}
              >
                {columns[i]}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="max-md:block">
          {rows.map((row, r) => {
            const isLast = r === rows.length - 1;
            const cells = row.cells ?? [];
            const note = hasNote ? (cells[noteIndex] ?? "").trim() : "";
            return (
              <tr
                key={r}
                className="max-md:block max-md:border-b max-md:border-glass-border max-md:py-5 max-md:last:border-b-0"
              >
                <th
                  scope="row"
                  className="border-t border-glass-border py-5 pr-8 align-top max-md:block max-md:border-t-0 max-md:py-0 max-md:pr-0"
                >
                  <span className="heading-font block text-[15px] font-semibold leading-snug text-text-primary md:text-base">
                    {cells[0] ?? ""}
                  </span>
                  {note && (
                    <span
                      className="mt-2 block max-w-[46ch] text-sm leading-relaxed text-text-secondary"
                      style={{ fontFamily: "var(--font-gambetta)" }}
                    >
                      {note}
                    </span>
                  )}
                </th>
                {compareIndexes.map((i) => {
                  const isHighlight = i === highlight;
                  return (
                    <td
                      key={i}
                      data-label={columns[i]}
                      className={cn(
                        "border-t border-glass-border px-5 py-5 align-top text-[15px] leading-relaxed text-text-primary",
                        isHighlight && "border-x border-brand-mid/30 bg-brand-mid/[0.07]",
                        isHighlight && isLast && "rounded-b-2xl border-b",
                        STACKED_CELL,
                        isHighlight &&
                          "max-md:mt-3 max-md:rounded-xl max-md:border max-md:border-brand-mid/30 max-md:bg-brand-mid/[0.07] max-md:p-4 max-md:before:text-brand-light",
                      )}
                    >
                      <CellValue value={cells[i] ?? ""} />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {sourcesNote && (
        <figcaption className="mt-4 max-w-prose text-xs leading-relaxed text-text-tertiary">
          {sourcesNote}
        </figcaption>
      )}
    </figure>
  );
}
