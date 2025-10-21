# TSS Integration — Networking & Data

## Transport & Format
- **WebSocket (ws)** stream carrying **JSON / GeoJSON** payloads.  
- Device must allow quick swap of **server IP** for local SUITSNET deployment during test week.

## Data Surfaces
- **PR Telemetry**: rover kinematics, resource state, LTV beacon.  
- **EV Telemetry**: suit + biomedical, DCU switch states, UIA states.  
- **LTV Task Board**: task status updates when in proximity.

## Client Plan
- Shared TS client lib; schema‑validated; observable streams; replay buffers.  
- “Good‑enough” ticks at 10 Hz for UI, faster internal timers for control modules.  
- IP/config stored in a single manifest for onsite swap.
