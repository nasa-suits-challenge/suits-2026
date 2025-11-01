# Orchestrator API

The orchestrator workspace exposes a lightweight Express server that proxies
Telemetry Stream Server (TSS) data to the PR and EVA clients. Follow these
steps to get it running locally.

## Prerequisites

- Node.js 20 LTS
- A populated `.env` file at the repository root (copy `.env.example`) with
  `TSS_HOST`, `TSS_PORT`, and optional `TSS_TRANSPORT` / `TSS_WS_URL` overrides.

## Setup

1. Install dependencies from the repository root so npm links the workspace and
   local packages:

   ```bash
   npm install
   ```

2. Build the shared TSS client. The orchestrator imports the emitted `dist/`
   bundle when running under `tsx` or after compiling:

   ```bash
   npm run build -w libs/tss-client-ts
   ```

3. Start the orchestrator in watch mode:

   ```bash
   npm run dev -w services/orchestrator-api
   ```

   The server will log `Orchestrator API on http://localhost:8787` when ready.

## Verification

- Health check: `curl http://localhost:8787/health`
- Sample IMU request: `curl "http://localhost:8787/api/tss/imu?ev=1"`
- Static PR UI: open `http://localhost:8787/ui/`

## Notes

- `npm ci` is not supported because the repo tracks workspaces without a
  committed lockfile.
- Re-run `npm run build -w libs/tss-client-ts` whenever you change code in the
  TSS client library; the orchestrator consumes the compiled output from `dist/`.
