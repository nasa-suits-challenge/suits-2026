# FY26 NASA SUITS Proposal — Team Tuxedo

## 1. Abstract
Team Tuxedo proposes an integrated mission operations suite that combines a pressurized rover (PR) mission console and a
spacesuit augmented reality (AR) experience with a voice-enabled Artificial Intelligence Assistant (AIA). Our concept augments
crew autonomy during the FY26 lunar EVA scenario by fusing telemetry-driven decision support, mixed-reality navigation, and
resilient autonomy that cooperatively locate, assess, and recover the Lunar Terrain Vehicle (LTV). The solution emphasizes
night-friendly visual design, mission timers synchronized across assets, and verified AI guidance to reduce cognitive load in the
Johnson Space Center (JSC) Rock Yard environment.

## 2. Technical Section

### 2.1 Software and Hardware Design Description (25 points)
- **Design goals & expected results**
  - Deliver a mission-ready PR console that maintains shared situational awareness of PR, EV, and LTV states at ≥2 Hz, enabling
    autonomous search with manual override, predictive consumable analytics, and live procedures. Expected result: PR operators
    can command the rover, visualize hazard-avoiding paths, and coordinate with EV crew within NASA performance targets.
  - Provide an EV AR HUD optimized for low-light EVA operations with gloved interaction, breadcrumb-based navigation, and
    mission-critical telemetry overlays. Expected result: astronauts maintain safe traverses, execute UIA/DCU procedures, and
    receive AI-summarized cautions in under 1.5 seconds.
  - Establish interoperability via TSS-compliant WebSocket services, ensuring points of interest (POIs), Caution & Warning (C&W)
    advisories, and mission timers remain consistent between PR and EV experiences.
- **Innovative interfaces**
  - **PR Console:** Multi-layer lunar map with edit-in-place search patterns, hazard heatmaps, and a predictive resource dial that
    transitions from text to voice alerts when approaching constraints. Touch + hotkey controls support rapid re-plans in DUST.
  - **EV AR HUD:** See-through AR anchored to horizon with adaptive contrast, voice-driven procedure runner, and contextual AI
    callouts that reference telemetry rather than scripts. Breadcrumbs generate a luminous “return corridor” while the AI projects
    remaining range as a dynamic ring.
  - **AIA Interaction Fabric:** Tiered voice assistant enabling quick intent confirmation, co-signed procedure steps, and
    annotation of POIs via speech for both PR and EV operators.
- **Challenge component coverage**
  - PR control and autonomy, EV AR navigation, LTV telemetry visualization, AI-guided C&W, UIA/DCU procedure support, and
    interoperability with paired teams. Visual artifacts (wireframe panels, AR overlays, autonomy block diagram) will be included in
    the final PDF to meet maximum scoring criteria.【F:docs/prd.md†L9-L132】【F:docs/implementation.md†L9-L125】【F:docs/fy26-suits-mission-description.pdf†L27-L204】

### 2.2 Concept of Operations (10 points)
1. **Initial Scene:** PR operators review mission brief within the console, confirm rover health, and coordinate search sectors with
   the paired team. EV crew completes pre-EVA checks with the AIA verifying UIA/DCU configuration.
2. **PR Navigation & Search:** Autonomous planner (A*/RRT*) generates a lawnmower pattern across designated tiles. Operators
   monitor consumables, adjust search radius based on LTV beacon strength, and annotate POIs. AI delivers periodic verbal
   summaries of coverage percentage and suggests replans when hazards block progress.
3. **Egress:** EV HUD switches to procedure runner mode. Voice commands advance steps, while telemetry cross-checks gate
   transitions. PR console mirrors completion status to maintain shared awareness.
4. **EV Navigation:** Breadcrumbs begin at airlock exit. HUD displays predictive range rings and best-path overlays, while AIA
   alerts on terrain slope and consumable thresholds. PR console updates EV trail and reroutes search patterns to avoid conflicts.
