# NASA SUITS FY26 — Product Requirements Document (PRD)
**Version:** 1.0  
**Date:** 2025-10-14  
**Project:** Spacesuit User Interface & Pressurized Rover UI/Autonomy  
**Team:** _Your Team Name Here_

---

## 1) Purpose & Goals
Design, implement, and test a dual-asset solution for the 2025–2026 NASA SUITS challenge:
- **Spacesuit UI + AIA**: An astronaut-facing display with a natural-language **Artificial Intelligence Assistant (AIA)** that reduces cognitive load during **Egress → EV Navigation → LTV Repair → Ingress**.
- **Pressurized Rover UI + Autonomy**: A control and decision-support UI operating in **DUST (Unreal)** with autonomous search, path planning, hazard avoidance, resource management, and PR–EV interoperability.

> **Success criteria (top-level):** Demonstrate intuitive, reliable UIs; robust autonomy; and effective, concise voice interactions; while meeting all “_shall_” requirements and most “_should_” requirements across both assets.

---

## 2) Users & Context
- **EV astronaut** (Spacesuit UI) operating outdoors in the JSC Rock Yard at night under uneven lighting; must maintain situational awareness, walk safely, and complete procedures efficiently.
- **PR crew** (Pressurized Rover) operating a simulated rover within DUST; must plan search patterns, monitor consumables, and coordinate with the EV.

**Operational phases:** _Initial Scene_ → _PR Navigation & Search_ → _Egress_ → _EV Navigation_ → _LTV Repair_ → _Ingress_.

---

## 3) Non‑Functional Requirements
- **Safety & Clarity:** UI must never obscure real terrain; if using HMD, use see-through/passthrough AR. Voice and visual messages must be concise and unambiguous.
- **Reliability:** All mission‑critical functions degrade gracefully offline; telemetry loss triggers safe fallback states and checklists.
- **Performance:** UI actions < 200 ms feedback; map and telemetry refresh ≥ 2 Hz; speech response < 1.5 s for short replies.
- **Usability:** Large, glovable targets; night‑mode; minimal modal steps; audible confirmations for critical switches.
- **Portability:** Configurable TSS host/IP; works on local SUITSNET at JSC; code modular to swap Unity/Unreal clients.

---

## 4) System Architecture (High-Level)
**Spacesuit Stack:** Device (HoloLens 2 or rugged tablet) → Telemetry Client (WebSocket JSON/GeoJSON) → UI Layer (2D minimap, alerts, procedures) → AIA (NLU/NLG) → Speech I/O → Data Logger.

**PR Stack:** DUST/Unreal → TSS Plugin → Autonomy Engine (planning, hazard avoidance, resource models) → PR UI (map, status, C&W) → Data Logger.

**Interoperability:** Shared Points of Interest (POIs), search area overlays, mission timers, and caution/warning (C&W) propagated to both assets via TSS or team bridge.

---

## 5) External Interfaces
- **TSS (Telemetry Stream Server):** WebSocket (ws) JSON/GeoJSON; includes EV suit/DCU/UIA states, PR/LTV status, beacon/range events, map primitives. Configurable IP at runtime.
- **UIA/DCU:** Switch state telemetry mirrored in UI; procedures track expected vs. actual state with step gating.
- **DUST (Unreal):** Provides simulated environment, rover kinematics, LTV beacon; our autonomy feeds waypoints/paths and reads hazards.

---

## 6) Artificial Intelligence Assistant (AIA)
### 6.1 Capabilities
- **Concise callouts:** “Primary O₂ 47%, Secondary 99%.”
- **Contextual procedures:** ERM, diagnosis, restart, repair steps with step-tracking and “read‑back” checks.
- **Navigation help:** Route advisories, hazard alerts, predicted max range, return‑to‑PR prompts.
- **Resource mentor:** Summaries of consumables, suggested turn‑back points, “time‑to-empty” projections.

### 6.2 Guardrails (Mitigating Hallucinations)
- **No‑guess policy:** For mission‑critical data, answers are **telemetry‑grounded or explicitly say “unknown.”**
- **Verified action set:** Checklist/command grammar with confirmation before acting; LLM never actuates hardware.
- **Constraint checker:** Numeric outputs range‑checked; if outside expected bounds, escalate to C&W.
- **Tiered NLP:** (1) Deterministic intents for critical phrases; (2) Lightweight local model for routine phrasing; (3) Cloud/offline LLM used only for non‑critical guidance; data‑diodes for critical values.
- **Conversation logging & replay** for audit.

---

## 7) Functional Requirements & Acceptance Criteria
### 7.1 Pressurized Rover (PR)
1. **Control in DUST:** Drive via autonomy with manual override.  
   _Acceptance:_ PR can start, pause, resume mission; execute path segments; operator can interject waypoints.
2. **2D Live Map:** Show PR/EV/LTV; search radius; planned pattern; POIs; mission timer.  
   _Acceptance:_ Map updates ≥2 Hz; add/view shared POIs; toggle layers.
3. **Autonomous Navigation:** Best‑path, obstacle avoidance, updated destinations from TSS.  
   _Acceptance:_ Finds LTV search sector; replans around hazards within 2 s of detection.
