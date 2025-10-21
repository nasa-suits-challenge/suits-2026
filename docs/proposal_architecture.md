# FY26 NASA SUITS Proposal Architecture

This document maps the official proposal guidelines and scoring rubric to the
sections we must deliver. Treat it as the structural blueprint for drafting the
final submission. Items flagged with **Team Input Needed** require confirmation
from the broader team before the proposal can be completed.

---

## Cover Page
- Populate all required fields: team name, optional logo, institution name and address, team contact (name, email, phone), full roster with roles/majors/academic years, faculty advisor contact plus signature/date.
- **Team Input Needed:** Final roster details, phone numbers, advisor signature logistics, latest logo assets.

## Table of Contents
- Auto-generate once the document is finalized to match the exact order below.
- Include all mandatory sections; keep page numbers in sync when exporting to PDF.

## 1. Introduction
- Summarize SUITS mission context, FY26 scenario, and TUXEDO’s overarching vision.
- Highlight unique value and alignment to NASA goals; leverage `docs/PRD.md`.
- **Team Input Needed:** Final mission statement/vision approval from project lead.

## 2. Eligibility
- Declare compliance: all members ≥18, enrolled in eligible programs, STEM Gateway enrollment, advisor availability for orientation, SDR, onsite test.
- Note single-team participation constraint and advisor travel commitment.
- **Team Input Needed:** Enrollment verification status, advisor travel confirmation.

## 3. Letter of Intent
- State LOI submission date, recipient email, subject line, and summary of contents.
- If no LOI submitted, document rationale.
- **Team Input Needed:** Copy of LOI email or decision to proceed without LOI.

## 4. Proposal Requirements Compliance
- Provide checklist confirming 12 pt font, 12-page technical section limit, all sections present, figures labeled, title page complete, submission via STEM Gateway by **Thu, Oct 30, 2025**.
- Reference `docs/ADMIN_CHECKLIST.md` for final verification.
- **Team Input Needed:** Confirmation of final formatting and submission process owner.

---

## 5. Technical Section (≤12 pages including figures)

### 5.1 Abstract (≤500 words)
- Summarize prototype objectives, EVA scenario coverage, planned HITL testing, and hardware/peripherals required.
- **Team Input Needed:** Final hardware list, differentiators, testing highlights.

### 5.2 Software & Hardware Design Description *(Rubric: Design Description 25 pts max)*
- Provide architecture overview across `apps/ev-ui`, `apps/pr-ui`, `services/aia`, and `libs/tss-client`.
- Include system diagrams, UI wireframes, audio/voice flows, telemetry integration (`docs/TSS_INTEGRATION.md`), and hardware interface plans.
- Discuss autonomy, navigation, hazard detection, and mission support features.
- **Team Input Needed:** Updated diagrams/wireframes, hardware interface specs.

### 5.3 Concept of Operations *(Rubric: CONOPS 10 pts)*
- Detail end-to-end EVA scenario: nominal path, contingencies, rover coordination, communication loops.
- Reference `docs/CONOPS.md` and `docs/UIA_PROCEDURES_PLAYBOOK.md`.
- **Team Input Needed:** Validation of scenario timing and branch logic.

### 5.4 Feasibility & Production Plan *(Rubric: Feasibility 10 pts)*
- Explain implementation phases, design-to-build workflow, resource availability, fabrication/testing facilities, risk mitigations.
- Cite `docs/PROJECT_MANAGEMENT.md` and `docs/DEVICE_SELECTION.md`.
- **Team Input Needed:** Inventory of available hardware, lab access, fabrication partners.

### 5.5 Artificial Intelligence Integration *(Rubric: AI Integration 15 pts)*
- Describe model choices (LLMs, CV, speech), deployment strategy (edge vs. cloud), guardrails, hallucination mitigation, telemetry cross-checks.
- Align with `docs/AI_INTEGRATION.md` and `services/aia` guardrail policies.
- **Team Input Needed:** Final model selection, licensing status, compute budgets.

