# HITL Test Plan Template

## Objectives
- Validate end-to-end EVA flow in night/low-light with live TSS.
- Measure nav accuracy, task completion time, error rates, cognitive load, comms reliability.

## Schedule
- Week N: Lab dry run (sim TSS)
- Week N+1: Outdoor night test with obstacles
- Week N+2: Full-mission rehearsal (PR ↔ EV interop)

## Protocol
- Roles: EV, PR operator, Test Director, Safety Officer, Logger
- Trials: Baseline (no AI aids) vs AIA-enabled
- Data: MET timestamps, path deviation, hazard alerts, voice cmd success, procedure adherence

## Metrics
- Time to locate LTV; distance overrun vs predicted; number of hazard interventions
- Breadcrumb return accuracy; procedure step errors
- SUS score; NASA-TLX; voice recognition accuracy

## Subject Pool
- n=8–12 mixed experience; safety brief & PPE

## Safety
- Illumination, terrain walkdown, comm checks, abort criteria

## Networking & TSS
- IP changeover drill; packet loss tolerance; reconnection strategy
