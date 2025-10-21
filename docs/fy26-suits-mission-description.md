# NASA SUITS FY26 — Mission Description (2025–2026)

## 1. Background
NASA SUITS (Spacesuit User Interface Technologies for Students) is a software design challenge that engages college students across the United States in solving future spaceflight needs. The Artemis campaign is returning humans to the Moon for scientific discovery, economic benefits, and to inspire the Artemis Generation. That effort demands new approaches to extravehicular activity (EVA).

NASA SUITS is a collaboration between the Extravehicular Activity and Human Surface Mobility Program (EHP) and NASA's Office of STEM Engagement. Entering its ninth year, the challenge connects students to authentic engineering problems involving displays, voice assistants, AI integration, and interoperability between spacesuits and rovers. Teams submit a proposal that covers both the spacesuit and pressurized rover (PR) systems, displays, and voice assistants. Selected teams are assigned to focus on either the PR or spacesuit asset and are paired with another team covering the complementary asset.

Head-mounted displays used in spacesuit concepts must be passthrough AR devices. The pressurized rover operates in NASA's Digital Lunar Exploration Sites Unreal Simulation Tool (DUST). After the proposal phase, top teams develop their UI and supporting software, receive mentorship from NASA experts, and test their work in a mock EVA at NASA Johnson Space Center (JSC) in Houston in May 2026.

## 2. Mission Concept
NASA SUITS is creating a lunar EVA scenario for 2026. Each team is responsible for its UI, voice assistant, display hardware, and supporting software. Testing occurs at night in the JSC Rock Yard. Teams must account for lighting conditions on a pulverized granite surface with scoria boulders up to 1 m and craters up to 2 m deep and 20 m in diameter.

Teams will be assigned to either the PR or spacesuit components and paired with another team for interoperability. Each team connects to a telemetry stream specific to its asset.

### 2a. Pressurized Rover
The PR team develops a display and control system for a rover operating in the DUST environment. Autonomous systems should navigate between locations, execute search-and-rescue patterns, perform path planning and object detection, and account for resource utilization. Integrating AI to accomplish these objectives is essential for a strong proposal.

### 2b. Spacesuit
The spacesuit team deploys its solution for one EVA crew member (EV). The interface can run on a head-mounted display, tablet, phone, or other device. The EV relies on both displays and a voice assistant to accomplish mission goals.

### 2c. Artificial Intelligence Assistant (AIA)
NASA SUITS aims to act as a force multiplier for astronauts by increasing efficiency and reducing cognitive load so crew members can focus on tasks best suited for humans. AI is central to this goal. Voice responses should use natural, concise language (e.g., “Primary O2 47%, Secondary 99%,” rather than verbose phrasing). AI also supports route planning for both PR and EV, accounting for consumable limits and adjusting as conditions change. Teams must implement guardrails that prevent hallucinations from jeopardizing mission-critical functions.

### 2d. Mission Tasks
#### Initial Scene
An autonomous Lunar Terrain Vehicle (LTV) performs standard operations at a known location. An unknown error halts communications. The LTV’s last location and consumables are known. A software glitch likely kept the LTV operating autonomously until it entered automatic sleep mode due to low power. Teams must establish a search radius, map and execute a search pattern to locate the LTV, and guide the crew into range to egress and make repairs safely.

#### Pressurized Rover Navigation
The PR team demonstrates its UI and crew-autonomy system while navigating from the starting point to search for the lost LTV. Using the LTV’s last known position and consumables, the team establishes a search radius and pattern based on industry standards, adapting to terrain as it locates the LTV safely and efficiently. The pattern should adjust as new inputs (e.g., LiDAR, beacon signals) become available. The PR operates within the DUST environment.

Evaluated PR features include autonomous best-path planning, hazard avoidance, consumable/resource tracking, and estimates of remaining resources relative to planned routes. Teams should estimate turnaround points where the rover must return to base to avoid depleting limited resources. When provided with a point of interest, predictive modeling should enable decision support that optimizes resource usage and reduces cognitive load. The PR broadcasts a simulated “wake-up call” that triggers the LTV when within range, shrinking the search area to under 500 m. Optional “warmer/colder” guidance may aid tracking within roughly 50 m.

Upon arrival, the crew prepares for egress. The Umbilical Interface Assembly (UIA) is incorporated into the PR hatch.

