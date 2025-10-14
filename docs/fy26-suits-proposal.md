# NASA SUITS FY26 Proposal Draft

**Team:** _Your Team Name Here_
**Submission Portal:** STEM Gateway
**Date:** October 29, 2025

---

## 1. Technical Section (80 pts)

### 1.1 Design Description (25 pts)

#### Mission Concept Overview
Our proposal delivers a coordinated mission operations stack for the FY26 NASA SUITS scenario spanning **Pressurized Rover (PR) operations**, **Spacesuit EVA informatics**, and an **Artificial Intelligence Assistant (AIA)** that safeguards crew cognition across the full mission arc (Initial Scene → PR Navigation → Egress → EV Navigation → LTV Repair → Ingress). The system is grounded in NASA’s mission description requirements, the program PRD, and the implementation milestones outlined for FY26.

#### Spacesuit UI (EV Asset)
- **HUD & Situational Awareness:** Transparent AR overlays on HoloLens 2 (primary) with rugged tablet fallback. Always-on vitals ribbon (O₂, suit pressure, heart rate) with threshold color states, synchronized to TSS at ≥2 Hz.
- **2D Navigation Map:** North-stabilized map with drop-pin tool, breadcrumb toggles, predictive range ring calculated from consumable burn rates, and partner PR path overlays. Map supports quick recenter (press-and-hold) and heading snap for night operations.
- **Procedure Runner:** Checklist view that fuses UIA/DCU switch telemetry with step gating, featuring large glovable targets and voice-driven confirmations. AIA narrates each step, prompts read-backs, and automatically logs completion.
- **Caution & Warning (C&W):** Tiered alert tiles (Advisory/Warning/Critical) linking to context-specific procedure cards. Alerts provide audio chimes plus haptic wristband handshake when available. Acknowledge gestures suspend voice chatter until hazard resolves.

#### Pressurized Rover Mission Console (PR Asset)
- **Command View:** Multi-pane console on DUST-integrated workstation featuring autonomy mode selector (Manual / Supervised / Autonomous), hazard mask visualization, and live rover attitude and resource gauges.
- **Search Planning:** Drag-and-drop polygon editor that seeds spiral or lawnmower patterns within the LTV search radius, updating as beacon telemetry refines confidence ellipses. Operators can stage waypoints and sync to EV for mutual awareness.
- **Telemetry Mirror:** Dedicated panel for spacesuit biomeds and suit states, enabling PR crew to monitor EVA status and push summarized advisories to the EV HUD.
- **Mission Timeline & Timers:** Global Mission Elapsed Time (MET), phase timers, and checklist progress indicators sharing the same NTP-synchronized time base to satisfy NASA SUITS mission timer constraints.

#### Artificial Intelligence Assistant
- **Modular NLU Pipeline:** Deterministic grammar for mission-critical intents (e.g., “Ack Alert”, “Show Procedure 2”), lightweight on-device semantic parser (Phi-4 Mini) for conversational phrasing, and optional cloud/offline LLM (GPT-4o-mini) for non-critical coaching when connectivity allows.
- **Dialogue Design:** AIA provides succinct callouts (“Primary O₂ at 47 percent, predicted reserve 18 minutes.”) and contextualized recommendations tied to NASA playbooks. Conversations are logged with telemetry cross-references for SDR playback.
- **Safety Guardrails:** No-guess policy, numerical constraint checker, double-confirmation for any action affecting mission state, and fallback push-to-talk macros when speech confidence < 0.75. Hallucination mitigation includes rule-based fact verification and scenario-specific retrieval augmentation.

#### Interoperability & Data Architecture
- Shared Points of Interest (POIs), LTV beacon trends, and C&W state machine synchronized between EV and PR via TSS topics. Last-writer-wins conflict resolution with user confirmation on critical discrepancies.
- Telemetry adapters abstract WebSocket endpoints so that development can proceed with mock feeds until NASA releases the official TSS in mid-Dec 2025.
- Event logging and replay tools support cross-team rehearsals and SDR documentation.

