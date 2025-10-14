# Repository Guidelines

## Project Structure & Module Organization
- UI apps live in `apps/ev-ui/` and `apps/pr-ui/`; keep feature code under `src/` and share HUD modules across both when possible.  
- `services/aia/` houses the conversational assistant; store guardrail prompts and policy JSON beside each handler for quick review.  
- `libs/tss-client/` exposes reusable WebSocket helpers for NASA TSS telemetry—extend it before touching app-specific sockets.  
- `docs/` tracks proposals, milestones, and test plans; leave code and scripts out of this tree. Add new workspaces by expanding the root `package.json`.

## Build, Test, and Development Commands
- Use Node.js 20 LTS and run `npm install` once to hydrate the workspace symlinks.  
- Scope dependencies with `npm install <pkg> -w <workspace>`; this keeps EV, PR, and AIA stacks clean.  
- Until scaffolding lands, rely on ad-hoc scripts—e.g., run `npx tsc --noEmit --project libs/tss-client` after adding a local `tsconfig.json`—and document any durable command in the owning `package.json`.

## Coding Style & Naming Conventions
- TypeScript modules use 2-space indentation, semicolons, and `const` by default; prefer named exports for clarity.  
- Classes stay `PascalCase`, functions and variables `camelCase`, and constants screaming snake case (`MAX_PACKET_SIZE`).  
- Keep guardrail phrases and telemetry labels concise (`"[TSS] connected"`); lint with ESLint + Prettier once the configs are added.

## Testing Guidelines
- Standardize on Vitest for libraries (`libs/<name>/tests/*.spec.ts`) and Playwright for UI flows under `apps/*/tests/e2e`.  
- Name cases after mission goals, e.g., `should_recover_ltv_during_low_light`, and aim for ≥80% library coverage.  
- When automation lags behind, spell out manual steps and simulator builds in the PR checklist.

## Commit & Pull Request Guidelines
- Mirror the current history: short, present-tense subjects that cite the subsystem (`Add AIA guardrail policy`), max ~65 characters.  
- Link the NASA SUITS milestone, note subsystem impact, list tests, and add screenshots or clips for UI deltas.  
- Pull in at least one reviewer from another subsystem to keep cross-domain awareness.

## ExecPlan Workflow
- When work spans multiple workspaces, exceeds a day, or alters shared interfaces, author an ExecPlan per `docs/codex_exec_plans.md`.  
- Keep the plan updated alongside code commits so another agent can resume from the latest `Progress` entry without guessing scope.  
- Link finished ExecPlans in related PRs or milestone notes for traceability.

## Security & Configuration Tips
- Keep NASA credentials and simulator endpoints in ignored `.env.local` files and reach them via `process.env`.  
- Scrub telemetry before sharing and catalog new logging endpoints in `docs/security.md`.  
- Run `git secrets --scan` (install if missing) before opening a PR to prevent key leaks.
