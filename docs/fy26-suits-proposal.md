# FY26 NASA SUITS Proposal — Team TBD

**Primary Contact:** TBD (email@university.edu)
**Institution:** TBD University — College of Engineering
**Challenge Focus:** Spacesuit UI + Artificial Intelligence Assistant; Pressurized Rover UI + Autonomy

---

## Technical Section

### 1. Design Description
Our concept delivers paired interfaces for both assigned assets so we can execute the entire EVA scenario and interoperate with our NASA-assigned partner team. The proposal centers on four design goals:

1. **Zero-ambiguity situational awareness.** The spacesuit and pressurized rover (PR) displays prioritize always-on life support, navigation state, and caution and warning (C&W) indicators that adhere to NASA SUITS requirements for biomedical, suit, and rover telemetry visibility.【F:docs/prd.md†L28-L80】【F:docs/fy26-suits-mission-description.pdf†L77-L134】
2. **Mission-phase guidance with adaptive autonomy.** Both assets expose contextual procedure cards and allow operators to jump between EVA phases—Egress, EV Navigation, LTV Repair, Ingress—without leaving the current view.【F:docs/prd.md†L81-L133】
3. **Shared spatial understanding.** A synchronized 2D map overlays breadcrumbs, predictive range rings, LTV search sectors, rover autonomy plans, and points of interest (POIs) so crews can collaborate in real time and fulfill interoperability requirements.【F:docs/prd.md†L134-L197】【F:docs/fy26-suits-mission-description.pdf†L89-L134】
4. **Cognitive load reduction through voice-led workflows.** The Artificial Intelligence Assistant (AIA) provides concise speech prompts, mission timers, resource analytics, and playbooks to keep the crew focused while complying with NASA’s guardrail expectations.【F:docs/prd.md†L42-L80】【F:docs/implementation.md†L100-L118】

**Spacesuit UI innovation.** We deploy a passthrough AR interface (HoloLens 2 or rugged tablet fallback) with layered widgets: a horizon-locked HUD for vitals and alerts, a wrist-accessed map for POIs/drop pins, and a procedure runner that listens for read-backs. Breadcrumbs, predictive range, and best-path recommendations are visualized directly in the AR field to support safe night operations.【F:docs/prd.md†L134-L189】

**Pressurized Rover UI innovation.** Within NASA’s DUST environment, the PR mission console fuses the autonomy planner with manual controls. Operators see rover pose, hazard masks, and resource projections in a single, color-coded panel. Shared POIs are managed via a collaborative queue so the PR crew can promote EVA discoveries into search objectives without duplicating effort.【F:docs/prd.md†L97-L133】【F:docs/prd.md†L172-L197】

**Expected results.** The integrated system will enable rapid target acquisition of the lost LTV, maintain continuous crew safety, and provide metrics that demonstrate faster procedure execution and reduced navigation errors compared with baseline manual methods identified in the mission description.【F:docs/fy26-suits-mission-description.pdf†L59-L116】【F:docs/implementation.md†L63-L99】

### 2. Concept of Operations
The mission concept mirrors NASA’s scenario while highlighting autonomy and interoperability touchpoints：【F:docs/fy26-suits-mission-description.pdf†L59-L134】

1. **Initial scene.** PR operators load mission context and confirm hardware health from the mission console. AIA summarizes consumables and pending tasks.
2. **Pressurized rover navigation.** The autonomy engine selects an initial search pattern and broadcasts the planned trajectory to the map layers. Operators monitor hazard detections and can retask via POIs.
3. **Egress.** AIA-guided checklists coordinate UIA/DCU switch verification. The spacesuit HUD confirms depressurization, suit pressure, and comms status before egress.
4. **EV navigation.** Astronaut follows AR breadcrumbs toward the LTV search area while AIA delivers route advisories and resource projections. PR console displays EV trace, range margins, and LTV beacon signal.
5. **LTV repair.** Procedure runner and PR console share synchronized steps. If hazards arise, autonomy replans to stage tools or provide alternative paths.
6. **Ingress.** Reverse procedures triggered automatically. Mission timers and logs finalize for SDR reporting.

