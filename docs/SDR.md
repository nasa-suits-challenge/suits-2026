# TUXEDO Software Design Review Brief

Prepared for the FY26 NASA SUITS virtual Software Design Review (Apr 2, 2026).
This brief distills the proposal package into an SDR-ready narrative and flags
items that still require closure.

## 1. Executive Summary
- **Mission focus:** Deliver synchronized rover and EVA interfaces (TUXEDO) that
  guide lunar surface operations with pass-through augmented reality, telemetry
  verification, and the Athena AI assistant.
- **Core value:** Reduce cognitive load during search, repair, and ingress tasks
  by enforcing telemetry-validated procedures, resource-aware navigation, and
  concise AI advisories.
- **Readiness snapshot:** Architecture and CONOPS are mature; AI guardrails,
  late-stage HITL validation, and hardware sourcing (loaner HoloLens 2) remain on
  the critical path for SDR approval.

## 2. System Overview
### 2.1 Architecture Highlights
- Unified Telemetry Stream Server (TSS) client feeds both PR and EV clients over
  JSON/GeoJSON WebSockets.
- Athena AI spans an on-suit node (speech, AGR progression) and an edge/rover
  node (planning, RAG, analytics) with shared tool APIs.
- Navigation & analytics layer provides A*-based routing, hazard weighting, and
  consumable forecasting; outputs drive AGR and UI cues.
- Lightweight, glanceable UIs (PR map + panels, EV minimap + status tiles) share
  POIs, timers, and warnings via a minimal schema with offline caching.

### 2.2 Pressurized Rover UI
- Multi-panel display for rover telemetry, 2D terrain map, caution/warning feed,
  consumables chart, and mission timers.
- Autonomy supports adaptive search patterns around the LTV, LiDAR-assisted
  obstacle avoidance (<10 m), and turnaround radius visualizations.
- Crew can drop and annotate POIs by voice/touch; advisories resync after
  connectivity drops.

### 2.3 EVA Spacesuit UI
- Pass-through AR headset paired with a wrist tablet balances high-priority HUD
  content (biomed, cautions, AGR prompts) and lower-priority map/inputs.
- Provides suit/biomed tiles, route planning with breadcrumb return, predictive
  range rings, and contextual AI voice assistance.
- Procedures module highlights UIA/DCU/LTV controls, advancing only after TSS
  verification; caution logic escalates urgent anomalies with audio + visual
  cues.

### 2.4 AGR Overlay Engine
- Five overlay modes (highlight, motion, hand hints, tool cues, contextual
  widgets) map to procedure steps to keep astronauts heads-up and in-scene.
- Spatial registration uses HMD scans and lightweight detectors; telemetry stays
  authoritative for switch state changes.
- AGR state syncs across PR↔EV JSON channel to maintain shared awareness during
  brief link losses.

### 2.5 Athena AI & Guardrails
- On-suit services handle offline ASR/TTS, AGR sequencing, hazard cues,
  breadcrumbing, and telemetry read-outs.
- Edge/rover node hosts quantized 7–13B LLM (optionally 20B with approved
  compute pack) for multi-constraint planning and retrieval-augmented guidance.
- Structured tool layer (`get_telemetry`, `plan_route`, `predict_resources`,
  `checklist`, `beacon_bearing`) produces deterministic JSON envelopes.
- Guardrails enforce telemetry as source of truth, confidence gating (<0.8),
  two-step confirmations for routing/ERM, and deterministic fallbacks when tools
  fail.

## 3. Hardware, Networking, and Compliance
- Devices: HoloLens 2 (pass-through AR), wrist-mounted tablet, PR workstation,
  edge laptop with ≥16 GB VRAM for the LLM node, and WebSocket comms between PR
  and EV.
- Networking targets SUITSNET-only connectivity during Test Week; no public
  internet dependencies.
- Compliance checks already align with SUITS UI requirements (2D minimap,
  breadcrumbs, drop pins, hazard alerts, predictive range, search radius, AIA
  status) and pass-through AR mobility expectations.
