---
trigger: always_on
---

- All forms use React Hook Form + Zod validation.
- No submission without client-side validation passing.
- Qualifying form (`/start`) is multi-step — each step is a separate component.
- URL param `?service=X` pre-selects the relevant option in Step 2.
- On submit: data to Resend email + Sanity lead document + redirect to `/start/confirmed`.

---