# Requirements Trace (NASA SUITS FY26)

This living table shows how **TUXEDO** covers “shall” items. Keep it updated as features land.

| Requirement | Source | Where implemented | Notes |
|---|---|---|---|
| PR UI shows live 2D map, LTV search radius/pattern | Mission Description §2, §4a.5 | apps/pr-ui + services/orchestrator-api | Adaptive pattern |
| EV UI shows 2D map + breadcrumbs + drop pins | Mission Description §4b.2, §4b.4, §4b.5 | ev-hmd + pr-ui | Breadcrumb store in Orchestrator |
| TSS telemetry: UIA/DCU, EV biomed, rover | MD §3a | libs/tss-client-* | UDP & WS adapters |
| Caution/Warning system | §4a.5e, §4b.6 | orchestrator + UI | Thresholds + voice cues |
| AIA concise voice replies | §2c | packages/athena | Tools-first JSON |
| Mission timers (HH:MM:SS) | §4a.5f | orchestrator | Synced with TSS |
| Autonomous path planning + hazards | §4a.6 | services/path (future) | A* + costs |
| Predictive resource utilization | §4a.7 | packages/athena (future) | Deterministic fallback |
