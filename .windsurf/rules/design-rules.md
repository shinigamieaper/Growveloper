---
trigger: model_decision
description: most times
---

### Colours — always use CSS variables or Tailwind brand classes. Never hardcode hex.
```css
--color-light:   #aeeeee
--color-mid:     #5ab1b1
--color-dark:    #2b7575
--color-black:   #0a0a0a
--color-white:   #f8f8f8
```

Tailwind config:
```js
colors: {
  brand: { light: '#aeeeee', mid: '#5ab1b1', dark: '#2b7575' },
  base: { black: '#0a0a0a', white: '#f8f8f8' }
}
```

### Typography
- Headings: General Sans (loaded via next/font)
- Body: Gambetta (loaded via next/font)
- Code/terminal sections: JetBrains Mono or Fira Code
- Never use Google Fonts link tags

### Theme
- Dark mode first. All components must work in dark mode.
- Glassmorphism: use `backdrop-blur`, `bg-opacity`, `border border-white/10` for glass cards.
- No solid white card backgrounds — translucent panels only.
