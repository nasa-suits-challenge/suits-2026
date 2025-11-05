# Architecture & Telemetry Integration

This project spans **PR UI**, **EV HMD/Tablet**, and a **shared Orchestrator API**. Both assets consume the **Telemetry Stream Server (TSS)** for:
- Spacesuit/DCU/UIA states and EV biomedical
- Rover & LTV telemetry, IMU, LIDAR, timers
- Points of interest (POIs) and beacons

## Transports

- **UDP (FY25 CAPCOM server)**: big‑endian frames `uint32 timestamp | uint32 command` → response `uint32 timestamp | uint32 command | data...` (int32/float or 13 floats for LIDAR).  
- **WebSocket (FY26 FAQ)**: JSON/GeoJSON over `ws`.  

Select via `.env` (`TSS_TRANSPORT=udp|ws`).


## Command Map (UDP adapter)

Examples (subset):  
- **EV1 IMU**: commands 17‑19 → `POSX`, `POSY`, `HEADING`  
- **EV2 IMU**: commands 20‑22  
- **ROVER block**: commands 23‑30  
- **LIDAR**: command 172 → 13 floats  
- **UIA**: commands 53‑62  
- **DCU EV1**: 2‑7; **EV2**: 8‑13

> See `libs/tss-client-ts/src/udp.ts` for the full constant map and helpers.


## AGR (Augmented Guided Reality)

On EV HMD, we render step‑aware overlays using five visual types:
1) **Highlight** (key component), 2) **Movement** arrows, 3) **Hand gesture** hints, 4) **Tool** cues, 5) **Contextual widgets** (e.g., timers).  
Bindings to UIA/DCU controls are verified via TSS booleans before advancing a step.

## Services

- **Orchestrator API**: Express/TS; hosts `/api/*` and serves `/ui` statics.  
- **Map/Path**: A* with slope/hazard costs; exposes `GET /api/plan?from=..&to=..`.  
- **Athena AIA**: offline‑first guardrails; tools before words.

See `docs/REQUIREMENTS_TRACE.md` for “shall” mappings and SDR checklist.