#### Egress
Egress begins when the EV exits the airlock to start the EVA. Multiple steps must confirm the crew member can safely egress. The priority is showcasing intuitive displays and voice interactions as the EV performs the UIA procedures that prepare and check the portable life support system.

The EV manipulates UIA switches per provided procedures. Appendix A includes a sample procedure, which may change before Test Week. After completing the egress task, the EV proceeds to navigation. Teams choose how to communicate the procedures (text checklists, computer vision, voice commands, combinations, or other approaches) and should integrate AI. Switch states from the UIA are provided through the Telemetry Stream Server (TSS).

#### EV Navigation
The navigation objective is to traverse safely and efficiently. Teams implement software that detects environmental hazards under lunar south pole lighting conditions and updates the EV as situations change. A sample lighting animation is available online. The system provides real-time alerts and recommends immediate actions such as alternate routes.

Navigation solutions must remain effective yet non-obtrusive, allowing flexibility because destinations can change. Interfaces must include a 2D minimap for navigation assistance and may add a 3D map, computer-vision destination waypoints, or path indicators. Throughout the EVA, the LTV may send status updates that influence navigation.

#### LTV Repair
1. **Exit Recovery Mode (ERM)**
   - Retrieve ERM procedures from the AI assistant.
   - Follow the procedures and wait for confirmation that ERM succeeded before proceeding.
2. **System Diagnosis**
   - Command the AIA to conduct a system diagnosis when ready, while the EV performs visual inspections.
   - Wait for diagnostics to complete; the AIA provides next steps and guides the EV through corrective procedures.
3. **System Restart (Navigation Correction)**
   - The AIA delivers and guides the EV through a physical restart of the rover navigation system.
   - The AIA reports when the restart is complete and verifies position data.
4. **Physical Repair Tasks**
   - The AIA guides the EV through instrument repairs, which may include:
     - Reconnecting a loose bus connector (must be repaired because power systems are limited).
     - Replacing a damaged dust sensor (can be deferred if time is short; the AIA should recommend delaying when necessary).
5. **Final Checks and Verification**
   - The AIA conducts a final system diagnosis to confirm the rover is stable and recovery succeeded.

#### Ingress
EVA ends only when the EV safely returns inside the PR. After finishing EVA tasks, the EV follows navigation cues to the PR, using the UI’s breadcrumbs feature to retrace the path. The design should provide the shortest safe return route. Once docked, the EV completes final UIA procedures.

## 3. NASA-Provided Systems and Equipment
### 3a. Telemetry Stream Server (TSS)
NASA supplies a TSS that simulates telemetry for lunar assets. A Unity/Unreal plugin helps integrate the TSS with team devices. Designs must retrieve and display the following telemetry at any time:

- Pressurized Rover telemetry
- LTV telemetry at 500 m
- LTV telemetry at 50 m
- UIA state data
- Spacesuit telemetry
- Display and Control Unit (DCU) status
- LTV task board data

### 3b. Umbilical Interface Assembly (UIA)
The UIA contains multiple switches that teams manipulate to match desired egress configurations. Switch states feed into the TSS as booleans, giving real-time feedback. Teams are encouraged to employ creative methods (computer vision, voice assistants, etc.) to convey procedures and relevant telemetry while completing the checklist.

### 3c. Lunar Terrain Vehicle (LTV)
NASA provides the LTV and supporting framework to traverse the test-site terrain. Teams must receive and display LTV telemetry. The LTV features a task board with physical tasks (details released after team selection).

### 3d. Display and Control Unit (DCU)
The DCU includes switches that let the EV interact with suit systems. Switch states feed into the TSS, providing real-time feedback. The provided DCU lacks an integrated display; the spacesuit UI must present DCU information via the TSS. Systems controlled by the DCU include:

- Battery (Local/UMB)
- Oxygen (Primary/Secondary)
- Communications (A/B)
- Fan (Primary/Secondary)
- Pump (Open/Close)
- CO₂ (A/B)

NASA will supply a method to simulate the DCU location system to support development.

## 4. Requirements
Requirements may evolve after team selection. Terminology:

- **Shall** — required for a minimally viable product
- **Should** — requested features with secondary priority
- **May** — stretch goals for development

### 4a. Pressurized Rover Requirements
1. **Pressurized Rover Control**
   - Shall develop a system for controlling the rover in the virtual DUST environment.
