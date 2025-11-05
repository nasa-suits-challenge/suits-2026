$ErrorActionPreference = "Stop"
if (-not (Test-Path ".env")) { Copy-Item .env.example .env }
Push-Location libs/tss-client-ts; npm ci; npm run build; Pop-Location
Push-Location services/orchestrator-api; npm ci; npm run dev; Pop-Location
