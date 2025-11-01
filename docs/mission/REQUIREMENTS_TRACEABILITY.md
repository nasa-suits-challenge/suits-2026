# Requirements Traceability Matrix (RTM)

| Req ID | Source Text (abridged) | Design Feature(s) | Verification/Test |
|---|---|---|---|
| PR‑1 | Control rover in DUST | PR Autonomy module + teleop override | Dry‑run in DUST; demo path plan |
| PR‑MAP‑A | 2D map tracking surface assets | Shared map engine; EV/PR overlays | Map refresh @10 Hz; asset IDs from TSS |
| PR‑C&W | Caution & Warning w/ AI recs | Prioritized alerts + “Explain/Fix” | Inject off‑nominal TSS; measure response |
| PR‑RES | Resource analytics, turn‑back pts | Power/consumable model | Unit tests + scenario sims |
| EV‑TEL | EV suit & biomedical display | HUD telemetry bands | Visual inspect + latency check |
| EV‑MAP | 2D map; route to LTV | Mini‑map + best path | Waypoint tests in yard mock |
| EV‑BREAD | Breadcrumb backtrack | Breadcrumb trail store | E2E nav out/back |
| EV‑RANGE | Predictive max range | Range hull computation | Calibration vs. script |
| EV‑POI | Drop pins | Voice/tap pin add; shared | PR–EV sync latency |
| EV‑C&W | Caution & Warning + AI actions | Same framework as PR | Fault injection drills |
| UIA‑PROC | Egress procedures assistant | State‑aware stepper | TSS boolean playback |
| PERIPH‑SAFE | Edges/no pinch/labels | Industrial design checks | Peer review + checklist |
