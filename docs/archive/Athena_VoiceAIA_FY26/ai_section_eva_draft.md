# Artificial Intelligence Assistant (AIA) – EVA (Spacesuit Challenge)

## Purpose
The EVA AIA serves as an **on-suit guide and safety companion**, supporting egress, navigation, repair, and ingress tasks.  
Its main goal is to *reduce cognitive load* on the astronaut (EV1) by providing clear, actionable voice cues drawn from telemetry and procedures.

---

## Design Philosophy
NASA directs that AI should “act as a force multiplier… increasing efficiency and lowering cognitive load”:contentReference[oaicite:1]{index=1}.  
Therefore, this AIA is intentionally minimal, designed around **procedure recognition** and **voice feedback**, not general conversation.

---

## Functional Flow
1. **Telemetry Input:** Suit sensors + UIA/DCU switch states via TSS.  
2. **Context Recognition:** Determine EVA phase (Egress, Traverse, Repair, Ingress).  
3. **Procedure Retrieval:** Match current phase to relevant checklist (Appendix A).  
4. **Voice Guidance:** Output concise step-by-step instructions (“Depress pump power — on”).  
5. **Verification:** Confirm state matches telemetry before advancing to next step.  
6. **Caution and Warning:** Trigger voice or visual alerts for off-nominal suit data.

---

## Safety and Hallucination Mitigation
- **No generative content:** All responses derived from pre-verified mission data or checklists.  
- **Phase lock:** EVA phase dictates which procedures are valid.  
- **Verification layer:** Each step checked against telemetry Boolean flags before vocal confirmation.  
- **Fallback mode:** If AIA uncertain, displays “Confirm with Mission Control” rather than guessing.

---

## Cognitive-Load Benefits
- Eliminates need for manual cross-checking UIA/DCU switches.  
- Provides immediate confirmation and safety alerts.  
- Allows hands-free interaction via voice recognition.  
- Summarizes suit telemetry (“Primary O₂ 47%, Secondary 99%”) to save visual scanning time.

---

## Implementation Outline
| Phase | Goal | Tooling |
|--------|------|---------|
| **1** | Parse TSS telemetry and switch states | WebSocket client |
| **2** | Build procedure engine with JSON checklists | Local rule handler |
| **3** | Add natural-language templating + TTS | Voice SDK |
| **4** | Integrate with AR display (HoloLens 2) | MRTK/Unity overlay |

---

## Testing Plan
Human-in-the-Loop simulations in low-light Rock Yard conditions.  
Metrics include:
- Task completion time  
- Error rate during UIA steps  
- NASA-TLX cognitive-load scores  

---

## Summary
The EVA AIA prioritizes *clarity, trust, and verifiable correctness* over complexity.  
It functions as a reliable teammate — guiding, verifying, and protecting the astronaut — while staying within strict safety and data-driven boundaries.