### 3. Feasibility
Our staged implementation plan aligns with NASA’s official calendar and internal checkpoints, ensuring readiness for SDR and onsite testing.【F:docs/implementation.md†L1-L118】 Key feasibility factors include:

- **Team structure.** Six workstreams with named leads (Spacesuit UI/AIA, PR UI/Autonomy, Telemetry, Human Factors, Outreach, Documentation) hold weekly demos and Definition of Done gates.【F:docs/implementation.md†L31-L61】
- **Technology stack.** TypeScript/React for suit HUD, Unreal blueprints/C++ for PR console, Python microservices for telemetry bridges, and modular AI services deployable offline.
- **Production approach.** Repo standards, integration cadence, and risk mitigations (mock TSS server, hardware fallbacks, autonomy geofencing) are defined in the implementation plan.【F:docs/implementation.md†L63-L159】
- **Resource planning.** Budget of ~$8.5K covers travel, hardware, and contingency; university sponsors and Space Grant proposals offset costs.【F:docs/implementation.md†L161-L168】

### 4. Artificial Intelligence Integration
We implement a tiered AI architecture emphasizing verified data and mission safety.【F:docs/prd.md†L42-L118】【F:docs/implementation.md†L100-L118】

- **Models.** Deterministic grammars handle critical intents; a fine-tuned small language model (e.g., Llama 3.1 8B) runs locally for conversational context; a larger hosted model (e.g., GPT-5 Codex) is sandboxed for non-critical coaching when connectivity allows.
- **Guardrails.** Telemetry-grounded responses, numeric range validation, “unknown” fallbacks, and confirmation prompts precede any action. No AI directly actuates hardware without human approval.
- **Hallucination mitigation.** A verification layer cross-checks model output against telemetry truth tables; deviations trigger C&W alerts and log entries.
- **Interoperability.** AI summaries, POI priorities, and mission timers publish over TSS-compatible channels to keep paired teams synchronized.

### 5. Project Schedule
The schedule blends NASA milestones with internal sprint structure to ensure traceability of deliverables.【F:docs/implementation.md†L63-L132】

| Phase | Dates | Objectives | Leads & Labor | Deliverables |
| --- | --- | --- | --- | --- |
| Proposal | Now – 30 Oct 2025 | Draft technical, AI, HITL, outreach, admin sections | Proposal + Outreach leads (40%); HF (10%) | Submission-ready PDF, LOI, faculty letter |
| Foundations | Nov – 11 Dec 2025 | Hardware decision, repo/CI, telemetry scaffolding | Telemetry (30%), UI leads (40%), Doc (10%) | Device plan, CI pipeline, UI shells |
| Telemetry & AIA Alpha | Dec 2025 – Jan 2026 | Integrate TSS, deliver AIA v1 speech + procedures | Telemetry (35%), AIA (35%), HF (15%) | Mock server, alpha UI walkthrough |
| Mapping & Autonomy Beta | Jan – Feb 2026 | Implement map layers, autonomy planner, hazard mask | PR Autonomy (45%), Spacesuit UI (25%) | Beta autonomy demo, map validation logs |
| Integrated EVA Rehearsal | Mar 2026 | Full mission flow, HITL runs | HF (40%), All leads (shared) | HITL dataset, change log |
| SDR Package | Late Mar – 2 Apr 2026 | Assemble video, reports, trace matrix | Doc (35%), UI leads (35%) | SDR submission package |
| Hardening & Onsite Prep | Apr – May 2026 | Performance tuning, travel logistics, final rehearsal | All leads | Onsite readiness review, packing list |

### 6. Human-in-the-Loop Testing
Our HITL program verifies safety, usability, and autonomy effectiveness before SDR.【F:docs/implementation.md†L118-L159】【F:docs/prd.md†L198-L219】

