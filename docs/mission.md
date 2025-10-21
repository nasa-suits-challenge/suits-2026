# NASA SUITS FY26 — Mission Overview

> Summary of the 2025–2026 NASA SUITS (Spacesuit User Interface Technologies for Students) mission scenario, objectives, and requirements.

---

## 🌕 1. Scenario Summary

A lunar exploration mission simulation will take place at NASA’s **Johnson Space Center Rock Yard** using the **Digital Lunar Exploration Sites Unreal Simulation Tool (DUST)**.  
The rock yard contains rough terrain—granite dust, boulders up to 1 m, and craters up to 2 m deep and 20 m wide—tested at night to mimic the lighting of the lunar south pole.

### The Story
A **Lunar Terrain Vehicle (LTV)** has gone silent. Its last known location and consumable levels are known, but communication has failed.  
Teams must deploy a **Pressurized Rover (PR)** and an **EVA astronaut (EV)** to locate, repair, and recover the LTV while conserving life support and power.

---

## 🚀 2. Mission Phases

### 2.1 Initial Scene
- The LTV stops transmitting data due to a software fault and goes into low‑power sleep mode.  
- The PR team starts at a base location and receives the LTV’s last coordinates and resource status.  
- Objective: Plan and execute a **search pattern** to find the LTV safely and efficiently.

### 2.2 Pressurized Rover Navigation
- The PR uses **autonomous navigation** and a **live 2D map** to explore the terrain.  
- The rover must:  
  - Generate an **initial search radius** based on the LTV’s consumables.  
  - Perform a **systematic search pattern** that adapts as new data arrives.  
  - Use **LIDAR** and **AI vision** to detect hazards and adjust the path.  
  - Plan optimal routes using algorithms like **A\*** or **D\*** Lite.  
  - Estimate energy and consumable use to ensure safe return.  
- When within 500 m, the PR transmits a **“wake‑up call”**. The LTV responds and narrows the search to within 50 m (“warmer/colder”).

### 2.3 Egress (Crew Exit)
- The astronaut (EV) performs **egress** through the **Umbilical Interface Assembly (UIA)** to disconnect from the rover safely.  
- The **Display and Control Unit (DCU)** on the suit manages oxygen, power, and comms channels.  
- EV prepares the suit’s life support systems according to checklists streamed via telemetry.

### 2.4 EVA Navigation
- The EV traverses the terrain to reach the LTV using navigation aids provided by the **spacesuit UI**.  
- Requirements:  
  - Real‑time hazard detection (rocks, slopes, lighting).  
  - 2D map with breadcrumbs for retracing path.  
  - Optional 3D map and waypoints.  
  - Caution and Warning system for off‑nominal telemetry.

### 2.5 LTV Repair Tasks
- **Exit Recovery Mode (ERM):** Retrieve procedures from AIA and execute to wake the rover.  
- **System Diagnosis:** AIA analyzes telemetry and visual input to locate faults.  
- **System Restart:** AIA guides the EV through a physical reset of LTV navigation systems.  
- **Physical Repairs:** Examples include reconnecting bus connectors or replacing sensors.  
- **Final Checks:** Verify recovery and stability.

### 2.6 Ingress (Crew Re‑entry)
- The EV follows breadcrumbs back to the PR.  
- Conducts **final UIA procedures** to reconnect and repressurize the rover.

---

## ⚙️ 3. Key Systems and Equipment

| System | Description |
|--------|--------------|
| **TSS – Telemetry Stream Server** | Simulated NASA data stream providing live telemetry for PR, EV, LTV, UIA, and DCU. Communicates via WebSocket + JSON/GeoJSON. |
| **UIA – Umbilical Interface Assembly** | The airlock connection between PR and spacesuit; power and oxygen handoff during egress/ingress. |
| **DCU – Display and Control Unit** | Physical control panel on the spacesuit for O₂, comms, pump, fan, battery, and CO₂ scrubbing. |
| **AIA – Artificial Intelligence Assistant** | The mission’s AI voice assistant providing concise readouts, warnings, and task guidance. |
| **DUST Environment** | Unreal Engine–based virtual lunar surface used for PR simulation. |

---

## 🧭 4. PR Requirements (Summary)

1. **Control:** PR must be operable in DUST environment.  
2. **Map:** Live 2D map (required) + optional 3D map with POIs, caution/warning, timers.  
3. **Autonomy:** Best pathfinding, hazard avoidance, live telemetry integration.  
4. **Resource Tracking:** Monitor life support and power, predict return limits.  
5. **AI Integration:** Use AIA to summarize status (“Power 68%, range 340 m safe”).  
6. **Offline Mode:** Continue navigation and mapping when comms are down.  

---

## 🧑‍🚀 5. Spacesuit Requirements (Summary)

1. Display EV telemetry (suit, biomedical).  
2. Show planned and live routes with breadcrumbs.  
3. Voice‑guided checklists and procedures.  
4. Caution and Warning alerts with AI recommendations.  
5. Drop pins/POIs on shared map.  

---

## 🔗 6. Evaluation Focus

NASA evaluates on:
- Clarity and usability of **UI design** (maps, alerts, procedures).  
- Functionality of **autonomy** and **AI support**.  
- Safety and realism in **offline operation** and **resource tracking**.  
- Integration between **spacesuit and rover systems**.  
- Use of **AI to reduce crew cognitive load**.  

---

**Sources:** FY26 SUITS Mission Description, Proposal Guidelines, and FAQs.
