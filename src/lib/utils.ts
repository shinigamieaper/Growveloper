import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Returns Tailwind grid classes that adapt to the actual item count.
 * - 1 item: single centered column, constrained width
 * - 2 items: 2-col, constrained width
 * - 3+ items: standard multi-col grid
 *
 * @param count  Number of items in the grid
 * @param maxCols  Maximum columns at the widest breakpoint (2 | 3 | 4)
 */
export function fluidGrid(count: number, maxCols: 2 | 3 | 4 = 3): string {
  if (count === 1) {
    return "grid grid-cols-1 max-w-md mx-auto";
  }
  if (count === 2) {
    return "grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto";
  }
  // 3+
  if (maxCols === 2) {
    return "grid grid-cols-1 sm:grid-cols-2";
  }
  if (maxCols === 4) {
    return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }
  // default: 3
  return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
}
