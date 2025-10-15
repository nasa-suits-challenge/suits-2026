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
You are the on-suit AIA on a critical NASA space mission.

Rules (default):
1) Use ONLY tools listed in caps.tools_allowed for this turn.
2) Treat eva_mode as a finite-state controller; refuse intents not valid in this mode.
3) Any write/actuation requires ptt_held=true OR an explicit confirm intent.
4) Speak via say(template_id, slots) ONLY; no free-form prose.
5) Bind every spoken slot to values from the current context envelope OR tool results from this turn,
   OR a validated tool result cached within the last 10 seconds (must include its timestamp).
6) If you need a capability that is not allowed, set request_capability to the tool name and wait.
7) If data is missing or confidence is low, choose a refusal/clarify template (e.g., need_repeat, need_confirm).

Output format (strict JSON):
{
  "intent": "...",
  "tool_calls": [ { "name": "...", "args": { ... } }, ... ],
  "template": { "id": "...", "slots": { ... } },
  "request_capability": "optional_tool_name_if_needed"
}
```
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


## 🧠 GPT-OSS-20B — Local Suite Model Spec (Recommended Upgrade)

**Model:** `gpt-oss-20b`  
**License:** Apache 2.0 (fully open-source)  
**Size:** 20 billion parameters  
**Memory footprint:** ≈ 15 – 16 GB (fits a 16 GB device with quantization, e.g. Q4_K_M or Q5_K_M)  
**Runtime:** Compatible with `llama.cpp`, `vLLM`, `Ollama`, or OpenAI-compatible API endpoints  
**Context:** up to 32 K tokens  
**Latency (local CPU + GPU hybrid):** ~ 1 s for ≤ 10 tokens on a laptop-class GPU; < 700 ms on a desktop RTX 3060/4070  
**Languages:** English-tuned but strong multilingual generalization  
**Quantizations:** GGUF Q4_K_M (≈ 10 GB), Q5_K_M (≈ 13 GB), BF16 (≈ 32 GB full precision)

### 🔧 Native Capabilities
- ✅ **Tool use / Function calling:** OpenAI-style schema (`tools`, `tool_choice`, `tool_calls`)  
- ✅ **Web browsing & retrieval hooks:** designed for plug-in agent runtimes  
- ✅ **Structured JSON / grammar-constrained output**  
- ✅ **Strong short-context reasoning & low hallucination**  
- ✅ **Drop-in OpenAI API compatibility** for local deployments

### 🪶 Recommended EVA Configuration
| Component | Setting |
|------------|----------|
| **Runtime** | `llama.cpp-server` or `Ollama` with OpenAI-compat API |
| **Context** | 2 K – 4 K active (sliding) |
| **Temp / Top-P** | 0.2 – 0.4 / 0.9 |
| **Max new tokens** | ≤ 16 |
| **Function call interface** | native `tools` schema |
| **Speech out** | templates only (`say(template_id, slots)`) |
| **Safety** | phase-aware; `ptt_held` or confirm intent required for writes |

### 🛰️ Comparison

| Model | Params | Function Calling | License | Offline Perf (8 core + GPU) | Notes |
|-------|---------|------------------|----------|-------------------------------|-------|
| **GPT-OSS-20B** | 20B | ✅ Native (OpenAI schema) | Apache 2.0 | 400 – 900 ms | Best open function-caller w/ license freedom |
| **Llama 3.1 8B** | 8B | Via grammar/Ollama | Meta license | 300 – 700 ms | Lightweight, deterministic |
| **Qwen 2.5 14B** | 14B | Native (OpenAI schema) | Apache 2.0 | 500 – 1000 ms | Excellent tool agent; more RAM |
| **Gemma 3 12B** | 12B | Partial (prompt based) | Apache 2.0 | 600 – 1100 ms | Great context window; less tool-tuned |


