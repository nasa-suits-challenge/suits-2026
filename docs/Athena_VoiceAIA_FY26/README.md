# 🚀 Athena Voice AIA — FY26 NASA SUITS Proposal

> **Author:** Matthew Topham  
> **Revision:** v3.0 — Context-Aware, Function-Calling Edition  
> **Documents:** [`PRD.md`](./PRD.md) · [`IMPLEMENTATION.md`](./IMPLEMENTATION.md) · [`tools.json`](./tools.json) · [`templates.json`](./templates.json)

---

## 🧠 Overview
**Athena** is a **context-aware voice AI assistant** designed for NASA’s 2026 **Spacesuit User Interface Technologies for Students (SUITS)** challenge.  
It delivers low-latency, deterministic voice guidance for astronauts through a **three-tier autonomy hierarchy**:

| Tier | Location | Function |
|------|-----------|-----------|
| **1️⃣ Earth Megacompute** | NASA mission control | Long-range planning, model updates |
| **2️⃣ HAL Moonbase** | DGX Spark (openai/gpt-oss-120B) | High-performance reasoning, route planning |
| **3️⃣ On-Suit Core** | Rugged laptop + pass-through AR HMD (openai/gpt-oss-20B) | Real-time STT→Intent→TTS loop, telemetry fusion, procedural assistance |

All EVA-critical functions run **locally on the suit**, with HAL and Earth tiers providing optional enhancements when network conditions allow.

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

---

## ⚙️ Core Features
- **Finite-state EVA controller:**  
  Mode-aware behavior across Egress → EV-Nav → LTV Repair → Ingress phases.
- **Function-calling LLM:**  
  Athena calls only verified JSON tools defined in [`tools.json`](./tools.json) to eliminate hallucinations.
- **Template-only speech:**  
  Spoken outputs use deterministic templates from [`templates.json`](./templates.json).
- **Three-tier autonomy:**  
  HAL augments reasoning; suit remains autonomous under comms loss.
- **Green/Yellow/Red link modes:**  
  Ensures graceful degradation and predictable latency.
- **Offline ASR/TTS pipeline:**  
  Faster-Whisper (int8) + Piper (offline VITS) enable < 0.5 s round-trip response.

---

## 🧩 System Architecture
```
Mic → VAD → Wake → ASR → Intent Router (FSM + Local LLM) → TTS → Speaker/HUD
                          │
                          ├── Telemetry (TSS via WebSocket JSON/GeoJSON)
                          │
               HAL (gpt-oss-120B on DGX Spark) ↔ Earth (Mission Control)
```

---

## 📡 Context Envelope
Every conversational turn includes full EVA state context:
```json
{
  "eva_mode": "EVNAV",
  "procedure": {"id":"LTV-REP-01","step_index":4},
  "telemetry": {"o2_primary_pct":47,"o2_secondary_pct":99},
  "nav": {"distance_m":85,"bearing_deg":110},
  "comms": {"hal_link":"GREEN","earth_link":"DOWN"},
  "caps": {"tools_allowed":["get_telemetry","get_checklist_step","repeat_step","get_bearing_to","say"]}
}
```
The LLM is **context-aware and tool-bound**; it cannot generate free-form text or invoke disallowed tools.

---

## 🧰 Primary Tools (`tools.json`)
Example subset:  
- `get_telemetry(fields[])` → suit vitals & environment data  
- `advance_step(procedure_id, from_index)` → proceed in checklist *(PTT/confirm required)*  
- `get_bearing_to(marker_id)` → direction & distance to breadcrumb  
- `plan_route(from, to, constraints)` → optional HAL-granted planner

Each tool includes schema, phase whitelist, and safety requirements.

---

## 🗣️ Templates (`templates.json`)
Example spoken outputs:
- `status_o2`: “Primary O₂ { o2_primary_pct }% — Secondary { o2_secondary_pct }%.”  
- `bearing_simple`: “Bearing { bearing_deg } degrees, { distance_m } meters.”  
- `step_advanced`: “Step { from_index } complete. Proceed to step { to_index }.”  
Templates ensure every utterance is **grounded in data**.

---

## ⏱️ Performance Targets
| Stage | Goal |
|-------|------|
| Mic → Speech (deterministic) | ≤ 0.5 s |
| With on-suit 8B LLM (≤ 10 tokens) | ≤ 0.9 s |
| ASR WER in noise | < 10 % |
| HUD refresh from telemetry | ≤ 300 ms |
| False-wake rate | < 1 % |

---

## 🧩 Folder Structure
```
docs/Athena_VoiceAIA_FY26/
 ├── PRD.md
 ├── IMPLEMENTATION.md
 ├── tools.json
 ├── templates.json
 
```

---

## 🧪 Testing & HITL Plan
- Latency and accuracy benchmarks (mic→speech, WER, Intent F1).  
- Network degrade simulation: Green < 10 ms, Yellow 100 ± 30 ms (1 % loss), Red = offline.  
- Noise/night trials and glove PTT ergonomics.  
- Slot evidence validation and complete actuation audit trail.

---

## 🛡️ Safety & Guardrails
- **Mode-bounded command sets** (EVA FSM).  
- **PTT/confirm required** for any state-changing action.  
- **Tool-only reasoning:** LLM outputs strict JSON plans, verified before execution.  
- **Audit logs** include `{ intent, tool, args_hash, result_hash, template_id, eva_mode, ptt_flag }`.

---

## 📚 References
- [`PRD.md`](./PRD.md) — Product Requirements & Architecture  
- [`IMPLEMENTATION.md`](./IMPLEMENTATION.md) — System, models, and HITL plan  
- [`tools.json`](./tools.json) — Function-calling surface  
- [`templates.json`](./templates.json) — Deterministic speech templates  
- [`runtime/planner_test.py`](../runtime/planner_test.py) — Unit tests for planner logic

---

**Athena Voice AIA**  
“Context-aware, tool-first intelligence for safe, resilient EVA operations.”
