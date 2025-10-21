# UIA Procedures — Egress Assistant (Design)

## Design Pattern
- **State‑aware stepper** bound to TSS booleans; values‑first voice; glove‑friendly confirmations.  
- **Wait states** show live gauges (psi/pressure) with simple “GO/WAIT” banners.

## Example Flow (abridged)
- Connect UIA↔DCU; **EV1 EMU PWR ON**; **BATT UMB**; **DEPRESS PUMP PWR ON**.  
- Prep O2: **O2 VENT OPEN** → wait until both tanks < 10 psi → **VENT CLOSE** → set **OXY PRI** → **EMU‑1 OPEN** → wait until primary > 3000 psi → **EMU‑1 CLOSE** → set **OXY SEC** → **EMU‑1 OPEN** → wait until secondary > 3000 psi → **EMU‑1 CLOSE** → verify **OXY PRI**.  
- End Depress: wait until suit & O2 pressure = 4 → **DEPRESS PUMP OFF** → **BATT LOCAL** → **EMU PWR OFF** → verify comms/fan/pump/CO2 switches → disconnect umbilicals.

## HUD Elements
- **Big Number** readouts for O2/pressure.  
- **Checklist** with live ticks; **Explain** button opens rationale/limits.  
- **Voice**: “Primary O2 47%, Secondary 99%. Step 7 complete.”
