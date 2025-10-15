# Artificial Intelligence Assistant (AIA) – FY26 Integrated System

## Overview
The **Artificial Intelligence Assistant (AIA)** is a context-aware, dual-mode system designed to function as both an **on‑suit EVA assistant** and a **Pressurized Rover (PR) decision‑support system**. Its purpose is to act as a **force multiplier**—increasing efficiency, lowering cognitive load, and maintaining safety across **egress → navigation → LTV repair → ingress**.

## Dual‑Mode Architecture
| Mode | Platform | Role | Environment |
|---|---|---|---|
| **EVA** | HoloLens 2 / AR tablet | Real‑time guidance, telemetry summaries, procedure verification | JSC Rock Yard (physical terrain) |
| **PR** | DUST Unreal cockpit display | Search/route planning, resource prediction, crew coordination | Virtual lunar terrain (NASA DUST) |

Both modes connect to the **Telemetry Stream Server (TSS)** (WebSocket JSON/GeoJSON) to ingest suit, rover, LTV beacon, and shared POI/caution data.

## System Architecture
1. **Telemetry Layer** — parses live TSS streams into a structured mission state frame.  
2. **Reasoning Layer** — safety rules for mission‑critical checks; plus an LLM agent (local 20B w/ function calling) for route optimization and natural‑language summarization.  
3. **Dialogue Layer** — concise, phase‑bound templates (e.g., “Primary O₂ 47%, Secondary 99%.”).  
4. **Interaction Layer** — AR/PR UI updates: map markers, search radius, breadcrumbs, procedures, and alerts.

## EVA Functions
- **Egress:** Step‑by‑step UIA/DCU procedures with state verification.  
- **Traverse:** Hazard‑aware breadcrumbs and best‑path guidance under low‑light.  
- **Repair:** Retrieve **ERM**, **Diagnosis**, **Restart**, and **Physical Repair** procedures; re‑prioritize by consumables/time.  
- **Ingress:** Reconstruct breadcrumb path and verify closure steps.

**Example**  
EV: “Check oxygen levels.”  
AIA: “Primary O₂ 47%, Secondary 99%. Proceed with Depress Pump Power — ON.”

## PR Functions
- **Autonomous Search:** Adaptive pattern (lawnmower/expanding square) using LTV last-known position; updates with beacon/LiDAR.  
- **Predictive Resources:** Battery/life‑support forecasts, safe turnaround points, caution prompts.  
- **Interoperability:** Shares EV status, POIs, cautions; broadcasts LTV “wake‑up” signal (≤500 m), supports warmer/colder within ~50 m.

## Guardrails (Hallucination Mitigation)
1. **Schema‑bound data** — mission values are read‑only from TSS.  
2. **Phase lock** — intents and prompts restricted to current EVA/PR phase.  
3. **Numeric cross‑checks** — thresholds validated before any output/control.  
4. **Confidence tags** — low‑confidence advice labeled *Unverified*.  
5. **Local‑only for critical paths** — on‑device inference for mission‑critical steps.

## Human‑in‑the‑Loop (HITL) Testing
- **Metrics:** task time, procedure accuracy, NASA‑TLX workload, response latency (<2 s).  
- **Phases:** bench (mock telemetry) → night/terrain (EVA) & DUST (PR) → integrated test.  
- **Target:** ≥20% workload reduction vs. baseline.

## Development Roadmap
| Phase | Focus | Deliverables |
|---|---|---|
| 1 | Telemetry + rules | Parser, schema validation, console summaries |
| 2 | Voice + UIA | TTS + AR prompts, checklist JSON verification |
| 3 | PR search + analytics | A* pathfinding, energy prediction |
| 4 | Interop + HITL | Shared map state, logs + feedback |
| 5 | Final integration | End‑to‑end AIA with voice + visuals |

## Summary
AIA is a modular intelligence layer that **complements** human decision‑making. With structured telemetry, template‑bound language, and verified reasoning, it delivers **autonomy, interoperability, and cognitive‑load reduction** for both EVA and PR.
