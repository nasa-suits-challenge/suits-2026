# FY26 NASA SUITS Proposal — Team Tuxedo

## Abstract
Team Tuxedo will deliver an integrated mission decision-support system for the FY26 NASA SUITS challenge. We
propose a pressurized rover (PR) console and a paired spacesuit (EV) display that share a common telemetry
backbone and an Artificial Intelligence Assistant (AIA). Our concept improves night-time situational awareness,
reduces cognitive load during nominal and off-nominal procedures, and de-risks autonomy by keeping humans in
control. The solution covers the full EVA timeline from initial scene through ingress, enabling NASA evaluators to
observe interoperable interfaces, autonomy, and voice interaction within the DUST simulation environment and the
JSC Rock Yard.【F:docs/prd.md†L1-L115】

---

## 1. Design Description

### 1.1 Goals and Expected Results
- **Mission-readiness:** Deliver a rover console that visualizes the search pattern, consumables, hazards, and
shared mission timers so PR operators can coordinate with the EVA crew in real time.
- **Cognitive relief for EVA crew:** Provide a glove-friendly AR/tablet interface that keeps vitals, navigation
breadcrumbs, and procedures visible under low-light conditions while allowing quick voice/touch interaction.
- **Trusted autonomy:** Deploy a layered autonomy stack that plans routes, monitors consumables, and produces
AIA explanations before the rover executes actions.
- **Interoperability:** Synchronize points of interest (POIs), hazard overlays, procedure progress, and caution/
warning (C&W) states between the PR and EV interfaces, supporting cross-team collaboration once NASA
assigns paired partners.

Expected results include improved navigation efficiency, faster anomaly recovery via AI-guided playbooks, and
quantitative metrics from HITL testing that demonstrate workload reductions versus baseline procedures.

### 1.2 System Overview
- **PR Mission Console:** Built in Unreal DUST, the console presents a 2D/3D map, autonomy controls, resource
dials, and shared POIs. Operators can assign search sectors, approve rover plans, and monitor mission timers.
- **Spacesuit Display:** Delivered on HoloLens 2 (primary) with rugged tablet fallback, featuring a HUD, map
panel, procedure runner, and alert tray tailored for night operations.
- **Telemetry Middleware:** A TypeScript telemetry client bridges NASA’s Telemetry Stream Server (TSS) to both
interfaces via WebSocket JSON/GeoJSON streams, ensuring ≥2 Hz updates for all assets.【F:docs/prd.md†L37-L91】
- **Artificial Intelligence Assistant:** A hybrid NLP stack blends deterministic intents, an open-weight LLM (Phi-4
or equivalent) for on-device reasoning, and a cloud-isolated large model (GPT-4o mini) for non-critical guidance.
- **Data Logger & Replay:** Captures telemetry, commands, and transcripts to accelerate analysis and regression
from HITL sessions.

### 1.3 Innovation Highlights
- **Predictive Range & Energy Co-Pilot:** Combines rover power modeling with EVA consumables to compute
turn-back thresholds and highlight safe corridors on both displays.
- **Explainable Autonomy Cards:** Every autonomous action surfaces a plain-language rationale, constraints, and
telemetry snapshot within the console and via AIA narration, reinforcing trust.
- **Adaptive Visibility:** Night mode, luminance-aware widgets, and dynamic text sizing respond to ambient light
and glove input, validated through night-field tests.
- **Joint Procedure Canvas:** EVA and PR users view the same checklist with real-time status badges and
capability to hand off tasks or request assistance via voice.

---

## 2. Concept of Operations

1. **Initial Scene:** PR operators review mission timers, assign the initial search pattern, and verify rover health.
   The EVA display shows mission objectives and a condensed consumables summary.
2. **PR Navigation & Search:** Autonomy proposes a lawnmower sweep; operators approve via console. Shared
   POIs and beacon heatmaps appear on both interfaces. AIA provides quick-turn voice updates (“Beacon signal
   increasing north-east”).
3. **Egress:** EVA crew follows a voice-guided checklist. Suit telemetry mirrors on the PR console so operators can
   confirm deltas. Any mismatch triggers a cross-device alert.
4. **EV Navigation:** The EVA display projects breadcrumbs, hazards, and range rings. If autonomy detects new
   obstacles, it proposes alternate routes for crew confirmation.
5. **LTV Repair:** Procedure runner surfaces context-specific steps with AR overlays on critical hardware. AIA
   verifies voice read-backs and logs completion for the PR team.
6. **Ingress:** Both teams follow closure procedures, confirm consumables, and archive data for post-mission review.

The CONOPS ensures NASA evaluators can follow interface transitions, autonomy approvals, and HITL
integration across the entire EVA workflow described in the mission description.【8a95fc†L1-L40】【8a95fc†L41-L84】

