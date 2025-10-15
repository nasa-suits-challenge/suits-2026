# Artificial Intelligence Assistant (AIA) – Pressurized Rover Challenge

## Overview
The Artificial Intelligence Assistant (AIA) acts as a **decision-support system** for the Pressurized Rover (PR) crew.  
Its primary function is to **reduce operator cognitive load** during autonomous navigation, search, and coordination tasks.  
The AIA monitors telemetry, predicts consumable limits, and provides concise voice or visual updates that allow the crew to focus on higher-level decision making.

---

## Core Objectives
1. **Crew Efficiency:** Present only the most relevant telemetry and status updates.  
2. **Safety:** Detect off-nominal data and recommend safe corrective actions.  
3. **Interoperability:** Maintain a shared map state with the EVA system for POIs, caution zones, and LTV tracking.  
4. **Autonomy:** Support search pattern adaptation using telemetry and LTV beacon signals.  
5. **Transparency:** Operate within explainable, rule-based limits to maintain user trust and avoid hallucination.

---

## Functional Breakdown

| Module | Description | Implementation Stage |
|--------|--------------|----------------------|
| **1. Telemetry Parser** | Reads JSON/GeoJSON data from the Telemetry Stream Server (TSS) including rover position, heading, power, and LTV beacon signal. | WebSocket client → local state store |
| **2. Reasoning Engine** | Applies threshold rules (e.g., battery < 20% = return to base) and simple route logic (e.g., A* path planner). | Rule table + algorithmic planner |
| **3. Language Layer** | Converts data summaries into natural language phrases. | Template-based string responses |
| **4. Interaction Layer** | Displays output on the PR HUD and responds to crew queries through speech or text input. | Text + optional TTS |

---

## Hallucination and Safety Controls
NASA specifies that AI must include **guardrails for mission-critical operations**:contentReference[oaicite:0]{index=0}.  
Our AIA adheres to the following:

- **Read-only Telemetry Access:** No generated values; all sensor data comes directly from TSS.  
- **Schema-bound Prompts:** Natural-language responses must reference verified telemetry keys.  
- **Phase Context Lock:** Search, Navigation, and Return phases each have restricted command sets.  
- **Cross-Verification:** Each AIA recommendation is compared to numerical safety thresholds before output.

---

## Cognitive Load Reduction
Instead of manual status polling, the AIA:
- Announces only **salient changes** (e.g., “Power at 25%, recommend return trajectory.”)  
- Filters telemetry noise and ranks warnings by severity.  
- Automates route replanning using terrain data, reducing constant operator supervision.

This creates an *assistive autonomy loop*: **monitor → interpret → summarize → recommend.**

---

## Development Plan
**Phase 1:** Prototype text-based telemetry → AIA response loop using mock TSS data.  
**Phase 2:** Integrate map overlay updates for LTV beacon detection and search visualization.  
**Phase 3:** Add TTS for situational briefings (“LTV detected at 42° east, 310m ahead”).  
**Phase 4:** Conduct Human-in-the-Loop (HITL) testing in simulated low-light conditions.

---

## Deliverables
- Modular Python (or TypeScript) AIA module with WebSocket telemetry client.  
- Voice output interface with safety-rated templates.  
- Logged event history for cognitive-load analysis (HITL metrics).  
- Visualization overlay for caution/warning and resource prediction.

---

## Summary
This AIA design emphasizes **clarity, safety, and modularity** over complexity.  
It supports the NASA SUITS goal of enhancing astronaut autonomy while ensuring predictable, transparent behavior.  
By focusing on rule-driven reasoning and simple language generation, it delivers the benefits of AI without overwhelming the user—or the developers.