### 1.2 Concept of Operations (10 pts)
1. **Initial Scene:** PR operators launch the mission console, validate TSS connectivity, and select the planned search template. EV crew review procedure briefings via the HUD procedure runner.
2. **Pressurized Rover Navigation:** PR switches to Supervised autonomy, authorizes the preplanned path, and monitors hazard masks. If the LTV beacon signal shifts, the autonomy engine replans and broadcasts updates to the EV HUD map. AIA summarizes resource trends for the PR crew every five minutes.
3. **Egress:** EV crew follow UIA-driven procedures with HUD overlays. The AIA confirms each DCU/UIA switch via deterministic intents, and PR monitors checklists remotely.
4. **EV Navigation:** EV toggles breadcrumbs and follows the best-path overlay. PR provides range-to-target cues; both assets share POIs and caution states through synchronized overlays. AIA warns about predicted turn-back points.
5. **LTV Repair:** EV switches to task mode, surfacing the LTV repair procedure card set. PR provides context overlays (component diagrams, torque specs) and keeps situational timers. Any anomalies trigger cross-asset alerts with recommended mitigations.
6. **Ingress:** Breadcrumb backtrack to PR, final consumables assessment, and mission closeout logged. Data packages prepared for SDR traceability.

### 1.3 Feasibility (10 pts)
- **Technical Viability:** Architecture aligns with NASA-provided systems (TSS, UIA, DCU) and leverages existing TypeScript/Unreal tooling described in the implementation plan. Modular telemetry adapters and autonomy stack reuse prior-year research to accelerate development.
- **Production Approach:** Iterative sprints mapped to the implementation plan: Proposal (Oct), Foundations (Nov-Dec), Telemetry & AIA Alpha (Dec-Jan), Mapping & Autonomy Beta (Jan-Feb), Integrated EVA Rehearsal (Mar), SDR Package (Apr), and Hardening (Apr-May). Each workstream lead owns backlog grooming and Definition of Done checklists.
- **Resourcing:** Hardware plan covers HoloLens 2 loan plus rugged tablet fallback, PR workstation, microphones/headsets, and dedicated test environments. Budget (~$8,500) and outreach commitments align with institutional support.

### 1.4 Artificial Intelligence Integration (15 pts)
- **Models & Components:**
  - Deterministic grammar: Rust-based finite-state intent recognizer for 40+ mission-critical commands.
  - On-device semantic parser: **Phi-4 Mini** fine-tuned with EVA phraseology for offline resilience.
  - Knowledge-grounded assistant: **GPT-4o mini w/ Retrieval-Augmented Generation (RAG)** using local mission knowledge base (procedures, hazard responses).
- **Integration Strategy:** Edge inference services run on both EV and PR devices. Context packets combine live telemetry snapshots, mission phase, and relevant procedures. PR console hosts the RAG store; EV uses trimmed caches synchronized via Wi-Fi when bandwidth permits.
- **Mitigation Plan:**
  - Confidence gating on transcripts with push-to-talk fallback.
  - Constraint validation for numerical outputs (range checks, derivative thresholds).
  - Hallucination red teaming before SDR using simulated anomalies.
  - Human override macros for rapid silencing or escalation.

### 1.5 Effectiveness of the Project Schedule (5 pts)
| Phase | Dates | Objectives | Key Deliverables |
| --- | --- | --- | --- |
| Proposal | Now – Oct 30, 2025 | Finalize proposal, LOI, admin packets | STEM Gateway submission |
| Foundations | Nov – Dec 11, 2025 | Device selection, repo/CI setup, telemetry scaffolding | Prototype HUD & PR shell, mock TSS |
| Telemetry & AIA Alpha | Dec 2025 – Jan 2026 | Integrate real TSS, stand up AIA v1 | Alpha telemetry pipeline, speech I/O demo |
| Mapping & Autonomy Beta | Jan – Feb 2026 | Map tools, autonomy planner, hazard handling | Beta PR console, EV map overlays |
| Integrated EVA Rehearsal | Mar 2026 | Full mission dry-runs, HITL tests | Rehearsal report, metric dashboards |
| SDR Preparation | Late Mar – Apr 2, 2026 | Capture UI footage, finalize docs | SDR package, trace matrix |
| Hardening & Onsite Prep | Apr – May 2026 | Performance tuning, travel logistics | Final build, onsite checklists |

