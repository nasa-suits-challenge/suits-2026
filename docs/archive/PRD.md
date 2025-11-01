# PRD — Spacesuit UI + Pressurized Rover UI (NASA SUITS FY26)

## 1) Product Vision
Enable a **crew‑autonomy UI system** (spacesuit + pressurized rover) that reduces EV cognitive load, accelerates time‑to‑task, and increases EVA safety in **night, low‑contrast lunar south pole** conditions by integrating **clear displays**, **natural‑language voice assistance**, and **predictive autonomy**.

## 2) Goals & Success Metrics
- **Task throughput**: Complete UIA egress and LTV repair nominal path ≤ target time (TBD in HITL).  
- **Cognitive load**: NASA‑TLX median ≤ “Low‑Moderate” vs. baseline checklist.  
- **Navigation safety**: Zero critical C&W events missed; reroute latency ≤ 2s after hazard detection.  
- **Interoperability**: PR–EV shared pins/POIs sync latency ≤ 1s on SUITSNET.  
- **Reliability**: AIA responses < 1.5s P95; offline fallbacks for critical callouts (local rules/alarms).

## 3) Users & Context
- **EV Astronaut**: wearing suit, gloved interaction, low‑light/night tests in JSC Rock Yard.  
- **PR Operator**: inside virtual DUST rover UI performing search, routing, and crew support.  
- **Test Evaluators**: validate compliance to requirements and rubrics.

## 4) Key Capabilities (Feature Set)
### Spacesuit (EV)
- **HUD/Handheld UI**: 2D mini‑map with breadcrumb trail, best‑path suggestion, asset positions.
- **AIA Voice**: concise, values‑first readouts (“Primary O2 47%, Secondary 99%.”) and step prompts.
- **C&W**: prioritized alerts with recommended actions; one‑tap/voice ACK and “Explain”.
- **Pins/POIs**: drop/label via gaze/cursor/voice; shared with PR; distance/time‑to‑reach estimates.
- **Range Predictor**: live “Max Range” hull based on suit consumables + slope + footing risk.
- **UIA Procedure Assistant**: state‑aware stepper bound to TSS switch booleans.

### Pressurized Rover (PR)
- **Map & Search**: 2D map with LTV travel radius, adaptive search pattern; predicted wake‑up zone.  
- **Autonomy**: best‑path, hazard avoidance, speed/heading, resource analytics & “turn‑back” points.  
- **Decision Support**: what‑if for POIs: ETA, delta‑risk, power/suit consumption impacts.  
- **Beacon Aiding**: “warmer/colder” cue inside 50 m.  
- **C&W**: same priority model; suggestion engine; mission timers (MET).

## 5) Non‑Functional Requirements
- **Glove‑friendly** hit targets (≥ 12–14 mm effective).  
- **Readable at night**: high contrast themes; brightness ceiling; no full‑field flicker.  
- **Latency**: UI < 250 ms; voice first token < 1 s; map updates 5–10 Hz.  
- **Resilience**: graceful degrade if TSS drops; cached tiles; local alarms.  
- **Security**: SUITSNET IPs configurable; no cloud dependency during test week.

## 6) Constraints & Assumptions
- HMD must be **pass‑through AR**; virtual PR runs in **DUST** environment; TSS over **WebSocket**.  
- Onsite **SUITSNET** provides local host IP; devices must allow quick IP swapping.

## 7) Acceptance Criteria
- Demonstrate end‑to‑end mission thread: PR search → EV egress → nav → LTV repair → ingress.  
- Hit metrics above during HITL dry‑runs; pass requirements in the traceability matrix.

