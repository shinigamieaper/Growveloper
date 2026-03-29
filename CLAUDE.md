# Growveloper — Claude Code Rules

## Component Architecture
- New components go in their own directory: `components/ComponentName/index.tsx`
- After creating a component, immediately add its named export to `components/index.ts`
- Every component must define props with a TypeScript `interface` (no inline types)
- Components wrapping a native HTML element must extend `React.ComponentPropsWithoutRef<'element'>` in their props interface
- Before building any new UI, search `components/` for an existing component that fits. If none found, state what you checked and why it doesn't fit.

## Pattern Matching Before Building
- Before creating any new page or component, read 2–3 existing pages/components of similar type to extract layout patterns, data-fetching conventions, animation usage, and prop shapes.
- Mirror the patterns you find — don't invent a new approach when an established one exists in the codebase.
- If the existing pattern has a problem, flag it before deviating from it.

## File Safety
- Before creating any new file, check if the target path already exists. If it does, ask for confirmation before overwriting.

## Dependency Management
- Check `package.json` before implementing complex UI/behaviour — reuse installed libs first
- Proposing a new library requires: name + why existing deps don't suffice + minimal API surface used + bundle/complexity tradeoff — wait for approval before installing
- If a library is added, complete the full integration end-to-end (UI + state + error/loading + cleanup) in the same task — no half-integrations

## Development Workflow
- Define "done" before writing code: restate success criteria in 3–6 bullets. If ambiguous, ask up to 3 targeted questions first.
- Implement only what was requested. Propose "nice-to-haves" separately; build only after confirmation.
- Always ship end-to-end. If missing info blocks completion, list the exact missing inputs and provide the safest partial implementation that compiles.
- End every task with a completion check: build compiles, types pass, imports clean, no placeholder TODOs, loading/error states present where relevant.
