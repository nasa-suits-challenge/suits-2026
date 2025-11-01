# NASA SUITS FY26 — EVA vs. Pressurized Rover Challenge Comparison

| **Category** | **EVA (Spacesuit Challenge)** | **Pressurized Rover (PR) Challenge)** |
|---------------|-------------------------------|--------------------------------------|
| **Primary User** | Astronaut on EVA (“EV1”) operating outside the rover | Crew operating inside the pressurized rover cockpit |
| **Main Objective** | Develop a *wearable or portable interface* to guide the astronaut through egress, navigation, LTV repair, and ingress | Develop a *control and monitoring interface* for navigating the rover autonomously and coordinating with the EVA crew |
| **Environment** | External surface operations on simulated lunar terrain (nighttime at JSC Rock Yard) | Virtual lunar terrain (NASA’s **DUST Unreal simulation**) |
| **Hardware Platform Options** | Passthrough AR **Head-Mounted Display (HMD)** (e.g., HoloLens 2), tablet, or wrist-mounted display | On-board **display/control system** within a simulated rover cabin |
| **Data Stream Source** | Spacesuit telemetry, biomedical data, and UIA/DCU switch states (via **TSS**) | Rover telemetry (position, heading, power), **LTV beacon data**, and **EV tracking** (via **TSS**) |
| **Core Tasks** | • Execute **Umbilical Interface Assembly (UIA)** egress procedures  <br> • Navigate across lunar terrain with hazards & low light  <br> • Perform **LTV repair** guided by AI assistant  <br> • Return safely to rover using breadcrumb trail | • Plan and perform **autonomous search pattern** to find lost LTV  <br> • Optimize route for power & time  <br> • Track EV location and coordinate via telemetry  <br> • Provide **caution/warning** and consumables analytics |
| **AI Role (AIA)** | Acts as an *on-suit assistant* for guidance and procedure confirmation: “Primary O₂ 47%, Secondary 99%.” | Acts as *mission planner and decision-support system*: pathfinding, hazard avoidance, predictive resource use |
| **Display Features Required** | • 2D (and optional 3D) map with live positions and path  <br> • Breadcrumb return path  <br> • Drop-pin/POI tagging  <br> • Warnings for off-nominal telemetry | • Live 2D map with rover, EV, and LTV  <br> • Search-radius visualization and adaptive pattern  <br> • Drop-pins and POIs shared with EVA  <br> • Resource tracking and caution/warning alerts |
| **Unique Systems to Interface With** | • **UIA** (Umbilical Interface Assembly) for power/O₂ control  <br> • **DCU** (Display Control Unit) for switch-state feedback | • **Autonomous navigation system** inside DUST  <br> • **Rover telemetry system** and **LTV beacon detection** |
| **Mission Start Trigger** | Begins after rover stops and crew egresses for EVA | Begins when **communication with LTV is lost** and rover must perform search |
| **Key Performance Metrics** | • Task completion time and accuracy during EVA  <br> • Usability of AI guidance (HITL test)  <br> • Cognitive-load reduction | • Efficiency of search and rescue pattern  <br> • Accuracy of resource prediction  <br> • Autonomy and safety of navigation |
| **Evaluation Focus** | Human-machine interface design, cognitive support, procedure reliability | System autonomy, path-planning, and telemetry integration |
| **Deliverable Style** | Focus on **wearable UI/AR design**, user experience, and human-in-the-loop testing | Focus on **autonomous system logic**, multi-asset data visualization, and AI-driven control |
| **Integration Point Between Teams** | EV sends status/POIs to PR via telemetry and receives return-path info | PR shares map updates, caution data, and search status with EV team |