### 5.6 Project Schedule *(Rubric: Schedule 5 pts)*
- Present milestone chart covering Oct proposal → Dec orientation → Apr SDR → May onsite testing → June white paper.
- Include labor allocation across subteams, sprint cadence, holiday impacts.
- **Team Input Needed:** Confirmed sprint schedule, academic calendar conflicts.

### 5.7 Human-in-the-Loop Testing *(Rubric: HITL 10 pts)*
- Provide testing timeline, participant demographics, protocols, metrics (NASA-TLX, task completion, comm latency), safety considerations.
- Use `docs/HITL_TEST_PLAN.md` as baseline.
- **Team Input Needed:** Subject pool access, IRB/ethics requirements, simulator booking.

### 5.8 Technical References *(Rubric: References 5 pts)*
- Cite ≥2 authoritative sources (EVA standards, XR/AI research); include inline citations and bibliography.
- Choose consistent citation style (APA/IEEE) and document it.
- **Team Input Needed:** Final bibliography owner and citation format decision.

---

## 6. Community & Industry Engagement *(Rubric: Engagement 20 pts)*

### 6.1 Community Engagements
- Detail ≥2 events (audience, objectives, logistics, metrics) aligned with outreach goals.
- Derive content from `docs/OUTREACH_AND_INDUSTRY_PLAN.md`.
- **Team Input Needed:** Confirmed event partners, dates, volunteer leads.

### 6.2 Industry Engagements
- Provide ≥2 industry collaborations, mentorship plans, alignment with project outcomes, professional development angles.
- Include contact cadence and expected deliverables.
- **Team Input Needed:** Confirmation from identified industry partners, letters or MOUs.

---

## 7. Administrative Section

### 7.1 Institutional Letter of Endorsement
- Summarize letter status, storage location, and signer.
- **Team Input Needed:** Signed PDF delivery timeline.

### 7.2 Supervising Faculty Statement
- Confirm required language and location within proposal.
- **Team Input Needed:** Faculty confirmation of statement text.

### 7.3 Statement of Rights of Use
- Decide whether to grant optional rights; include signed statements if opting in.
- **Team Input Needed:** Team consensus on IP permissions.

### 7.4 Funding & Budget Statement
- Present budget table (travel, lodging, hardware, testing, misc) using `docs/BUDGET_TEMPLATE.md`.
- List funding sources (Space Grant, institutional funds, sponsors).
- **Team Input Needed:** Updated cost estimates, confirmed funding commitments.

### 7.5 Hololens2 Loan Program
- Declare Option A/B/C with justification and device count.
- **Team Input Needed:** Device inventory status, institutional loan agreements.

### 7.6 Proposal Scoring Method
- Explain internal review process referencing `docs/RUBRIC_SELF_ASSESSMENT.md`.
- Document planned pre-submission scoring checkpoints.

### 7.7 Other Deliverables
- Commit to April POV video, June white paper, and outline responsible subteams.
- **Team Input Needed:** Ownership of video production and white paper draft.

### 7.8 Logo Use
- Confirm horizontal and vertical logo assets uploaded to STEM Gateway or include link.
- **Team Input Needed:** Marketing approval and asset repository path.

---

## 8. Proposal Scoring Rubric
- Include official rubric (Section 8 of guidelines) within the proposal appendix.
- Summarize internal self-assessment results referencing `docs/RUBRIC_SELF_ASSESSMENT.md`.
- **Team Input Needed:** Completed self-assessment scores once draft matures.

---

## Appendices (Do Not Count Toward Technical 12-Page Limit)
- Extended wireframes, system diagrams, logs, or additional test data.
- Letters (endorsement, rights-of-use), outreach confirmations, budget backup sheets.
- POV video storyboard, white paper outline, extended schedule (Gantt).
- **Team Input Needed:** Ownership for each appendix item and delivery deadlines.

---

## Execution Checklist
- Assign section owners and draft deadlines.
- Schedule rubric-based internal review one week before **Thu, Oct 30, 2025**.
- Confirm formatting compliance (12 pt font, labeled figures/tables, page limits).
- Track outstanding **Team Input Needed** items in the project tracker and escalate blockers early.
