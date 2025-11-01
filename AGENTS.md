# Repository Guidelines

## Project Structure & Module Organization
- npm workspaces back the stack: UI lives in `apps/ev-ui` and `apps/pr-ui`, voice automation in `services/aia`, reusable telemetry code in `libs/tss-client`, and reference material in `docs`.
- Keep UI feature code under `src/`, share navigation/telemetry primitives through libraries, and update the root `package.json` plus commit workspace `package.json`/`tsconfig.json` files when new areas land.
- Keep guardrail prompts near handlers; store Markdown docs in `docs/` and stash binaries in `docs/archive`.

## Build, Test, and Development Commands
- Use Node.js 20 LTS and run `npm install` at the repo root to link workspaces.
- Scope dependencies with `npm install <pkg> -w <workspace>` so EV, PR, and AIA stacks stay clean.
- Until dedicated scripts land, type-check the shared library via `npm exec -- tsc --noEmit libs/tss-client/src/index.ts`; once scripts exist, run them as `npm run dev|build|test -w <workspace>`.

## Coding Style & Naming Conventions
- Default to TypeScript with 2-space indentation, trailing semicolons, `const`/`readonly` bias, and named exports for shared modules.
- Classes remain `PascalCase`, functions and variables `camelCase`, constants `SCREAMING_SNAKE_CASE`; keep telemetry logs concise (`[TSS] connected`).
- Mission prompts, policy JSON, and simulator configs ship beside their handlers; avoid drifting code or scripts into `docs/`.

## Testing Guidelines
- Adopt Vitest for libraries (`libs/<name>/tests/*.spec.ts`) and Playwright for UI flows (`apps/*/tests/e2e`); target ≥80% coverage on shared libraries.
- Capture representative NASA TSS frames in `libs/tss-client/testdata/` so telemetry parsing tests stay deterministic.
- When automation lags, record manual EVA/PR validation steps, simulator build IDs, and expected outcomes in the pull request.

## Commit & Pull Request Guidelines
- Follow the history pattern: brief, Title Case subjects that flag the subsystem (`Add EV HUD compass overlay`), ideally under 65 characters.
- PRs should link issues or ExecPlans, list commands run, call out docs touched, and attach screenshots or clips for UI-visible changes.
- Request at least one reviewer from another subsystem and confirm every impacted workspace has its lint/test command noted.

## ExecPlan & Security Notes
- Any multi-day, cross-workspace, or schema-changing effort requires an ExecPlan maintained in `docs/exec_plans/` per `docs/codex_exec_plans.md`.
- Store NASA credentials and simulator endpoints in ignored `.env.local` files and run `git secrets --scan` before opening a pull request.
- Document new ports, environment variables, or external dependencies in the relevant workspace README and `docs/TSS_INTEGRATION.md`.
