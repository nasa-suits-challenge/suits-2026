# Repository Guidelines

## Project Structure & Module Organization
The monorepo uses npm workspaces and groups deliverables by role. `apps/ev-ui/` contains the EVA display layer (AR/tablet). `apps/pr-ui/` hosts the rover console. `services/aia/` is the voice and guardrail service. Shared TypeScript lives in `libs/tss-client/` with WebSocket glue for NASA TSS. Long-form references and assets (plans, briefs, imagery) stay under `docs/`. Keep new workspaces shallow: place runtime source in `<workspace>/src/` and document entry points in the workspace README.

## Build, Test, and Development Commands
Install dependencies once with `npm install` at the repo root; it wires all workspaces. Each workspace should expose `npm run dev`, `npm run build`, and `npm test` scripts—mirror the command set across apps/services. During development run `npm run dev --workspace apps/ev-ui` (replace with your target) to launch local servers or emulators. Before opening a PR, execute `npm test --workspaces` to exercise every registered package; if a workspace lacks scripts, add them as part of your change.

## Coding Style & Naming Conventions
Default to TypeScript with ES modules, 2-space indentation, and semicolons. Name files by role (`MapPanel.tsx`, `aia-controller.ts`). Classes and React components use PascalCase; hooks and utilities use camelCase. Prefer lightweight functions with explicit return types. Format code with Prettier (`npx prettier --write`) and keep lint passes clean once an ESLint config lands. Document non-obvious telemetry assumptions inline.

## Testing Guidelines
Adopt Vitest or Playwright depending on layer: unit tests live beside implementation as `*.spec.ts`, UI flows can sit in `tests/e2e`. Cover mission-critical telemetry parsing, safety interlocks, and regression-prone UI state. Run `npm test --workspace <name>` locally and include fixtures that mimic NASA TSS JSON. Helpers should stub WebSocket payloads so tests stay deterministic.

## Commit & Pull Request Guidelines
Follow the existing history: short imperative subject lines under 65 characters (e.g., `Add vitals banner state machine`). One feature per commit whenever feasible. PRs must summarize behavior changes, list affected workspaces, and link NASA SUITS milestone tickets or GitHub issues. Include screenshots or terminal captures for UI or service changes, note added tests, and call out any follow-up tasks.

## Agent & Execution Plan Workflow
Agents must read `docs/PLANS.md` before drafting or updating an ExecPlan. Keep ExecPlans self-contained, revise them as work lands, and record decisions in-line. When implementing code, sync the ExecPlan progress checklist with real commits so future operators can resume without backtracking.
