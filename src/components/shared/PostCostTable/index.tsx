import type { PostCostTableBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostCostTableProps extends React.ComponentPropsWithoutRef<"figure"> {
  data: PostCostTableBlock;
}

export function PostCostTable({ data, className, ...props }: PostCostTableProps) {
  const {
    title,
    headerLow = "Low",
    headerMid = "Mid",
    headerHigh = "High",
    rows,
    totalLabel,
    totalLow,
    totalMid,
    totalHigh,
    sourcesNote,
  } = data;

  if (!rows || rows.length === 0) return null;

  return (
    <figure className={cn("my-10", className)} {...props}>
      <div className="overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md">
        {title && (
          <div className="border-b border-glass-border px-5 py-4 md:px-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
              {title}
            </p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-glass-border bg-bg-secondary/40">
                <th
                  scope="col"
                  className="px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary md:px-6"
                >
                  Line item
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary md:px-4"
                >
                  {headerLow}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-mid md:px-4"
                >
                  {headerMid}
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-right font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-tertiary md:px-4"
                >
                  {headerHigh}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={`${row.label}-${i}`}
                  className="border-b border-glass-border/60 last:border-b-0"
                >
                  <th
                    scope="row"
                    className="px-5 py-3 font-medium text-text-primary md:px-6"
                  >
                    {row.label}
                  </th>
                  <td className="px-3 py-3 text-right tabular-nums text-text-secondary md:px-4">
                    {row.low ?? "—"}
                  </td>
                  <td className="px-3 py-3 text-right font-semibold tabular-nums text-text-primary md:px-4">
                    {row.mid ?? "—"}
                  </td>
                  <td className="px-3 py-3 text-right tabular-nums text-text-secondary md:px-4">
                    {row.high ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
            {(totalLabel || totalLow || totalMid || totalHigh) && (
              <tfoot>
                <tr className="border-t-2 border-brand-mid/30 bg-brand-mid/5">
                  <th
                    scope="row"
                    className="px-5 py-4 font-bold text-text-primary md:px-6"
                  >
                    {totalLabel ?? "Total"}
                  </th>
                  <td className="px-3 py-4 text-right font-bold tabular-nums text-text-primary md:px-4">
                    {totalLow ?? "—"}
                  </td>
                  <td className="px-3 py-4 text-right font-bold tabular-nums text-brand-mid md:px-4">
                    {totalMid ?? "—"}
                  </td>
                  <td className="px-3 py-4 text-right font-bold tabular-nums text-text-primary md:px-4">
                    {totalHigh ?? "—"}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {sourcesNote && (
        <figcaption className="mt-3 px-1 text-xs leading-relaxed text-text-tertiary">
          {sourcesNote}
        </figcaption>
      )}
    </figure>
  );
}
