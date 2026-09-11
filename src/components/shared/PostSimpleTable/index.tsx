import type { PostSimpleTableBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostSimpleTableProps extends React.ComponentPropsWithoutRef<"figure"> {
  data: PostSimpleTableBlock;
}

/**
 * Comparison table for Lab posts.
 *
 * Reads as an editorial ledger rather than a data grid: one semantic <table>,
 * hairline rows, the row label set in the heading face, the comparison cells
 * in the sans, and the last column (the "why" column when there are four or
 * more) set in the body serif and given the most room. Below the md
 * breakpoint the same table stacks: each row becomes a block, each cell
 * carries its column header as a small mono label, so nothing is squeezed
 * into four columns on a phone.
 */
export function PostSimpleTable({ data, className, ...props }: PostSimpleTableProps) {
  const { caption, columns, rows, sourcesNote } = data;

  if (!columns || columns.length === 0 || !rows || rows.length === 0) return null;

  const count = columns.length;
  const hasNote = count >= 4;
  const lastIndex = count - 1;

  // Column widths on md+: the label column stays narrow, the note column wide.
  const widthFor = (i: number): string => {
    if (i === 0) return hasNote ? "20%" : "26%";
    if (hasNote && i === lastIndex) return "36%";
    const remaining = hasNote ? 44 : 74;
    return `${remaining / (hasNote ? count - 2 : count - 1)}%`;
  };

  return (
    <figure className={cn("my-12", className)} {...props}>
      {caption && (
        <div className="mb-4 flex items-baseline gap-3">
          <span aria-hidden className="h-px w-6 shrink-0 translate-y-[-3px] bg-brand-mid" />
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
            {caption}
          </p>
        </div>
      )}

      <table className="w-full border-collapse text-left max-md:block">
        <colgroup className="max-md:hidden">
          {columns.map((_, i) => (
            <col key={i} style={{ width: widthFor(i) }} />
          ))}
        </colgroup>

        <thead className="max-md:sr-only">
          <tr className="border-b border-brand-mid/40">
            {columns.map((col, i) => (
              <th
                key={`${col}-${i}`}
                scope="col"
                className={cn(
                  "pb-3 pr-6 align-bottom font-mono text-[11px] font-semibold uppercase tracking-[0.14em]",
                  i === 0 ? "text-text-tertiary" : "text-brand-mid",
                  i === lastIndex && "pr-0",
                )}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="max-md:block">
          {rows.map((row, r) => (
            <tr
              key={r}
              className="border-b border-glass-border align-top transition-colors last:border-b-0 hover:bg-brand-mid/[0.04] max-md:block max-md:py-5 md:[&>*]:py-5"
            >
              {columns.map((col, c) => {
                const cell = row.cells?.[c] ?? "";
                const isLabel = c === 0;
                const isNote = hasNote && c === lastIndex;

                if (isLabel) {
                  return (
                    <th
                      key={c}
                      scope="row"
                      className="heading-font pr-6 text-[15px] font-semibold leading-snug text-text-primary max-md:block max-md:pb-3 max-md:pr-0 max-md:text-base md:text-base"
                    >
                      {cell}
                    </th>
                  );
                }

                return (
                  <td
                    key={c}
                    data-label={col}
                    className={cn(
                      "pr-6 text-[15px] leading-relaxed",
                      isNote
                        ? "pr-0 text-text-secondary"
                        : "text-text-primary",
                      // Stacked layout: each cell shows its column header as a mono eyebrow.
                      "max-md:block max-md:pr-0 max-md:pt-2 max-md:before:mb-1 max-md:before:block max-md:before:font-mono max-md:before:text-[10px] max-md:before:font-semibold max-md:before:uppercase max-md:before:tracking-[0.16em] max-md:before:text-brand-mid max-md:before:content-[attr(data-label)]",
                      isNote && "max-md:mt-2 max-md:border-t max-md:border-glass-border max-md:pt-3",
                    )}
                    style={isNote ? { fontFamily: "var(--font-gambetta)" } : undefined}
                  >
                    {cell}
                  </td>
                );
              })}
            </tr>
          ))}
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
