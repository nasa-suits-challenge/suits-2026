# Bootstrap Orchestrator Architecture Alignment

This ExecPlan follows `docs/codex_exec_plans.md`. Update every section as work progresses; the document must remain self-contained.

## Purpose / Big Picture

Deliver a vertically sliced architecture skeleton that connects the Telemetry Stream Server (TSS) to the Pressurized Rover (PR) and EVA user interfaces through a shared orchestrator service. The plan establishes schemas, services, and developer workflows so live rover/EVA telemetry (per 2025 TSS examples) flows into UI shells, Athena integrations, and map/pathfinding pipelines envisioned in the proposal and network diagram.

## Progress

- [ ] (2026-01-12 00:00Z) Author orchestrator scaffolding and shared telemetry schema package.
- [ ] (2026-01-12 00:00Z) Implement TSS client wrapper with caching and rebroadcast WebSocket.
- [ ] (2026-01-12 00:00Z) Expose REST/WebSocket contracts for PR/EVA clients and internal services.
- [ ] (2026-01-12 00:00Z) Seed PR and EVA UI workspaces with telemetry-driven shells.
- [ ] (2026-01-12 00:00Z) Stand up integration validation (unit tests + simulator smoke checklist).

## Surprises & Discoveries

- Observation: <Populate once integration work uncovers unexpected behavior.>
  Evidence: <Logs, measurements, or links to artifacts.>

## Decision Log

- Decision: <Record architecture or tooling choices as they are made.>
  Rationale: <Why this choice was made.>
  Date/Author: <UTC timestamp, Name.>

## Outcomes & Retrospective

<Summarize achieved results, validation status, follow-ups, or open risks after implementation.>

## Context and Orientation

- Code paths: `libs/tss-client/` – Houses reusable TSS connection logic; currently minimal placeholder needing schema expansion and reconnection handling.
- Code paths: `services/` – Future home of orchestrator services (API, map, pathfinding, Athena adapters) per network diagram.
- Code paths: `apps/pr-ui/` and `apps/ev-ui/` – PR dashboard and EVA HUD/tablet clients that must ingest normalized telemetry.
- Assets/configs: `docs/proposal/proposal_draft.md` & `docs/SDR.md` – Outline synchronized AGR workflow, telemetry verification, and SDR commitments.
- Assets/configs: External TSS repo (`SUITS-Techteam/TSS-2025`) – Reference implementation of telemetry payloads and message cadence.
- Dependencies: Node.js 20 LTS, npm workspaces, WebSocket clients, GeoJSON tooling, Vitest/Playwright for tests.

## Plan of Work

1. Define TypeScript telemetry schemas and map state interfaces in `libs/tss-client`, referencing 2025 PR and EVA telemetry samples.
2. Build a resilient TSS connector in `libs/tss-client` with exponential backoff, heartbeat, and cached last-known-good frames.
3. Scaffold `services/orchestrator` workspace with Node/Express (or Fastify) API that consumes the shared client, persists state, and rebroadcasts via REST and WebSocket endpoints.
4. Introduce message channels for Athena guardrails, pathfinding, and map services (stubs initially) ensuring contract definitions live in shared libs.
5. Create PR UI telemetry panel skeleton (apps/pr-ui) and EVA HUD/tablet telemetry widgets (apps/ev-ui) that subscribe to orchestrator endpoints and render critical consumables/alerts.
6. Document simulator integration steps and environment variables in `docs/TSS_INTEGRATION.md` or new README entries.
7. Establish automated testing: schema unit tests in `libs/tss-client`, API contract tests in orchestrator service, and UI smoke Playwright specs.

## Concrete Steps

1. `(repo root) npm install`  
   Expected: Workspaces link successfully without audit warnings.
2. `(repo root) npm install zod ws -w libs/tss-client`  
   Expected: Adds schema validation tooling for telemetry definitions.
3. `(repo root) npm install express ws -w services/orchestrator`  
   Expected: Establish backend service dependencies.
4. `(repo root) npm run lint -w libs/tss-client` (once script exists)  
   Expected: Static analysis passes on new schema code.
5. `(repo root) npm test -w services/orchestrator`  
   Expected: API contract tests validate TSS fan-out behavior.
6. `(repo root) npm run test -w apps/pr-ui` / `(repo root) npm run test -w apps/ev-ui`  
   Expected: UI telemetry widgets render baseline data fixtures.

## Validation and Acceptance

- Demonstrate orchestrator receiving simulated TSS telemetry, updating internal state, and exposing PR/EVA payloads over REST/WebSocket with ≤250 ms propagation delay.
- Verify UI clients display rover consumables, EVA vitals, and TSS connection status using recorded fixtures and live simulator runs.
- Confirm Athena/pathfinding stubs receive the same normalized telemetry contract without schema drift.
- Run unit/integration tests described in Concrete Steps and record results in PR.

## Idempotence and Recovery

- TSS connector should tolerate WebSocket drops via auto-retry with capped exponential backoff (≤30 s).
- Orchestrator startup scripts include health checks; rerunning `npm run dev` restarts services without manual cleanup.
- Provide instructions to purge cached telemetry or reset fixtures for deterministic tests.

## Artifacts and Notes

- Attach sample telemetry fixtures (PR, EVA) under `libs/tss-client/testdata/` for tests and documentation.
- Capture architecture diagrams or updated sequence charts linking TSS → Orchestrator → UI/Athena services.
- Store simulator connection logs and latency measurements for SDR evidence.

## Interfaces and Dependencies

- Normalized telemetry types exported from `libs/tss-client` (e.g., `RoverTelemetry`, `EvaTelemetry`, `WorldStateFrame`).
- Orchestrator REST endpoints: `/api/telemetry/rover`, `/api/telemetry/eva`, `/api/state/map`, and WebSocket channel `/ws/telemetry` broadcasting combined frames.
- Pub/sub hooks for Athena (`/api/athena/tool-invoke`) and pathfinding (`/api/path/request`) defined but stubbed until implementation.
- Environment variables: `TSS_WS_URL`, `ORCHESTRATOR_PORT`, `ORCHESTRATOR_CACHE_TTL_MS` documented in service README.
