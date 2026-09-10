import type { PostSimpleTableBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PostSimpleTableProps extends React.ComponentPropsWithoutRef<"figure"> {
  data: PostSimpleTableBlock;
}

export function PostSimpleTable({ data, className, ...props }: PostSimpleTableProps) {
  const { caption, columns, rows, sourcesNote } = data;

  if (!columns || columns.length === 0 || !rows || rows.length === 0) return null;

  return (
    <figure className={cn("my-10", className)} {...props}>
      <div className="overflow-hidden rounded-2xl border border-glass-border bg-glass-bg backdrop-blur-md">
        {caption && (
          <div className="border-b border-glass-border px-5 py-4 md:px-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-mid">
              {caption}
            </p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-glass-border bg-bg-secondary/40">
                {columns.map((col, i) => (
                  <th
                    key={`${col}-${i}`}
                    scope="col"
                    className={cn(
                      "px-4 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] md:px-5",
                      i === 0 ? "text-text-tertiary" : "text-brand-mid",
                    )}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={r} className="border-b border-glass-border/60 align-top last:border-b-0">
                  {columns.map((_, c) => {
                    const cell = row.cells?.[c] ?? "";
                    return c === 0 ? (
                      <th
                        key={c}
                        scope="row"
                        className="px-4 py-3 font-medium text-text-primary md:px-5"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={c} className="px-4 py-3 text-text-secondary md:px-5">
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
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
