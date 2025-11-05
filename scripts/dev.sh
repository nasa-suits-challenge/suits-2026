#!/usr/bin/env bash
set -euo pipefail
cp -n .env.example .env || true
(cd libs/tss-client-ts && npm ci && npm run build)
(cd services/orchestrator-api && npm ci && npm run dev)
