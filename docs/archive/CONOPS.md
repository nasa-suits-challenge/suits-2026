# CONOPS — FY26 EVA Scenario Thread

## Actors
- **EV (spacesuit)** using HUD/handheld + AIA voice.  
- **PR operator** (virtual rover UI).  
- **LTV** (malfunctioning rover with beacon/task board).  
- **TSS** (telemetry stream).

## Mission Thread (Happy Path)
1) **Initial Scene** — PR receives last‑known LTV pos & consumables. PR UI shows circular **search radius**; AIA proposes **industry‑standard** search pattern adapted to terrain.  
2) **PR Navigation/Search** — Autonomy plans best‑path; shows hazard map; computes **turn‑back** points vs. power. If LTV beacon sensed, pattern shrinks; **warmer/colder** guides final 50 m.  
3) **Egress (UIA)** — EV performs UIA/DCU steps. HUD shows a **state‑aware checklist**; AIA calls out switch states from TSS, waits for ranges/pressures, then advances.  
4) **EV Traverse** — Mini‑map displays PR, EV, LTV, dropped POIs; breadcrumbs record path. Best‑path module re‑calculates under lighting/hazard changes. C&W interrupts with actions.  
5) **LTV Repair** — AIA fetches **ERM** procedures → success → **Diagnosis** (sensor/bus) → **Nav system restart** → **Physical repair** (prioritized; can defer dust‑sensor if time‑low) → **Final checks**.  
6) **Ingress** — AIA recommends shortest **safe** route based on suit range; EV follows breadcrumbs to PR; UIA disconnect & verify steps; mission complete.

## Off‑Nominal Branches
- **C&W Event** on suit or rover: AIA interrupts, summarizes, proposes 1–3 actions (safe by default).  
- **TSS Drop**: UI indicates degraded mode, freezes last good values, uses local rules for alarms.  
- **Low Time**: AIA reprioritizes LTV tasks, auto‑defers non‑critical repairs, initiates return‑to‑PR.

## Human Factors
- Voice prompts use **values up front**, never chatty; each step is **confirmable** by voice or tap.  
- UI avoids clutter; uses **edge‑mounted** info for peripheral awareness; critical alerts central with persistent ack.

