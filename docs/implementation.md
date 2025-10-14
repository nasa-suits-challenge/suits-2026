# NASA SUITS FY26 — Implementation Plan
**Version:** 1.0  
**Date:** 2025-10-14

---

## A) Key External Dates (official & planning)
- **Letter of Intent:** *Oct 2, 2025* (teams may still submit without LOI).  
- **Proposal due (STEM Gateway):** *Oct 30, 2025*.  
- **Orientation (virtual):** *Dec 11, 2025*.  
- **TSS available to selected teams:** *Mid‑Dec 2025 → Early Jan 2026* (target).  
- **Virtual Software Design Review (SDR):** *Apr 2, 2026*.  
- **Onsite testing at JSC:** *May 2026*.  

> NOTE: If any document references April/June 2025 for SDR or white paper, treat as prior‑cycle text; align to **2026** dates and confirm at Orientation.

---

## B) Workstreams & Leads
1. **Spacesuit UI & AIA** — Lead: _TBD_  
2. **PR UI & Autonomy (DUST)** — Lead: _TBD_  
3. **Telemetry & Integration (TSS, UIA, DCU)** — Lead: _TBD_  
4. **Human Factors & HITL** — Lead: _TBD_  
5. **Outreach & Industry Engagement** — Lead: _TBD_  
6. **Proposal/Docs & Admin** — Lead: _TBD_

Each lead maintains a backlog, weekly demo, and Definition of Done (DoD).

---

## C) Timeline (Sprints & Milestones)

### Phase 0 — Proposal (Now → Oct 30, 2025)
- Draft **Abstract**, **Design Description**, **CONOPS**, **AI**, **HITL**, **PM**, **References**.
- Draft **Engagement plans** and **Admin** (LOE, faculty statement, rights of use, budget, loan declaration, logos).
- Internal deadlines: **Oct 24 content freeze**, **Oct 28 red‑team**, **Oct 29 final compile**, **Oct 30 submit**.

### Phase 1 — Foundations (Nov → Dec 11, 2025)
- Hardware decision: HoloLens 2 vs rugged tablet; PR workstation spec.
- Repo + CI; code standards; telemetry client scaffolding; UI shells for EV and PR.
- Draft test sites and safety checklist for night testing.

### Phase 2 — Telemetry & AIA Alpha (Dec → Jan 2026)
- Integrate **TSS** (WebSocket) with EV and PR; mock feeds until TSS live.
- AIA v1: deterministic intents + speech I/O; concise readouts; procedure runner alpha.

### Phase 3 — Mapping & Autonomy Beta (Jan → Feb 2026)
- EV: 2D minimap, breadcrumbs, drop‑pins, predictive range ring.
- PR: search pattern tool, autonomy planner (A*/RRT*), hazard mask, resource models.
- Interop: POI sync + LTV beacon “warmer/colder.”

### Phase 4 — Integrated EVA Rehearsal (Mar 2026)
- Full mission flow: Egress → EV Nav → LTV Repair → Ingress.
- HITL Study #1 (indoor), #2 (outdoor night). Collect metrics; iterate UI & AIA.

### Phase 5 — SDR Package (Late Mar → Apr 2, 2026)
- First‑person UI video; code bundle; test summaries; updated trace matrix.

### Phase 6 — Hardening & Onsite Prep (Apr → May 2026)
- Performance profiling; failovers; spares & checklists; travel logistics.
- Final night rehearsal and PR autonomy demos.

---

## D) Work Breakdown Structure (WBS) — Highlights
- **EV UI:** HUD, Map, Procedure Runner, C&W.
- **PR UI:** Mission console, search editor, autonomy controls, C&W.
- **Autonomy:** Map grid, planners, obstacle detection, energy model.
- **AIA:** NLU grammar, verified data layer, playbooks, TTS/STT.
- **Integration:** TSS bridge, POI sync, logging.
- **HITL:** Protocols, IRB/ethics (if needed), metrics & analysis.
- **Docs:** Proposal, SDR video, white paper, ops manuals.
- **Outreach/Industry:** 4+ events planned & executed with artifacts.

---

## E) Definition of Done (DoD) — Examples
- **Breadcrumbs:** leaves node every 5 m or 10 s; backtrack tested on 2 km loop; recovery under connectivity loss.
- **C&W:** thresholds implemented; audible + visual; AIA provides procedure link in ≤1 s.
- **Search Pattern:** spiral & lawnmower patterns editable; auto‑adjusts with beacon; visualization on PR and EV.
- **Predictive Range:** live estimate shows go/no‑go ring; validated against power logs (≤10% error).

---

## F) HITL Test Plan (Condensed)
- **Schedule:** Alpha (late Jan), Beta (late Feb), Full rehearsal (mid‑Mar).
- **Protocol:** Within‑subject design; counterbalanced UI variants; scripted hazards; timed tasks.
- **Measures:** Time, errors, path efficiency, alert response latency, WER, NASA TLX.
- **Safety:** Site survey, lighting, med kit, radio comms, stop protocol, spotters.
- **Analysis:** Summary stats + effect sizes; change log; decisions tied to metrics.

---

## G) Outreach & Industry Plan (Targets)
- **Community (≥2):** 1) Hour of Code (100 HS students), 2) University demo night (50 attendees).
- **Industry (≥2):** 1) AR/Unreal mentorship session, 2) Autonomy safety review with partner lab/company.
- Keep letters/confirmations; social media plan; artefacts (slides, lesson plans).

---

## H) Budget (Draft)
Flights $4,500; Hotel $2,000; Ground $400; Operating $600; Software $500; Misc $500 → **Total ≈ $8,500**. Identify grants, Space Grant, sponsors; reserve 15% contingency.

---

## I) Admin Checklist
- LOE (Dean/Chair); Faculty Statement; Rights of Use (optional but boosts score); Budget; Hololens2 Loan declaration; Logo files (horizontal + stacked).

---

## J) Risk Register (Live)
| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| TSS late | M | M | Mock server; decouple client | Telemetry Lead |
| Device availability | M | H | Early request; tablet fallback | PM |
| Night visibility | M | H | High contrast theme; headlamp testing | HF Lead |
| Speech noise | M | M | Push‑to‑talk; noise model tuning | AIA Lead |

---

## K) Repo Structure (Suggested)
```
/docs (proposal, PRD, test plans, trace matrix)
/ev-app (AR/tablet client, AIA, procedures)
/pr-app (Unreal project, autonomy, UI)
/integration (TSS adapters, POI sync, logging)
/tests (HITL scripts, data, analysis notebooks)
```
