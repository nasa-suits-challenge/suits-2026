# NASA SUITS FY26 — Glossary (Plain English)

> A quick decoder for all the space acronyms and labels used in the FY26 SUITS mission docs.

## Core assets & roles

- **SUITS** — *Spacesuit User Interface Technologies for Students*, NASA’s student challenge you’re in.  
- **EHP** — *Extravehicular Activity and Human Surface Mobility Program*, SUITS’ NASA program partner.  
- **PR** — *Pressurized Rover*, the crewed rover you control (your team’s primary UI/autonomy target).  
- **LTV** — *Lunar Terrain Vehicle*, a small uncrewed rover that “went missing”; you must locate and repair it.  
- **EV** — *Extravehicular crewmember*, the astronaut who exits the rover in a spacesuit.  
- **EVA** — *Extravehicular Activity*, the moonwalk/repair outside the rover.  
- **AIA** — *Artificial Intelligence Assistant*, the onboard AI/voice helper that gives concise, numeric status and guidance.  

## Operations & procedures

- **Egress** — Exiting the PR to begin the EVA.  
- **Ingress** — Returning into the PR to finish the EVA.  
- **ERM** — *Exit Recovery Mode*, the first step when reviving the malfunctioning LTV.  
- **UIA** — *Umbilical Interface Assembly*, panel at the PR hatch used during egress/ingress to connect suit to rover (power, O₂, etc.).  
- **DCU** — *Display and Control Unit*, the suit’s switch box (Battery, O₂, Comms, Fan, Pump, CO₂) whose states stream via telemetry.  

### DCU switch labels

- **BATT – LOCAL/UMB** — Battery source (Local suit battery vs. Umbilical from rover).  
- **OXY – PRI/SEC** — Primary/Secondary oxygen source.  
- **COMMS – A/B** — Comms channel select.  
- **FAN – PRI/SEC** — Fan select.  
- **PUMP – OPEN/CLOSE** — Cooling loop pump valve.  
- **CO₂ – A/B** — CO₂ scrubbing channel.  

## Environment, mapping & navigation

- **DUST** — *Digital Lunar Exploration Sites Unreal Simulation Tool*, the Unreal-based lunar sim your PR runs in.  
- **Rock Yard** — JSC’s outdoor test area (boulders to ~1 m, craters to ~2 m deep/20 m dia.), tested at night (low-light).  
- **2D Map (required)** — Live map with LTV search radius, adaptive search pattern, POIs, Caution & Warning, timers. 3D map is optional.  
- **POI** — *Point of Interest* (“pins”) you can add/label/share between PR and EV.  
- **Breadcrumbs** — Path trace to help the EV/PR retrace a safe route back.  
- **Best Path / Hazard Avoidance** — Autonomous path planning (e.g., A*) and obstacle detection/avoidance.  
- **“Wake-up call”** — PR broadcast that wakes the LTV when in range; shrinks search to < 500 m; “warmer/colder” within ~50 m.  

## Data & networking

- **TSS** — *Telemetry Stream Server*, NASA’s real-time data server you connect to (PR, EV/suit, UIA, DCU, LTV@500 m, LTV@50 m, Task Board).  
- **SUITSNET** — The on-site local network hosting the TSS during Test Week (you’ll switch your client IP to it).  
- **WebSocket (ws)** — Protocol used by TSS to stream data.  
- **JSON / GeoJSON** — Message formats used by the TSS data streams (positions, shapes, telemetry).  
- **MET** — *Mission Elapsed Time*, a required timer shown in HH:MM:SS.  
- **C&W** — *Caution and Warning* system; alerts when telemetry goes off-nominal and should trigger AIA guidance.  

## Devices & UI constraints

- **HMD** — *Head-Mounted Display*; if used for the suit, it must be *passthrough AR* (see-through for safe walking).  
- **AR** — *Augmented Reality*; visual overlays on real world (required mode for HMD use).  
- **LTV Task Board** — Physical panel on the LTV with tasks you’ll diagnose/repair; telemetry also streams to TSS.  

## Proposal & reviews (admin)

- **LOI** — *Letter of Intent* (due Oct 2, 2025) stating you plan to submit.  
- **SDR** — *Software Design Review* (virtual review on Apr 2, 2026).  
- **CONOPS** — *Concept of Operations*, the “how it works” walkthrough from the astronaut’s point of view.  
- **HITL** — *Human-in-the-Loop* testing; your user testing plan, metrics, safety, schedule, etc.  
- **Hololens 2 Loan Program** — Optional device loan (limited supply) sign-off via your institution.  

---

**Sources:** FY26 Mission Description, FY26 Proposal Guidelines, FY26 FAQs.