5. **LTV Repair:** HUD surfaces context-sensitive procedure cards with live suit state badges. AIA provides verification prompts and
   allows the astronaut to log anomalies via speech. PR console provides remote diagnostics support and syncs new POIs.
6. **Ingress:** HUD guides astronaut back using breadcrumbs and updated best path. PR console transitions to power-down and
   data logging, ensuring mission timers, logs, and C&W acknowledgements are archived for post-mission review.【F:docs/prd.md†L34-L133】【F:docs/fy26-suits-mission-description.pdf†L55-L176】

### 2.3 Feasibility (10 points)
- **Team readiness:** Cross-functional leads across PR UI & Autonomy, Spacesuit UI & AIA, Telemetry Integration, Human Factors,
  Outreach, and Documentation ensure coverage of each workstream with weekly demos and definitions of done.【F:docs/implementation.md†L19-L127】
- **Production approach:** Existing repo scaffolding provides modular workspaces for EV and PR clients, integration services, and
  documentation, reducing spin-up time. Early sprints focus on TSS adapters, AR HUD shell, and DUST autopilot harness.
- **Risk mitigations:** Local TSS mocks, offline AI inference, geofenced autonomy, and manual overrides address mission-critical
  risks. Hardware availability mitigated by early Hololens2 loan request with rugged tablet fallback.【F:docs/implementation.md†L60-L181】
- **Resource plan:** Budget of $8.5K with 15% contingency covers travel, hardware, and software licenses; outreach partnerships and
  institutional support letters are in progress.【F:docs/implementation.md†L135-L175】

### 2.4 Artificial Intelligence Integration (15 points)
- **Architecture:** Three-tier intent pipeline—deterministic command grammar for critical actions, a lightweight on-device model
  (Distil-Whisper + distilled LLM) for standard phrasing, and a sandboxed large model (e.g., Llama 3 70B running via on-premise
  inference server) for advisory conversations. Mission-critical data is validated through the verified data layer before reaching the
  operator.【F:docs/prd.md†L70-L112】
- **Use cases:** Telemetry summaries, anomaly explanations, procedure co-piloting, navigation prompts, and resource forecasts for
  both PR and EV. AI also harmonizes POI labels between teams.
- **Model justification:** On-device components ensure latency and offline resilience, while Llama 3 provides nuanced guidance for
  non-critical dialog without external dependencies. Speech stack leverages NASA-approved vocabularies and custom wake words.
- **Mitigations:** No-guess policy for unknown telemetry, range checks for numeric outputs, double-confirmation for procedure
  gating, and continuous conversation logging for audit. AI outputs feed into C&W but cannot actuate hardware without human
  confirmation.【F:docs/prd.md†L70-L111】

### 2.5 Project Management & Schedule (5 points)
| Phase | Dates | Objectives |
| --- | --- | --- |
| Proposal | Now → Oct 30, 2025 | Finalize technical, outreach, admin sections; Oct 24 content freeze; Oct 28 red-team; Oct 30 submission. |
| Foundations | Nov → Dec 11, 2025 | Hardware down-select, repo CI, telemetry client scaffolding, UI shells, orientation compliance. |
| Telemetry & AIA Alpha | Dec 2025 → Jan 2026 | Integrate TSS mocks/live feed, AIA v1, paired-team coordination cadence. |
| Mapping & Autonomy Beta | Jan → Feb 2026 | EV map + breadcrumbs, PR autonomy planner, interop POI sync + LTV beacon fusion. |
| Integrated EVA Rehearsal | Mar 2026 | Full mission flow, HITL indoor/outdoor trials, metrics-driven iteration. |
| SDR Prep | Late Mar → Apr 2, 2026 | Demo video, test summaries, trace matrix. |
| Hardening & Onsite Prep | Apr → May 2026 | Performance tuning, failovers, night rehearsals, travel logistics. |【F:docs/implementation.md†L33-L124】

