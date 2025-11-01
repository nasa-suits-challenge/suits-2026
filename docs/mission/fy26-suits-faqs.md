# NASA SUITS FY26 — Frequently Asked Questions

## General
1. **What should be included in the Concept of Operations (CONOPS) section?**
   - The CONOPS section should specify how your design addresses each challenge requirement by detailing how the design evaluator will interface with your device during every procedural step outlined in the mission description.
   - Be explicit about how telemetry and other information are displayed and how the AI Assistant is implemented throughout the experience.
2. **Can we attach videos to our proposal via YouTube links?**
   - Assume reviewers will not watch proposal videos. You may include a video as an additional communication aid, but keep any video short.
3. **Are international students able to participate in this challenge?**
   - International students can participate and contribute at their institution, but they cannot be badged to enter NASA's Johnson Space Center (JSC) in Houston where the test week will occur.
4. **Is there a team size limit?**
   - There is no formal limit, though most teams include 8–15 people.
   - Each team member should contribute within a defined role. Teams are limited to eight badged participants during onsite test week (seven students and one faculty member).
   - Large teams are encouraged to split into separate groups and submit unique proposals.
5. **Do you want system architecture flowcharts in UML 2.0, SysML, etc.?**
   - Use whichever modeling approach your team feels best conveys the architecture.
6. **Can students under the age of 18 participate?**
   - No. All participants must be at least 18 to sign the Statement of Rights and attend test week.
7. **If we previously submitted a NASA SUITS proposal, can we extend it or should we start from scratch?**
   - You may reuse aspects of previous designs if they carry over to this year's challenges, but ensure you address this year's specific requirements first. NASA is looking for unique ideas.
8. **Are international students allowed to be team leads?**
   - STEM Gateway limits team leads to U.S. citizens. You may appoint co-leads so long as at least one is a U.S. citizen.
   - Only U.S. citizens and Legal Permanent Residents (LPRs) will be badged to participate in the onsite culminating event.
9. **Does our faculty advisor have to be an active faculty member from our institution?**
   - Yes. The faculty advisor acts on behalf of the university and must hold a position recognized by the institution. Teams may consult additional faculty members as needed.

## Technical and Devices
10. **Can our team use whatever devices we want?**
    - NASA SUITS strives to be device agnostic. If a head-mounted display (HMD) is used in the field during the EVA, it must be a passthrough AR device so crew members can safely see the ground while walking.
11. **What language is the Telemetry Stream Server (TSS) written in?**
    - The TSS is primarily implemented in JavaScript and TypeScript.
12. **How do you receive data from the TSS?**
    - All TSS data is sent via the WebSocket protocol (`ws`) and uses JSON/GeoJSON payloads.
    - During testing you will point the TSS to the IP address of the device hosting the server.
    - During test week NASA deploys the TSS on a local SUITSNET network at the test site. Teams must update their devices with NASA's host server IP address.
13. **Can phones be used as peripheral devices?**
    - Teams must list every peripheral device included in their design and identify any support they require from NASA SUITS (internet access, extra setup time, etc.) during the spring design review.
    - NASA will either grant approval or follow up for more information before allowing external devices onsite.
14. **Can we design our own custom hardware interface?**
    - Yes. Include a mock-up of the custom interface and explain how it connects to the AR device in the proposal.
    - If selected, teams must present all external devices at the spring design review before the NASA SUITS team will authorize bringing them onsite.
15. **When will the telemetry stream become available?**
    - NASA SUITS aims to provide the telemetry stream to selected teams between mid-December 2025 and early January 2026.
