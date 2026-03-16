---
trigger: always_on
---

One `<Popup />` component in code.
- Zero hardcoded defaults. Popup only renders if Sanity config exists for that page and `enabled: true`.
- 7-day dismissal via localStorage.
- Sanity Studio may suggest values for new popup configs — these are UI hints only, not code defaults.

---