4. **Resource Utilization:** Track power/consumables; predictive analytics; AIA verbal status.  
   _Acceptance:_ Provides current/ETA/turn‑back suggestion; issues C&W on off‑nominal.
5. **Caution & Warning:** Visual tiering (Advisory/Warning/Caution); audible chirps; AIA recommended procedure.  
   _Acceptance:_ Triggered by threshold scripts; displays procedure link; logs event.

### 7.2 Spacesuit UI
1. **EV Telemetry & Biomeds:** Always‑visible core vitals; expandable panels.  
   _Acceptance:_ Values match TSS; alarms on out‑of‑range.
2. **2D Map & Nav:** Planned search route, live asset positions, breadcrumb trail; best‑path suggested.  
   _Acceptance:_ Drop pins; backtrack to PR; predicted max range indicator updates with usage.
3. **Procedures + Voice:** Egress/UIA/DCU checklists; AIA guides and verifies steps.  
   _Acceptance:_ Step gating based on switch states; voice read‑back accepted/flagged.
4. **C&W:** Alerts for suit/biomed anomalies; AI action tips.  
   _Acceptance:_ Playbook shown within 1 tap/command; acknowledgement required.

### 7.3 Interoperability
- **Shared data:** POIs, search overlays, LTV “warmer/colder” signal, timers.
- **Consistency checks:** Differences reconciled with “last‑writer‑wins” and user confirmation for conflicts.

---

## 8) UI Design (Key Views)
- **EV Home HUD:** vitals, compass, breadcrumb toggle, quick‑command mic, alert tray.
- **EV Map Panel:** 2D minimap, POIs, route line, hazard overlays; snap-to‑heading.
- **EV Procedure Runner:** Large step cards, live switch-state badges (OK/Needs‑Action), voice assist button.
- **PR Mission Console:** Map with search pattern control, autonomy panel (mode/speed/heading), C&W pane, resource dial, timeline.

---

## 9) Peripheral Devices
- Any custom peripherals presented at SDR for approval; no sharp edges/pinch points; wireless comms (e.g., BLE) only; no exposed holes; electrical design per SUITS rules. If we request a **Hololens2 loan**, include the declaration in the proposal.

---

## 10) Requirements Traceability (excerpt)
| Mission Requirement | Feature/Spec | Test/Acceptance |
|---|---|---|
| EV: 2D map w/ live assets & search route | EV Map Panel with asset layer & route overlay | Map shows PR/LTV/EV; update ≥2 Hz; route editable |
| EV: Breadcrumb + best path + predictive range | Breadcrumb toggles; A* planner; range ring based on usage | Backtrack returns to PR; range margin ≥15% |
| EV: Drop pins | Pin tool in HUD; shared via TSS | Pin appears on PR within 2 s |
| EV: C&W + AI actions | Tiered alerts; playbook | Acknowledge + follow playbook |
| PR: Live 2D map & search radius | PR Console map with radius polygon | Editable radius; auto‑update with LTV wake |
| PR: Autonomy (path + hazards) | Planner + lidar hazard mask | Replan < 2 s |
| PR: Resource analytics + AIA | Power model + AIA summaries | Turn‑back time shown; AIA verbal |
| PR: C&W | Threshold scripts + UI pane | Visual + audible + link to procedure |

> Full matrix provided in repository and updated at each review.

---

## 11) HITL Test Strategy (Summary)
- **Environments:** Outdoor evening tests (low light), indoor obstacle courses, and DUST-in-the-loop sessions.
- **Metrics:** Task time, error rate, route efficiency, alert response time, nav deviation, speech accuracy (WER), workload (NASA TLX).
- **Subjects:** 10–16 participants (mix of experience levels), with safety spotters.
- **Safety:** Pre‑brief, PPE, fall‑risk audit, radio comms, fail‑safe stop for autonomy.
- **Milestones:** Alpha (Jan), Beta (Feb), Full EVA rehearsal (Mar), SDR demo cut (late Mar).

---

## 12) Community & Industry Engagement (Outline)
- **Community (≥2):** “Hour of Code” at local HS; University demo night; Scouts robotics workshop.
- **Industry (≥2):** Guest mentorships (AR/Unreal, autonomy); certification sessions (Unity/UE, safety); internship info sessions.
- Include projected audience sizes, dates, and leaders; collect letters/confirmations.

---

## 13) Risks & Mitigations (Top 8)
1. **Telemetry loss:** Local cache, retries, clear UI state indicators.
2. **Night visibility:** High‑contrast UI, headlamp testing, AR brightness calibration.
3. **Speech failures:** Push‑to‑talk fallback, on‑screen quick actions.
4. **Map drift:** Regular recentering, reference fiducials, manual corrections.
5. **Autonomy corner cases:** Keep manual override; geofence; conservative speed.
6. **Cloud dependency:** Offline models; no critical cloud calls.
7. **Schedule compression:** Internal freeze dates; parallel workstreams.
8. **Hardware availability:** Request loan early; tablet fallback plan.

---

## 14) Documentation & Deliverables
- Proposal PDF (≤12 pages Technical), Outreach, and Administrative sections.
- SDR video (first‑person UI) and code package; post‑test white paper.
- Repo: design docs, test plans, trace matrix, and operations checklists.

---

## 15) Sources
- NASA SUITS Mission Description, Proposal Guidelines, and FY26 FAQs.
