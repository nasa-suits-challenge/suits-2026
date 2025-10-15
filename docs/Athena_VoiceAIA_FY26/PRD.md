# FY26 NASA SUITS — Athena Voice AIA
**Author:** Matthew Topham  
**Revision:** v3.0 (Context-Aware, Function-Calling Edition)

---

## 1) Overview
Athena is a **context-aware voice AI assistant** for EVA that delivers real‑time, concise guidance and telemetry via a **three‑tier autonomy hierarchy**:

| Tier | Location | Role |
|---|---|---|
| **1 — Earth Megacompute** | Mission Control (high RTT) | Long-horizon analytics, model updates, mission planning |
| **2 — HAL Moonbase** | DGX Spark + openai/gpt‑oss‑120B | Local high‑performance reasoning, route planning, crew coordination |
| **3 — On‑Suit Core** | Rugged laptop/tablet + pass‑through AR | Real‑time STT→Intent→TTS loop, telemetry fusion, checklists, alarms |

Athena is designed to **operate fully offline**; upper tiers only enhance capability.

---

## 2) Objectives
- **Safety & reliability:** bounded, deterministic behavior with explicit guardrails.
- **Low cognitive load:** short, directive speech; HUD cues; mode‑aware prompts.
- **Resilience:** graceful degradation across Earth↔HAL↔Suit links.
- **Testability:** measurable latency/accuracy; clear HITL plan and metrics.

---

## 3) EVA Modes (Finite‑State Machine)
Phases act as states with bounded intents and tool access.

| Phase | Allowed Intents (examples) | Transition Triggers | Outputs |
|---|---|---|---|
| **Egress** | checklist, vitals, comms check | depress complete → airlock open | HUD checklist; status voice |
| **EV‑Nav** | bearing, breadcrumb, status | rover unlatched → waypoint | nav HUD, course alerts |
| **LTV Repair** | begin/next/back/repeat step, tool check | enter task zone → complete/abort | procedural readouts; verifications |
| **Ingress** | checklist, vitals summary, end EVA | nav return → repress complete | safe return sequence; summary |

---

## 4) Key Requirements & Targets
| Category | Requirement | Target |
|---|---|---|
| **Latency** | Mic→spoken reply (deterministic path) | ≤ **0.5 s** |
|  | With on‑suit LLM (≤10 tokens) | ≤ **0.9 s** |
| **ASR** | Noise‑robust streaming ASR | **WER < 10%** in field noise |
| **HUD** | Telemetry change → HUD prompt | ≤ **300 ms** |
| **Autonomy** | All critical voice flows local | **No loss** under link drop |
| **Guardrails** | Phase whitelist; PTT/confirm for writes | **100%** gated |
| **Logging** | Actuation/event hashes | **100%** recorded |

---

## 5) Hardware Assumptions
- **On‑Suit Core:** 8‑core i7/Ryzen 7, **32 GB RAM** (≈16 GB available to models), 1 TB SSD; optional RTX 3050/3060.
- **HMD:** Pass‑through AR (Quest Pro / HoloLens 2 / Magic Leap) with mic/speaker.
- **HAL:** DGX Spark (Grace‑Blackwell), **128 GB RAM**, 240 W AC; hosts 120B LLM + planner.
- **Network:** Local Wi‑Fi 7/10 GbE intra‑base (<10 ms one‑way). SUITSNET provides network/TSS, not compute.

---

## 6) Model Stack (Default)
| Layer | Model | Size | Notes |
|---|---|---:|---|
| VAD | **Silero/WebRTC VAD** | <5 MB | always‑on |
| Wake phrase | **Porcupine** / OpenWakeWord | 20 MB | phrase‑activation + **PTT override** |
| ASR | **Faster‑Whisper base‑en (int8)** | ~90 MB | streaming; RNNoise/WebRTC NS |
| Policy/Intent | **Finite‑state graph** + small LLM | — | bounded intents per phase |
| Local LLM | **Llama‑3.1‑8B‑Instruct (GGUF Q4_K_M)** | ~5.6 GB | short phrasing / intent smoothing |
| TTS | **Piper** (offline) | 60–80 MB/voice | pre‑baked common lines |
| HAL LLM | **openai/gpt‑oss‑120B** | ~100 GB | served via vLLM/TGI; templated directives only |

Alternative on‑suit: Qwen‑2.5‑14B‑Instruct (Q4_K_M ~11 GB) with smaller context (≤1–2k).

---

## 7) Context Envelope (Provided Every Turn)
```json
{
  "eva_mode": "EVNAV",
  "procedure": {"id":"LTV-REP-01","step_index":4},
  "telemetry": {"o2_primary_pct":47,"o2_secondary_pct":99,"co2_mmHg":3.8},
  "nav": {"target_marker_id":"m_42","distance_m":85,"bearing_deg":110},
  "alerts": [],
  "comms": {"hal_link":"GREEN","earth_link":"DOWN"},
  "safety": {"ptt_held":false,"glove_mode":true},
  "caps": {"tools_allowed":["get_telemetry","get_checklist_step","repeat_step","get_bearing_to","say"]},
  "policies": {"templates_only":true,"actuation_requires":"PTT_OR_CONFIRM"},
  "time":"2026-05-17T01:14:22Z"
}
```

---

## 8) Tool‑First, Template‑Only Output
- LLM may call **only** tools in `caps.tools_allowed`; all speech via `say(template_id, slots)`.
- **Every slot** must bind to fields from tool returns/context. No free‑form prose.
- **Writes** (e.g., `advance_step`, `set_breadcrumb`) require **PTT held** or explicit confirm intent.
- Additional tools (`plan_route`, `summarize_recent`, `rerank_asr`) can be **granted on request** when safe (link GREEN).

---

## 9) KPIs & HITL Testing
- **Latency:** mic→speech (deterministic) ≤0.5 s; with 8B LLM (≤10 tokens) ≤0.9 s.
- **Accuracy:** WER<10% in noise; Intent F1>95%; false‑wake<1%.
- **Network:** Green/Yellow/Red link emulation; zero critical loss.
- **Usability:** PTT ergonomics with gloves; recovery after link loss.
- **Audit:** Complete event/actuation logs; evidence‑slot validation 100%.

---

## 10) Deliverables
- Source (voice loop, FSM, tool runtime), **PRD/IMPLEMENTATION**, `tools.json`, `templates.json`.
- HITL test report with plots; demo video of Green→Red→Green continuity.
