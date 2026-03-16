---
trigger: always_on
---

Both modes are equal quality. Dark mode is default.

**Theme implementation:**
- CSS variables on `:root` (light) and `[data-theme="dark"]` (dark)
- Theme stored in localStorage as `growveloper-theme`
- Inline script in `<head>` prevents flash of wrong theme:
  ```html
  <script>
    const t = localStorage.getItem('growveloper-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', t);
  </script>
  ```
- Toggle applies `data-theme="dark"` to `<html>`
- Never use Tailwind's `dark:` class variant — use CSS variables exclusively

**CSS variables — always use these, never hardcode:**
```css
/* Light mode (:root) */
--bg-primary: #f8f8f8
--bg-secondary: #ffffff
--bg-tertiary: #f0fafa
--text-primary: #0a0a0a
--text-secondary: #4a4a4a
--text-tertiary: #7a7a7a
--brand-light: #aeeeee
--brand-mid: #5ab1b1
--brand-dark: #2b7575
--glass-bg: rgba(255,255,255,0.7)
--glass-border: rgba(43,117,117,0.15)

/* Dark mode ([data-theme="dark"]) */
--bg-primary: #0a0a0a
--bg-secondary: #111111
--bg-tertiary: #1a1a1a
--text-primary: #f8f8f8
--text-secondary: #a0a0a0
--text-tertiary: #606060
--brand-light: #aeeeee    /* unchanged */
--brand-mid: #5ab1b1      /* unchanged */
--brand-dark: #2b7575     /* unchanged */
--glass-bg: rgba(255,255,255,0.05)
--glass-border: rgba(255,255,255,0.1)
```

**Special cases:**
- Section 06 (Success animation) dark panel: always dark regardless of mode
- Code/terminal sections: always dark regardless of mode
- Brand teal values never change between modes

---
