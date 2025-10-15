# Athena Voice AIA — Implementation Plan

---

## 1) System Diagram
```
Mic → VAD → Wake → ASR → Intent Router (FSM + Local LLM) → TTS → Speaker/HUD
                          │
                          ├── Telemetry (TSS via WebSocket JSON/GeoJSON)
                          │
               HAL (openai/gpt-oss-120B via vLLM/TGI)  ↔  Earth (high RTT)
```
- **On‑Suit Core** handles all EVA‑critical functions locally.  
- **HAL** provides optional heavy reasoning; returns **short, templated directives**.  
- **Earth** performs long‑horizon analytics; never on the critical path.

---

## 2) Runtime Components
| Component | Responsibility |
|---|---|
| Context Manager | Builds **context envelope** each turn from TSS + local state |
| Intent Router | Finite‑state per EVA mode; maps ASR → tool plan |
| Tool Executor | Validates schema + phase; executes tools with timeouts |
| Evidence Binder | Ensures `say()` slots are backed by tool/context values |
| Speech Loop | Piper TTS; HUD sync and alert priorities |
| Link Monitor | Tracks Green/Yellow/Red QoS; gates HAL tools |

---

## 3) Local LLM Prompt (Rules)
```
You are the on-suit AIA. Use ONLY tools in caps.tools_allowed.
Treat eva_mode as a finite-state controller; refuse out-of-phase intents.
Any write requires ptt_held=true OR explicit confirm intent.
Speak via say(template_id, slots) ONLY; no free-form prose.
Bind every spoken slot to tool outputs or context from this turn.
If capability needed but absent, set request_capability and wait.
Return JSON: { "intent":"...", "tool_calls":[...], "template":{"id":"...","slots":{...}} }.
```
Provide 2–3 few‑shot examples per phase (valid, refusal, write‑gated).

---

## 4) Tool API (core subset)
All tools are JSON‑schema‑validated and **phase‑whitelisted**.

- `get_telemetry(fields: string[]) → {timestamp, data:{...}}` *(read)*  
- `get_checklist_step(procedure_id, step_index) → {step:{index,text,requires_confirm}}` *(read)*  
- `advance_step(procedure_id, from_index) → {ok,to_index}` *(write, requires PTT/confirm)*  
- `repeat_step(procedure_id, index) → {ok}` *(read)*  
- `set_breadcrumb(label) → {ok, marker_id}` *(write, requires PTT/confirm)*  
- `get_bearing_to(marker_id) → {bearing_deg, distance_m}` *(read)*  
- `list_markers() → {markers:[...]}` *(read)*  
- `say(template_id, slots) → {ok}` *(deterministic TTS wrapper)*

**HAL tools** (granted on request, link=GREEN):  
- `plan_route(from,to,constraints) → {waypoints:[...]}` *(read)*  
- `summarize_recent(window_min) → {bullets:[...]}` *(read)*  
- `rerank_asr(candidates[],context) → {text}` *(read)*

---

## 5) Templates
Examples (see `docs/templates.json` for full set):
- `status_o2`: `"Primary O₂ {o2_primary_pct}% — Secondary {o2_secondary_pct}%."`
- `bearing_simple`: `"Bearing {bearing_deg} degrees, {distance_m} meters."`
- `step_read`: `"Step {index}: {text}."`
- `step_advanced`: `"Step {from_index} complete. Proceed to step {to_index}."`
- `marker_set`: `"Marker {label} set."`

**Validator:** Each slot must come from the immediate turn's tool result or context.

---

## 6) Models & Config
- **VAD:** Silero/WebRTC VAD (<1 ms per 10 ms frame)  
- **Wake:** Porcupine / OpenWakeWord (phrase: “Athena …”)  
- **ASR:** Faster‑Whisper base‑en (int8), 16 kHz mono; partials every 100–200 ms  
- **Local LLM:** Llama‑3.1‑8B Q4_K_M (ctx 1024–2048, `n_predict ≤ 16`, `temp 0.2–0.4`, `top_p 0.9`, `repeat_penalty 1.1`)  
- **TTS:** Piper; pre‑bake frequent prompts as audio for instant playback  
- **HAL LLM:** openai/gpt‑oss‑120B on DGX Spark; vLLM/TGI; short templated outputs

**CPU pinning:** Reserve 2 cores for ASR/TTS/UI; pin LLM to remaining cores.  
**KV cache discipline:** limit context to avoid RAM creep; sliding window for local LLM.

---

## 7) Latency Budget
| Stage | Target |
|---|---|
| VAD + Wake | <100 ms |
| ASR partial | 100–200 ms |
| FSM Intent | <5 ms |
| TTS (short line) | 60–120 ms |
| Local LLM (8B Q4, 10 tok) | 400–800 ms |
| HAL offload round‑trip | 800–1500 ms (LAN) |
| Earth round‑trip | 2600+ ms (informational only) |

**Default path:** FSM/no‑LLM stays **≤ 250–450 ms** end‑to‑end.

---

## 8) Safety & Guardrails
- Phase‑bounded whitelists; out‑of‑phase → refusal template.  
- **PTT/confirm** required for any write/step advance.  
- Tool timeouts (400–500 ms); on timeout → safe refusal.  
- Full audit log: `{intent, tool, args, result_hash, template_id}`.  
- Cryptographic channel to HAL (mTLS on HTTP/3/QUIC).

---

## 9) Testing Matrix (HITL)
| Test | Metric | Pass Criteria |
|---|---|---|
| Latency | Mic→Speech | ≤0.5 s (deterministic) |
| Accuracy | WER / Intent F1 | <10 % / >95 % |
| Robustness | False‑wake / mis‑intent | <1 % / <5 % |
| Network | Green/Yellow/Red continuity | 0 critical losses |
| Usability | PTT with gloves | 100 % actuation gated |
| Evidence | Slot validation | 100 % bound to tools |

Night/noise trials and link flapping (Green→Red→Green) are included; recovery must be seamless.

---

## 10) Deployment Plan
1. **Dev (Fall 2025):** Local loop + FSM + TSS simulator; latency/WER baselines.  
2. **Integration (Spring 2026):** HAL RPCs; capability‑on‑request; full HITL battery.  
3. **Field (May 2026):** Connect to SUITSNET; night Rock Yard test; metrics capture.

---

## 11) File Map
```
docs/PRD.md
docs/IMPLEMENTATION.md
docs/tools.json
docs/templates.json
runtime/planner_test.py
```