### 2.6 Human-in-the-Loop (HITL) Testing (10 points)
- **Schedule:** Alpha (late Jan), Beta (late Feb), Full EVA rehearsal (mid-Mar) aligned with mission phases; follow-up night test at
  local quarry to mirror Rock Yard lighting.【F:docs/implementation.md†L97-L124】
- **Protocol:** Within-subject design comparing AR HUD iterations and PR console layouts; scripted hazards (telemetry drop,
  beacon drift) challenge decision-making. Push-to-talk fallback ensures voice reliability.
- **Metrics:** Task time, path efficiency, breadcrumb retrace success, hazard avoidance incidents, speech word error rate,
  C&W acknowledgement latency, NASA TLX workload, qualitative debrief.
- **Participants:** 12–16 volunteers including engineering students, analog astronauts, and accessibility advocates; demographics
  tracked for diversity. Medical staff on call; safety spotters assigned per pair.
- **Evaluation:** Metrics feed sprint retros, focusing on navigation errors, AI accuracy, and autonomy trust. Data logged for SDR.
- **Safety:** PPE, lighting audits, med kit, radios, geofenced autonomy, emergency stop hardware, and weather go/no-go matrix.

### 2.7 Technical References (5 points)
1. NASA SUITS FY26 Mission Description, NASA (2025).【F:docs/fy26-suits-mission-description.pdf†L25-L204】
2. NASA SUITS FY26 Proposal Guidelines, NASA (2025).【F:docs/fy26-suits-proposal-guidelines.pdf†L1-L210】
3. Team Tuxedo PRD v1.0 (2025).【F:docs/prd.md†L1-L177】
4. Team Tuxedo Implementation Plan v1.0 (2025).【F:docs/implementation.md†L1-L181】

## 3. Community & Industry Engagement (20 points)
- **Community Events**
  1. **Hour of Code Moonwalk Edition:** Partner with Clear Lake High School (100 students). Activity includes lunar navigation coding
     challenge aligned to Texas CS standards; led by Outreach Lead with NASA mission tie-in. Deliverables: lesson plan, student
     feedback, social media recap.【F:docs/implementation.md†L143-L175】
  2. **Night at the Observatory Demo:** University outreach event (60 attendees) featuring AR HUD tryouts under low-light dome;
     involves local civic leaders and STEM clubs, recorded for future recruitment.
  3. **Scout Robotics Workshop:** Joint event with Girl Scout Troop 332 (40 participants) building hazard avoidance bots while
     discussing EVA risk management.
- **Industry Engagement**
  1. **AR/Unreal Mentorship Series:** Collaboration with XR startup mentors for monthly design critiques and UE performance labs.
  2. **Autonomy Safety Review:** Partner with regional robotics lab to evaluate planner safety cases and certify manual override
     procedures.
  3. **Certification Sprint:** Coordinate Unity/Unreal/Cloud safety micro-certifications with industry mentors; track completion as
     professional development outcomes.
  4. **Career Pathways Panel:** Engage alumni at NASA JSC and private space firms for internship pathways and awareness campaign.
- **Plan Governance:** Outreach lead maintains engagement backlog, obtains letters of commitment, and aligns messaging with NASA
  missions. Each event includes objectives, materials, audience prep, and follow-up artifacts to satisfy rubric expectations.【F:docs/implementation.md†L143-L175】【F:docs/fy26-suits-proposal-guidelines.pdf†L96-L190】

## 4. Administrative Summary (Non-Scored Requirements)
- Secure institutional Letter of Endorsement (Dean/Chair) and supervising faculty statement confirming oversight for proposal
  through onsite testing.
- Collect optional Rights of Use signatures to grant NASA usage rights and strengthen consideration.
- Submit budget statement ($8.5K + contingency) and Hololens2 Loan declaration; include horizontal and stacked team logos as
  required.【F:docs/implementation.md†L135-L175】【F:docs/fy26-suits-proposal-guidelines.pdf†L150-L210】

---
Prepared by Team Tuxedo — FY26 NASA SUITS Proposal Technical & Engagement Plan.
