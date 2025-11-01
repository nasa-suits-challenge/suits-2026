# TUXEDO — NASA SUITS FY26 (Pressurized Rover + EVA HMD)

> Tactical User-interfaces for eXtravehicular Exploration and Dynamic Optimization

This repository is a **production-ready skeleton** for building your FY26 NASA SUITS submission across two assets:

- **Pressurized Rover (PR) UI** — runs on a laptop/workstation connected to DUST
- **EVA HMD/Tablet (EV)** — pass‑through AR or wrist tablet
- **Orchestrator API** — central backend + shared schema
- **TSS client libraries** — TypeScript (Node/Browser) and C# (Unity/HoloLens), with **adapters for UDP vs WebSocket**

The structure aligns to FY26 mission description & proposal guidelines and bakes in SDR artefacts, requirement traceability, CI, and “first‑run” code to talk to the **Telemetry Stream Server (TSS)**.


## Quick start

```bash
# 0) Clone and enter
git clone <your-repo-url> suits-2026
cd suits-2026

# 1) Copy .env and adjust TSS settings
cp .env.example .env
# Set TSS_HOST, TSS_PORT, TSS_TRANSPORT=udp|ws

# 2) Install toolchains (Node 20+, Python 3.10+, .NET 8+)

# 3) Build & run the Orchestrator API
cd services/orchestrator-api
npm ci
npm run dev  # http://localhost:8787/health

# 4) Open the simple PR UI (served statically by the API at /ui)
#    Then try IMU query via API proxy:
curl http://localhost:8787/api/tss/imu?ev=1
```

> **TSS transport**
> - FY26 FAQs indicate **WebSocket JSON/GeoJSON** (ws) telemetry. FY25 CAPCOM server uses **UDP** (big‑endian command frames). This repo ships an adapter for both; choose via `TSS_TRANSPORT` in `.env`.


## Repo layout

```
apps/
  pr-ui/                 # Static web UI (served by Orchestrator)
  ev-hmd/                # Unity/HoloLens sample + C# TSS client usage
docs/
  SDR.md                 # SDR skeleton (fill for April 2, 2026)
  ARCHITECTURE.md        # Deep-dive + traceability
  REQUIREMENTS_TRACE.md  # NASA "shall" coverage
  ADR/                   # Architecture Decision Records
libs/
  tss-client-ts/         # TypeScript TSS client (UDP + WS adapters)
  tss-client-csharp/     # C# TSS client for Unity/HoloLens
packages/
  athena/                # AIA guardrails + tools (Python skeleton)
services/
  orchestrator-api/      # Node/TS Express API + static hosting for PR UI
.github/
  workflows/ci.yml
  ISSUE_TEMPLATE/ ...
scripts/
  dev.ps1, dev.sh
.env.example
LICENSE
README.md
```


## Architecture (Mermaid)

```mermaid
{

flowchart LR

classDef ext fill:#f9f9f9,stroke:#888,stroke-dasharray:3 3,color:#333;
classDef svc fill:#eef,stroke:#335,color:#111;
classDef hw  fill:#ffe,stroke:#b90,color:#111;

subgraph PR[Pressurized Rover Operator]
  UI_PR[PR Frontend]:::svc
end

subgraph EVA[EVA Crewmember]
  HMD[Pass-through AR HMD]:::hw
  TAB[Wrist Tablet]:::hw
end

subgraph BE[Backend Host / Orchestrator / laptop]
  API[Orchestrator API]:::svc
  MAP[World‑State / Map Service]:::svc
  PF[Pathfinding A*]:::svc
  LID[LIDAR / Point-cloud Proc.]:::svc
  AIA[Athena AI RAG/Guardrails]:::svc
  TPQ[Task Priority Queue]:::svc
end

TSS[(Telemetry Stream Server\nWebSocket)]:::ext
DUST[DUST Unreal Simulator]:::ext
UIA_DC[UIA/DCU Switches]:::ext
LTV[LTV / Beacons & POIs]:::ext

UI_PR <--> API
HMD <--> API
TAB <--> API

API <--> PF
API <--> LID
API <--> TPQ
API <--> AIA
API <--> MAP

MAP <--> TSS
API <--> TSS

DUST -. sim state/map tiles .-> MAP
API -. rover cmds .-> TSS

TSS <--> LTV
TSS <--> UIA_DC

}}
```

---

### TSS setup (local dev)

- **FY25 CAPCOM TSS C server**: build + run, then browse to the IP/port shown to inspect live values. UDP command interface on the same IP/port (big‑endian 32‑bit timestamp + command). See `/libs/tss-client-ts` for a working adapter.  
- **FY26 ws (if provided)**: set `TSS_TRANSPORT=ws` and `TSS_WS_URL=ws://...`.

See **docs/ARCHITECTURE.md** for command maps and telemetry bindings.


### What to build next

- Replace the static PR UI with your real app (React, Three.js, etc.) and keep the API proxy
- Point a Unity scene to `libs/tss-client-csharp` to render EV tiles + AGR overlays
- Fill out SDR and requirements trace before the reviews

> All code in this skeleton is MIT-licensed; replace with your preferred license if needed.