- Program selects Hololens2 Loan Program Option B (loaned device required), so
  NASA coordination for hardware logistics must stay on-track.

## 4. Concept of Operations
| Phase | Highlights |
| --- | --- |
| A. PR Search & Approach | Adaptive search around last-known LTV point, range awareness, AIA advisories. |
| B. Egress (UIA/DCU) | AGR highlights physical controls, voice confirmations gated by TSS telemetry. |
| C. EV Navigation | Low-light-safe cues, breadcrumb returns, hazard pips, range rings. |
| D. LTV Repair | Step-wise AGR overlays for ERM → diagnosis → restart → physical repair, with defer options when resources low. |
| E. Ingress | Resource-aware return path, ingress checklist verification, synchronized logging back to PR. |

## 5. Development Plan & Milestones
- Two-week sprint cadence with GitHub issue tracking and weekly demos.
- Dec–Jan: Deliver TSS client, PR/EV UI shells, core mapping features.
- Feb: Implement search patterns, EV navigation, procedure engine, caution
  handling.
- Mar: Complete LTV repair flow, AI guardrails, range/turnaround analytics, and
  night testing.
- Apr: SDR build freeze, end-to-end rehearsal, bug burn-down.
- May/Jun: Onsite testing readiness, telemetry logging, white paper & code wrap.

## 6. Test & Evaluation Strategy
- Bi-weekly HITL trials Jan–Apr with DUST simulator feeds and outdoor night
  traverses.
- Metrics: latency (<250 ms), schema integrity, path error (≤3 m), hazard
  avoidance (≥95%), procedure accuracy, warning response time, NASA-TLX (<40
  median), task duration, and deferral correctness.
- Participant pool: 12–18 CU Boulder students/faculty with mixed technical
  backgrounds; privacy ensured via consent forms and anonymized voice logs.
- Post-test cycles integrate quantitative metrics and qualitative feedback before
  promoting features to the main build.

## 7. Risks & Mitigations
| Risk | Impact | Mitigation |
| --- | --- | --- |
| Network latency or SUITSNET dropouts | Delayed overlays, stale telemetry | Local caching, stale-data badges, PR log replay. |
| Device thermal limits / compute load | HMD throttling during night ops | Thermal monitoring, load shedding, offloading planning to edge node. |
| ASR robustness in noisy environments | Missed commands / false positives | Offline grammar set, deterministic fallbacks, voice + touch redundancy. |
| Hardware availability (loaned HoloLens 2, edge GPU) | Schedule slip / non-compliance | Track loan request status, secure backup device, confirm GPU inventory. |
| AI guardrail gaps | Unsafe guidance or hallucinations | Telemetry-first validation, confidence gating, deterministic responses for low confidence. |

## 8. Outstanding Actions for SDR
1. Confirm final hardware logistics with NASA loan program and document backup
   devices.
2. Produce initial AGR overlay prototypes (video/screenshot) to demonstrate the
   five-mode palette in context.
3. Lock AI model selection (7–13B baseline vs. optional 20B) and benchmark on the
   target edge laptop to validate latency.
4. Finalize telemetry schema contract (POIs, timers, warnings) and publish to the
   rover/EV teams for integration tests.
5. Dry-run January HITL smoke tests (TSS client, WebSocket latency) and archive
   logs for SDR evidence.

## 9. Readiness Assessment
| Area | Status | Evidence |
| --- | --- | --- |
| Architecture & CONOPS | 🟢 On-track | System overview, AGR concept, and phased CONOPS are fully documented. |
| AI & Autonomy | 🟡 Needs validation | Guardrails defined; performance and model sizing still pending hardware tests. |
| UI/UX Implementation | 🟡 In progress | Wireframes and feature lists are solid; requires prototype capture for SDR. |
| Testing & Metrics | 🟢 Planned | Detailed HITL schedule and metrics cover SDR expectations. |
| Hardware & Logistics | 🟡 Watch | Loaner request and edge GPU sourcing remain open tasks. |

Document owner: <fill at SDR prep>  •  Last updated: 2025-10-14
