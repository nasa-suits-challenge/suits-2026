# NASA SUITS 2025–2026 — Team Starter Repo

> Starter scaffold for a SUITS team implementing **Pressurized Rover UI**, **Spacesuit UI**, and an **AI Assistant (AIA)** with Telemetry Stream Server (TSS) integration.

## What’s inside
- `docs/` — proposal outline, mission requirements, HITL test plan, outreach plan, budget and schedule templates.
- `apps/ev-ui/` — Spacesuit display & voice UI app.
- `apps/pr-ui/` — Pressurized Rover UI for DUST sim control and map.
- `services/aia/` — AI microservice & guardrails.
- `libs/tss-client/` — TypeScript WebSocket client for TSS (JSON/GeoJSON).
- `.github/` — issue templates, PR template, labels.

## Quick start
1. Create a new repo in your org: **nasa-suits-challenge/suits-2026**.
2. Download this zip and extract into the repo root.
3. Run: `npm i` (optional for libs), then open the `docs/PROPOSAL_OUTLINE.md` and start drafting.
4. Push to GitHub and set up branch protections (`main`) + required reviews.

---

### Suggested Repos (if you prefer multi-repo instead of a monorepo)
- `suits-2026` (monorepo — recommended to start)
- `suits-aia`
- `suits-ev-ui`
- `suits-pr-ui`
- `suits-tss-client`
- `suits-ops` (PM, docs, HITL)