---

## 3. Feasibility

- **Technical readiness:** Our team has shipped prior-year SUITS prototypes and maintains reusable TypeScript
telemetry clients, Unreal autonomy modules, and AR UI components. We will reuse and harden these assets.
- **Production plan:** Workstreams align with the Implementation Plan phases, with sprint demos each two weeks.
Core milestones cover telemetry integration (Dec), navigation/autonomy beta (Jan–Feb), and integrated EVA
rehearsals (Mar), culminating in the SDR deliverables by April 2, 2026.【F:docs/implementation.md†L1-L120】
- **Resources:** HoloLens 2 (loan requested), Surface Go tablets (2), VR-ready laptop for DUST, telemetry server,
 and safety gear. Budget estimated at $8.5K with 15% contingency secured via campus grants.【F:docs/implementation.md†L121-L160】
- **Team structure:** Leads assigned for EV UI, PR UI, Telemetry, Autonomy, AIA, HITL, Outreach, and Admin.
 Weekly syncs and Definition of Done criteria keep deliverables testable.【F:docs/implementation.md†L20-L88】【F:docs/implementation.md†L93-L120】
- **Risk mitigation:** Active risk register covers telemetry delays, hardware access, night visibility, speech noise, and
partner alignment with designated owners and mitigations.【F:docs/implementation.md†L161-L194】

---

## 4. Artificial Intelligence Integration

- **Architecture:**
  - **Tier 1 Deterministic Layer:** Intent parser for critical commands (acknowledge alerts, request status) ensures
    no mission-critical function depends on generative output.
  - **Tier 2 On-Device LLM:** Lightweight Phi-4 (or similar open-weight) running on edge hardware produces
    short guidance summaries, leveraging local telemetry context.
  - **Tier 3 Cloud-Isolated LLM:** GPT-4o mini (or equivalent) available only during development for narrative
    coaching; disabled onsite unless mission assurance approves offline deployment.
- **Guardrails:**
  - Verified data layer enforcing numeric bounds and requiring explicit “unknown” responses if telemetry absent.
  - Checklist-aligned response templates and refusal behavior for out-of-scope requests.
  - Conversation logging with offline review tools for anomaly analysis.
  - Red team scenarios in HITL sessions to probe hallucination risk before SDR.
- **Model justification:** Phi-4 provides compact, efficient edge inference while GPT-4o mini offers higher-fidelity
  reasoning for non-critical insight. Both support function-calling APIs required for structured responses.
- **Safety & transparency:** Every AIA output includes telemetry provenance tags and hyperlinks to relevant UI
  panels. Critical alerts are gated behind deterministic confirmation prompts.

---

## 5. Project Schedule

| Phase | Dates | Objectives | Key Deliverables |
| --- | --- | --- | --- |
| Proposal | Now – Oct 30, 2025 | Complete technical, outreach, and admin sections; red-team review | Submission-ready PDF, budget, letters |
| Foundations | Nov – Dec 11, 2025 | Select hardware, set up repo/CI, build UI shells, enroll all members in orientation | Repo baseline, UI scaffolds, orientation roster |
| Telemetry & AIA Alpha | Dec – Jan 2026 | Integrate TSS, deploy deterministic intents, speech I/O, procedure runner alpha | Telemetry client, voice stack demo |
| Mapping & Autonomy Beta | Jan – Feb 2026 | Implement maps, breadcrumbs, drop-pins, search editor, hazard avoidance, resource models | Autonomy beta, POI sync, range predictor |
| Integrated EVA Rehearsal | Mar 2026 | Full mission walkthroughs, HITL Study #1/#2, metrics collection | Test reports, updated UI, AIA guardrail validation |
| SDR Package | Late Mar – Apr 2, 2026 | Compile video, code bundle, trace matrix | SDR submission bundle |
| Hardening & Onsite Prep | Apr – May 2026 | Performance tuning, failovers, logistics, final night rehearsal | Onsite ops checklist, spares kit |

This schedule aligns with NASA’s official milestones and our internal implementation plan, ensuring resource
allocation, labor distribution, and decision gates are explicit.【F:docs/implementation.md†L1-L120】

---

## 6. Human-in-the-Loop (HITL) Testing Plan

- **Schedule:** Alpha test (late Jan, indoor obstacle course), Beta test (late Feb, outdoor night run), Full EVA rehearsal
  (mid-Mar) with both interfaces integrated.【F:docs/implementation.md†L95-L120】【F:docs/implementation.md†L129-L160】
- **Participants:** 10–16 mixed-experience volunteers, including novice operators and experienced robotics students;
  maintain demographic diversity and ADA accommodations.