### 1.6 Human-in-the-Loop (HITL) Testing (10 pts)
- **Schedule:** Alpha (late Jan), Beta (late Feb), Full EVA rehearsal (mid-Mar) aligned with integration milestones.
- **Protocols:** Within-subject design comparing UI variants. Scripts simulate mission phases, hazards, and communication delays. Nighttime outdoor tests verify visibility and navigation.
- **Metrics:** Task completion time, path efficiency, breadcrumb accuracy, hazard response latency, AIA word error rate (WER), NASA TLX workload, user trust surveys.
- **Participants:** 12–16 volunteers (mix of aerospace students, analog testers). Ensure ≥30% female/non-binary representation. Each participant briefed, signs consent, and rotates roles (EV, PR, observer).
- **Evaluation:** Observers capture video + telemetry logs. Post-test debrief links metrics to challenge requirements and drives backlog updates.
- **Safety:** Pre-test site survey, radio comms, emergency stoper, PPE (helmets, gloves), spotters on uneven terrain, heat/cold stress monitoring, medical kit on site. Night tests require high-visibility vests and lighting plans.

### 1.7 Technical References (5 pts)
1. NASA SUITS Program. *FY26 NASA SUITS Mission Description.* NASA, 2025.
2. NASA SUITS Program. *FY26 NASA SUITS Proposal Guidelines.* NASA, 2025.
3. NASA SUITS Program. *FY26 NASA SUITS FAQs.* NASA, 2025.
4. NASA SUITS Team. *NASA SUITS FY26 Product Requirements Document (PRD).* Internal Draft, 2025.
5. NASA SUITS Team. *NASA SUITS FY26 Implementation Plan.* Internal Draft, 2025.

---

## 2. Community & Industry Engagement (20 pts)
| Event | Type | Date Window | Audience & Reach | Leaders | Implementation Highlights |
| --- | --- | --- | --- | --- | --- |
| **Lunar STEM Night @ Local High School** | Community | Nov 2025 | 120 STEM students & educators | Outreach Lead + 4 team mentors | Interactive AR rover navigation lab, career panel, pre/post surveys. Letters of support from school STEM coordinator. |
| **University Moonshot Demo Day** | Community | Feb 2026 | 80 campus attendees (students, faculty, local press) | PM + Human Factors Lead | Live walkthrough of EV/PR UI, hands-on stations, attendee feedback app, accessible signage plan. |
| **AR/Unreal Safety Workshop w/ Partner Studio** | Industry | Jan 2026 | 25 professional mentors | PR UI Lead + Industry Liaison | Joint session on DUST integration, hazard modeling best practices, mentorship pairings, NDAs as needed. |
| **Autonomy Safety Review w/ Regional Robotics Lab** | Industry | Mar 2026 | 15 robotics engineers | Autonomy Lead | Formal design review, risk assessment checklist, follow-on internship pathways. |
| **NASA SUITS Outreach Livestream** | Community | Apr 2026 | 200 virtual viewers | Communications Lead | Broadcast of rehearsal highlights with moderated Q&A, captioning, archived for recruitment. |

**Professional Development Strategy:** Mentorship ladder pairing students with industry experts, certification pathways (Unity/Unreal, AWS ML), and résumé/portfolio workshops. Every event logs participation metrics, feedback, and follow-up actions for post-mission reporting.

---

## 3. Administrative Requirements (Mandatory)
- **Institutional Letter of Endorsement:** Signed by College Dean; includes commitment to provide travel support and compliance monitoring.
- **Faculty Statement:** Supervising faculty pledges oversight from proposal through onsite testing, acknowledging consequences for non-compliance.
- **Statement of Rights of Use (Optional/Recommended):** Signed by all team members and faculty, granting NASA usage rights to software, imagery, and derived materials.
- **Additional Materials:** NASA-compliant logo assets (horizontal & stacked), preliminary budget (~$8.5k with 15% contingency), Hololens 2 loan declaration if applicable.

---

## 4. Appendices
- **Appendix A:** Work Breakdown Structure & RACI chart (to be finalized post-acceptance).
- **Appendix B:** Risk Register with mitigation status (living document maintained by PMO).
- **Appendix C:** Outreach artifact samples (lesson plans, slide decks, press kit) once created.

---

*This proposal draft aligns with the FY26 scoring rubric and internal implementation roadmap to maximize scoring potential and execution readiness.*
