# Mission & Requirements (Condensed)

## EVA Flow (high level)
1) PR Nav: Search for LTV using autonomous patterns; adapt with new signals.
2) Egress/UIA: Complete depress/EMU prep using UIA+DCU; verify states.
3) EV Nav: Hazard-aware nav under south-pole lighting; 2D mini-map (3D optional).
4) LTV Repair: Exit Recovery Mode, diagnosis, restart nav, physical fixes, final check.
5) Ingress: Breadcrumbs/best path back to PR; final UIA procedures.

## Pressurized Rover (PR) — Must/Should/May
- **Shall**: Control rover in DUST; 2D map with LTV radius & search pattern; show beacon; C&W alerts; autonomous path + obstacle avoidance; resource tracking + predictive analytics; timers.
- **Should/May**: Track crew, draw paths, POIs bi-directional with EV.

## Spacesuit UI — Must/Should/May
- **Shall**: Show EV suit & biometrics; 2D map with planned search; live asset locations; procedures; voice assistant; breadcrumbs; predictive max range; C&W + AI-recommended actions; drop pins.
- **May**: 3D map, POI nav aids, best path.

## Provided Systems
- **TSS**: WebSocket JSON/GeoJSON telemetry for PR, EV, LTV, UIA, DCU, LTV Task Board.
- **UIA/DCU**: Switch states over TSS; tactile operations mirrored in UI with procedures.
- **LTV**: Wake-on-range; beacon incl. warmer/colder feature; task board items.

## Safety & UX
- Passthrough AR for HMDs; concise voice responses for critical telemetry.
