# Vision and Method

## 🌌 Vision
TUXEDO (Tactical User-interfaces for eXtravehicular Exploration and Dynamic Optimization) envisions a future where astronauts operate in harmony with intelligent systems that **amplify human judgment rather than replace it**.  
Our mission is to design **calm, adaptive, and resilient interfaces** for lunar exploration — tools that reduce cognitive load, enhance autonomy, and preserve safety during the most demanding extravehicular activities (EVAs).

The core challenge is not just displaying information — it’s transforming complexity into clarity under lunar night conditions.

---

## 🧭 Mission Alignment
The TUXEDO project directly supports the objectives of the **NASA SUITS FY26 Mission Description**, focusing on:
- **Crew Autonomy** — enabling astronauts to make faster, safer decisions with less ground control dependency.  
- **Human-AI Teaming** — integrating a reliable Artificial Intelligence Assistant (AIA) to provide concise, contextual support.  
- **Interoperability** — seamless data exchange between **Pressurized Rover (PR)** and **Spacesuit (EV)** systems via the **Telemetry Stream Server (TSS)**.  
- **Safety Assurance** — maintaining clear guardrails that prevent AI miscommunication (“hallucination”) and ensure deterministic control in critical tasks.

---

## 🧠 Design Philosophy
Our design principles are guided by three pillars:

1. **Cognitive Economy** —  
   Every visual and auditory cue must earn its place. Interfaces emphasize _signal over noise_ through minimal UI design, adaptive opacity, and voice brevity.

2. **Graceful Degradation** —  
   Systems fail elegantly. If a module drops (e.g., LIDAR, nav overlay, or AIA voice), users retain essential telemetry and manual override pathways.

3. **Trust through Transparency** —  
   The AIA communicates certainty levels. Ambiguous data triggers “confirmation mode,” ensuring astronauts never act on unverified AI assumptions.

---

## ⚙️ Technical Methodology

### 1. Architecture
TUXEDO uses a modular architecture with four interconnected components:
| Component | Function | Notes |
|------------|-----------|-------|
| **AIA Service** | Voice assistant for telemetry, procedures, and decision support | Guardrails + closed-loop confirmation |
| **EV UI** | AR or tablet interface for EVA navigation and status | 2D/3D mini-map, breadcrumbs, hazard overlays |
| **PR UI** | Rover dashboard for DUST simulation | Path planning, search pattern logic, consumables tracker |
| **TSS Client** | WebSocket JSON/GeoJSON handler | Syncs telemetry between NASA’s simulation and UIs |

Each subsystem can function independently but syncs through standardized telemetry schemas to maintain fault tolerance.

---

### 2. AI Guardrails
- **Response Policy:** concise numerical readouts (“Primary O₂ 47%”) for situational data.  
- **Critical Actions:** require dual confirmation (voice + visual acknowledgment).  
- **Safety Layer:** predefined limits for O₂, CO₂, battery, pump, fan, and comms telemetry trigger deterministic alert states.  
- **Hallucination Mitigation:** AIA uses mission-state constraints and fallback to last-confirmed telemetry when uncertainty exceeds threshold.

---

### 3. Human-in-the-Loop Validation
The AIA and UI systems will be validated through **iterative HITL testing**:
- **Phase 1:** Desktop + simulated TSS trials.  
- **Phase 2:** Nighttime outdoor navigation (mock EVA).  
- **Phase 3:** Full mission rehearsal (Egress → LTV Repair → Ingress).  

Metrics: time-to-task completion, voice recognition accuracy, hazard response time, and subjective workload (NASA-TLX).

---

### 4. Evaluation Criteria Mapping
| NASA SUITS Criterion | TUXEDO Response |
|-----------------------|----------------|
| **AI Integration** | Context-aware LLM agent w/ deterministic constraints |
| **CONOPS Clarity** | Astronaut-centric flow (PR → EV → LTV → return) |
| **Feasibility** | Built atop Unreal DUST + modular web/AR stack |
| **HITL Testing** | Progressive tests from lab to field |
| **Engagement** | ≥4 events (2 community + 2 industry), mentorship + outreach |

---

## 🌍 Human Story
The name **TUXEDO** embodies balance — **precision and adaptability**.  
Just as a tuxedo merges form and function, our system blends elegance with utility, giving astronauts a calm interface in an environment that demands perfection.

> “Good design is invisible under pressure.” — TUXEDO Team

---

## 🧩 Next Steps
- Finalize UI/UX flow diagrams and voice intent maps.  
- Begin TSS integration tests (Jan 2026).  
- Conduct low-light HITL rehearsals by March 2026.  
- Prepare SDR materials by April 2, 2026.

---

**TUXEDO — Tactical User-interfaces for eXtravehicular Exploration and Dynamic Optimization**  
_Developed for NASA SUITS FY25–26 by the TUXEDO Team_
