# Color Palette: Aqua Authority

## Base Brand Colors

- `aquaLight`: `#aeeeee`
- `aquaMid`: `#5ab1b1`
- `aquaDark`: `#2b7575`

## CSS Variables (Light Mode)

Defined in `src/app/globals.css`:

```css
:root {
  --background: #f8fdfd;
  --foreground: #1a2e2e;
  --aqua-light: #aeeeee;
  --aqua-mid: #5ab1b1;
  --aqua-dark: #2b7575;
  --surface: #ffffff;
  --surface-alt: #e8f8f8;
  --muted: #6b8a8a;
  --border: #c5e4e4;
}
```

## CSS Variables (Dark Mode)

```css
.dark {
  --background: #0b1a1a;
  --foreground: #e0f4f4;
  --surface: #112222;
  --surface-alt: #1a3333;
  --muted: #7fb5b5;
  --border: #2b4a4a;
}
```

## Tailwind v4 Theme Token Mapping

In `src/app/globals.css`:

```css
@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-aqua-light: var(--aqua-light);
  --color-aqua-mid: var(--aqua-mid);
  --color-aqua-dark: var(--aqua-dark);
  --color-surface: var(--surface);
  --color-surface-alt: var(--surface-alt);
  --color-muted: var(--muted);
  --color-border: var(--border);
}
```

This enables usage like:

- `bg-background`, `text-foreground`
- `bg-surface`, `bg-surface-alt`
- `border-border`
- `bg-aqua-dark`, `text-aqua-light`, etc.

## Usage Patterns in Components

### Primary Actions (High-Intent CTA)

- Background: `bg-aqua-dark`
- Text: `text-white`
- Hover: `hover:bg-aqua-mid`
- Extra: `hover:scale-105` + `hover:shadow-lg`

Used in:

- `src/components/Navbar/index.tsx` ("Book a Call")
- `src/components/Hero/index.tsx` ("Diagnose My Revenue Leaks")

### Secondary Actions

- Border: `border-border`
- Text: `text-foreground`
- Hover: `hover:border-aqua-mid` + `hover:bg-surface-alt`

Used in:

- `src/components/Hero/index.tsx` ("See How It Works")

### Section Surfaces

- Default sections: `bg-background`
- Alternating sections: `bg-surface-alt`
- Cards: `bg-surface` + `border-border`

Used in:

- `src/components/Services/index.tsx` (section background + cards)
- `src/components/Problem/index.tsx` (cards)
- `src/components/Results/index.tsx` (cards)

### Gradients

- Text gradient: `from-aqua-dark via-aqua-mid to-aqua-light`
- Background gradient: `from-aqua-dark via-aqua-mid to-aqua-dark`

Used in:

- `src/components/Hero/index.tsx` (headline emphasis)
- `src/components/Contact/index.tsx` (CTA block)

### Icons

- Light mode emphasis: `text-aqua-dark`
- Dark mode emphasis: `dark:text-aqua-light`
- Neutral emphasis: `text-aqua-mid`

### Navigation Links

- Default: `text-muted`
- Hover: `hover:text-aqua-dark dark:hover:text-aqua-light`

Used in:

- `src/components/Navbar/index.tsx`
- `src/components/Footer/index.tsx`

## Dark/Light Mode Strategy

- Library: `next-themes`
- Provider: `src/components/ThemeProvider/index.tsx`
- Wired in: `src/app/layout.tsx` via `attribute="class"`
- Default theme: `dark`
- Toggle: `src/components/ThemeToggle/index.tsx`