- **Schedule:** Alpha (late Jan), Beta (late Feb), and Full EVA rehearsal (mid-Mar) align with sprint milestones.
- **Protocols:** Within-subject design comparing UI/AIA variants, scripted hazards, and counterbalanced mission orders. Includes indoor obstacle course and outdoor night testing in analogous terrain.
- **Metrics:** Task completion time, navigation error, alert acknowledgment latency, speech word error rate (WER), NASA TLX workload, and resource estimation accuracy.
- **Subjects:** 10–16 participants across engineering disciplines; safety spotters and medical checklists enforced.
- **Evaluation:** Metrics drive pass/fail gates for requirements, with traceability to requirement IDs. Findings inform UI refinements logged in change matrix.
- **Safety:** Site surveys, PPE, radio comms, emergency stop protocol, and environmental lighting assessments precede each run.

### 7. Technical References
1. NASA SUITS Program Office. *FY26 SUITS Mission Description.* NASA, 2025.【F:docs/fy26-suits-mission-description.pdf†L1-L134】
2. NASA SUITS Program Office. *FY26 SUITS Proposal Guidelines.* NASA, 2025.【F:docs/fy26-suits-proposal-guidelines.pdf†L1-L20】
3. Team TBD. *NASA SUITS FY26 Product Requirements Document (PRD).* Version 1.0, Oct 2025.【F:docs/prd.md†L1-L221】
4. Team TBD. *NASA SUITS FY26 Implementation Plan.* Version 1.0, Oct 2025.【F:docs/implementation.md†L1-L168】

---

## Community and Industry Engagement
We will conduct at least four events spanning diverse audiences, pairing outreach artifacts with measurable outcomes.【F:docs/implementation.md†L143-L159】【F:docs/prd.md†L220-L221】

| Event | Date & Audience | Description & Objectives | Expected Participation | Leaders |
| --- | --- | --- | --- | --- |
| Hour of Code: Artemis Navigation | Dec 2025 — 100 local HS students | Hands-on coding modules simulating EVA breadcrumb logic; showcase AR interface mockups. | 100 students, 10 mentors | Outreach Lead, Spacesuit UI Lead |
| University Lunar Ops Night | Feb 2026 — campus community | Live PR autonomy demo in DUST, panel with NASA alumni, recruitment for diversity pipelines. | 50 attendees, 6 presenters | PR Autonomy Lead |
| Scouts Robotics Workshop | Mar 2026 — regional Scouts council | Build-and-test rover kits, discuss NASA careers, collect feedback on UI clarity. | 60 scouts, 12 volunteers | Human Factors Lead |
| Industry Safety & Autonomy Roundtable | Apr 2026 — partner lab/company | Review hazard mitigation, autonomy guardrails, and certification pathways; seek mentorship commitments. | 5 industry mentors, 15 team members | PM & Industry Liaison |
| AR/Unreal Mentorship Sprint | Ongoing Jan–Apr 2026 — AR/VR professionals | Monthly virtual mentorship with AR/Unreal experts to critique UI iterations and build professional networks. | 6 mentors, 12 students | Outreach Lead |

Professional development includes resume workshops, certification subsidies (Unity/Unreal safety modules), and tracking of mentorship outcomes to feed into final NASA reporting.

---

## Administrative Commitments
- **Institutional Letter of Endorsement:** Dean of Engineering signature affirming resource and facility support (drafted, pending final approval by Oct 15, 2025).【F:docs/implementation.md†L169-L179】
- **Supervising Faculty Statement:** Faculty PI commits to oversight of proposal, development, HITL testing, and onsite participation.
- **Statement of Rights of Use (Optional):** Team members and faculty advisors will co-sign the NASA rights-of-use template to strengthen consideration.
- **Hardware Declarations:** Include Hololens 2 loan request, PR workstation specs, and any peripherals for SDR approval.【F:docs/implementation.md†L169-L179】
- **Budget Summary:** $8.5K total with 15% contingency; funding sources include institutional grants, sponsors, and student organization support.【F:docs/implementation.md†L161-L168】

---

**Appendices available upon request:** Requirements trace matrix, risk register, and outreach artifact drafts.