- **Protocols:** Within-subject design comparing baseline checklists vs. AI-augmented workflows. Scripted hazards,
  telemetry dropouts, and autonomy escalations measure resilience.
- **Metrics:** Task completion time, path efficiency, C&W acknowledgement latency, speech accuracy (WER), NASA
  TLX workload, mission timeline adherence, and trust-in-autonomy surveys.【F:docs/prd.md†L156-L204】
- **Safety:** Pre-briefs, PPE, spotters, fall-risk audits, radio comms, emergency stop for autonomy, and medical kit on site.
- **Evaluation:** Post-test debriefs, log replay, and metric dashboards determine readiness for SDR and refine AIA prompts.

---

## 7. Technical References

1. NASA SUITS FY26 Mission Description, National Aeronautics and Space Administration, 2025.【8a95fc†L1-L40】
2. NASA SUITS FY26 Proposal Guidelines, National Aeronautics and Space Administration, 2025.【8a95fc†L85-L144】
3. NASA SUITS FY26 FAQs, National Aeronautics and Space Administration, 2025.【8a95fc†L145-L216】

References will be cited inline within the final PDF per guidelines, and a full bibliography will accompany submission.

---

## 8. Community & Industry Engagement Plan

| Event | Date | Audience & Size | Objectives | Leads |
| --- | --- | --- | --- | --- |
| **Hour of Code: Lunar Ops Edition** | Dec 2025 | 100 local high-school students | Introduce lunar robotics, run coding labs using simplified TSS feeds | Outreach Lead + 6 volunteers |
| **University Night Ops Demo** | Jan 2026 | 50 campus students & faculty | Showcase EVA/PR UI prototype, recruit testers, gather feedback | EV UI Lead |
| **Scouts STEM Rover Workshop** | Feb 2026 | 40 scouts & mentors | Teach hazard mapping basics, provide AR mission simulation | Human Factors Lead |
| **AR/Unreal Industry Mentorship Sprint** | Nov 2025 | 6 industry mentors (XR, autonomy) | Pair mentors with sub-teams for design critiques, career pathways | PR UI Lead |
| **Autonomy Safety Roundtable** | Mar 2026 | 5 partner lab engineers | Validate hazard avoidance strategies, discuss certification | Autonomy Lead |
| **Space Industry Career Panel** | Apr 2026 | 80 university attendees | Highlight pathways into NASA programs, emphasize inclusivity | Admin Lead |

Each event includes detailed implementation plans, outreach materials, social media amplification, and follow-up
surveys. Confirmed or in-progress partnerships include local high schools, the Scouts council, and regional XR
companies. Artifacts (lesson plans, slide decks, attendance logs) will be archived for proposal evidence.【F:docs/implementation.md†L121-L160】

---

## 9. Administrative Readiness

- **Letter of Endorsement:** Drafted with College of Engineering Dean; signature targeted by Oct 15, 2025.
- **Faculty Statement:** Supervising faculty committing to oversight across proposal, development, and onsite testing.
- **Statement of Rights of Use:** Team members and advisors will sign optional rights grant to strengthen proposal.
- **Hololens 2 Loan Declaration:** Included in administrative packet per NASA requirements.【F:docs/implementation.md†L121-L160】

All documents will use institutional letterhead and be compiled alongside budget worksheets and logos before
proposal submission.

---

## 10. Budget Summary

| Category | Cost (USD) | Notes |
| --- | --- | --- |
| Flights | $4,500 | 7 students + 1 faculty to Houston |
| Lodging | $2,000 | 5 nights, dual-occupancy |
| Ground Transport | $400 | Rental van, fuel |
| Equipment & Spares | $600 | Tablets, radios, safety gear |
| Software & Cloud | $500 | LLM fine-tuning credits, Unreal plugins |
| Outreach Materials | $300 | Workshop kits, printing |
| Contingency (15%) | $1,200 | Covers overruns |
| **Total** | **$9,500** | Includes contingency expansion over baseline $8.5K |

Budget aligns with institutional funding requests and sponsorship outreach in progress.【F:docs/implementation.md†L121-L160】

---

## 11. Evaluation & Traceability

We will maintain a live requirements trace matrix linking NASA mission requirements to UI features, autonomy
functions, and acceptance tests. Updates occur at sprint reviews and prior to SDR submission. Post-HITL metrics
feed into the matrix to confirm performance thresholds are met or flagged for remediation.【F:docs/prd.md†L115-L155】

---

## 12. Conclusion

Team Tuxedo’s proposal delivers an innovative, feasible, and safe mission decision-support system that meets the
FY26 NASA SUITS objectives. By combining explainable autonomy, resilient AI guardrails, rigorous HITL testing,
and proactive outreach, we provide NASA evaluators with a compelling, high-scoring solution ready for selection
and execution.
