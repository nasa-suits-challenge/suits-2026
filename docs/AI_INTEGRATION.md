# AI Integration Plan

## Objectives
- **Force multiplier**: reduce EV cognitive load; speed decisions; avoid hazards.  
- **Determinism for criticals**: critical alarms/limits handled by **local rule engine**; LLM assists but does not gate safety.

## Architecture
- **On‑device**: streaming ASR (voice), local rule engine for C&W, nav heuristics.  
- **On‑LAN**: lightweight LLM for language + tool routing; computer‑vision for switch/label assist (optional).  
- **Guardrails**: safety intents route to deterministic tools; AIA phrases are templated for numeric clarity.

## Capabilities
- **Summarize telemetry** (“Primary O2 47%, Secondary 99%.”).  
- **Plan + Re‑plan** routes (consumables + terrain + hazards).  
- **Procedure tutor**: step gating based on TSS; waits for thresholds; confirms next actions.  
- **What‑if**: POI trade‑offs (ETA, power, suit range).

## Hallucination Mitigation
- **Closed‑loop tools**: AIA must call `get_telemetry()`, `check_limit()`, `compute_path()` and include returned values in replies.  
- **Template responses** for critical readouts; **citation overlays** showing data origin (TSS).  
- **Refusal policy**: AIA states “Unknown” if data missing; escalates to deterministic rules.  
- **Offline mode**: fallback to minimal voice pack; alarms still work via rules.

## Evaluation
- **Truthfulness**: % responses matching ground‑truth TSS.  
- **Clarity**: listener comprehension time.  
- **Safety**: zero unsafe recommendations in fault‑injection suite.