2. **Spacesuit Telemetry**
   - The UI may display crew biomedical data and shall display spacesuit system state data; all telemetry must be easily accessible.
3. **LTV Telemetry**
   - The UI shall display LTV beacon data and make it readily accessible.
4. **Task Procedures**
   - The UI shall display procedures for mission tasks, with easy access to all steps.
5. **Map**
   - The PR UI shall include a live 2D map tracking surface assets.
   - The map may track crew locations, draw projected and traversed EV paths, display the LTV travel radius, track and adjust search patterns as new information arrives, and display/drop/share labeled points of interest (POIs) with the EV.
   - The UI shall feature a caution and warning (C&W) system that alerts when telemetry is off-nominal and prompts the AIA to recommend procedures.
   - Mission timers (HH:MM:SS) shall be displayed and adhere to standards provided to selected teams.
6. **Autonomous Navigation System**
   - Shall determine best paths, detect and avoid obstacles, accept updated destinations from the TSS, provide a map of lunar assets, and track rover speed, angle, and heading.
7. **Autonomous Resource Utilization**
   - Shall track life support systems and health, monitor rover resource usage (such as power) with predictive analytics, deliver real-time updates via the C&W system, and use the AIA to provide natural-language status updates with specific values.

### 4b. Spacesuit Display Requirements
1. **EV Telemetry** — The UI shall display EV suit and simulated biomedical data.
2. **Map** — The UI shall display a 2D map, show planned search locations and routes to locate the LTV efficiently, display live asset locations (including other crew), and may include a 3D map.
3. **Procedure List** — The UI shall display correct procedures for each EVA station and provide natural-language voice assistance.
4. **Navigation** — The UI shall implement breadcrumbs for backtracking to the PR, should provide best-path navigation and navigation aids to POIs, and shall offer predictive maximum range estimates based on life-support usage and limits.
5. **Drop Pins** — The design shall enable users to drop pins on the map at any time during the EVA.
6. **Caution and Warning** — The UI shall feature a C&W system that alerts when suit or biometric telemetry becomes off-nominal and uses AI to recommend actions.

### 4c. Peripheral Requirements
These requirements apply to peripheral devices:
1. Any external or additional device must be presented at the Software Design Review (SDR) and approved by NASA SUITS.
2. Devices should communicate with team systems outside the TSS (e.g., Bluetooth).
3. Devices must not include holes or openings that could trap fingers.
4. Devices must not have sharp edges.
5. Pinch points should be minimized and labeled.
6. Electrical designs must meet additional requirements provided by NASA.

## Appendix A: Sample UIA Procedures (EVA Egress)
> **Note:** Procedures are subject to change before Test Week.

### Connect UIA to DCU and Start Depress
1. EV1 verifies umbilical connection from UIA to DCU.
2. UIA: EMU PWR — ON.
3. DCU: BATT — UMB.
4. UIA: DEPRESS PUMP PWR — ON.

### Prep O₂ Tanks
1. UIA: OXYGEN O₂ VENT — OPEN.
2. HMD: Wait until both Primary and Secondary O₂ tanks are &lt; 10 psi.
3. UIA: OXYGEN O₂ VENT — CLOSE.
4. DCU (both crew): OXY — PRI.
5. UIA: OXYGEN EMU-1 — OPEN.
6. HMD: Wait until EV1 Primary O₂ tank is &gt; 3000 psi.
7. UIA: OXYGEN EMU-1 — CLOSE.
8. DCU (both crew): OXY — SEC.
9. UIA: OXYGEN EMU-1 — OPEN.
10. HMD: Wait until EV1 Secondary O₂ tank is &gt; 3000 psi.
11. UIA: OXYGEN EMU-1 — CLOSE.
12. DCU (both crew): OXY — PRI.

### End Depress, Check Switches, Disconnect
1. HMD: Wait until Suit Pressure and O₂ Pressure equal 4.
2. UIA: DEPRESS PUMP PWR — OFF.
3. DCU (both crew): BATT — LOCAL.
4. UIA: EV-1 EMU PWR — OFF.
5. DCU (both crew): Verify OXY — PRI.
6. DCU (both crew): Verify COMMS — A.
7. DCU (both crew): Verify FAN — PRI.
8. DCU (both crew): Verify PUMP — CLOSE.
9. DCU (both crew): Verify CO₂ — A.
10. EV1 disconnects UIA and DCU umbilicals.
