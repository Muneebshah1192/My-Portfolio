# Final Capstone Package & Retrospective
**Author:** Syed Muneeb Haider Shah  
**Track:** General AI Fluency (Final Checkpoint FL-10)

## 1. Master Deliverables Index
| Deliverable | Description | Live Link / Reference |
| :--- | :--- | :--- |
| **Personal 3D Portfolio** | High-performance interactive portfolio featuring scroll-based 3D animations, background video integration, and project archives deployed on Vercel. | [https://syed-muneeb-haider-portfolio.vercel.app/](https://syed-muneeb-haider-portfolio.vercel.app/) |
| **FL-09 README & Docs** | Complete technical documentation, architecture sketch, and evaluation results. | Available in this repository (`README.md`) |
| **Demo Video** | 3–5 minute live end-to-end walkthrough showing real features and limitations. | Submitted via Showcase Thread Link |

---

## 2. Project Retrospective (500–800 words)

### Looking Back at Week 1
When I started this track, my goal was to bridge the gap between traditional full-stack web development and modern AI-driven agentic workflows. As an IT student and freelance developer already working with Python, React, and databases, I understood how to write code, but I wanted to master how to architect intelligent systems and leverage AI as a true engineering partner rather than a simple autocomplete tool.

### What Changed in How I Build
The biggest shift across these weeks has been moving from manual, line-by-line coding of boilerplate to high-level system orchestration. Building my scroll-based 3D personal portfolio taught me how to combine heavy graphic elements (WebGL and background video) with clean component architecture without sacrificing performance. I learned to treat AI as a collaborative reviewer—running rigorous evaluations, tracking v2 benchmark improvements, and being completely transparent about edge cases and limitations.

### Three Most Transferable Things Learned
1. **Rigorous Evaluation Frameworks:** Moving past "it looks like it works" to measurable v2 evaluations, performance benchmarking, and structured testing.
2. **Transparent AI Integration:** Documenting exact workflows where AI assisted with code scaffolding while retaining human ownership over core logic and security.
3. **Production-Grade Deployment:** Delivering end-to-end applications (from local prototyping to live Vercel production environments with real user utility).

### What I Would Build Next
With these foundational systems established, my next step is to integrate autonomous Model Context Protocol (MCP) agents directly into live developer portfolio workflows—allowing automated content updates and real-time interactive user engagement.

---

## 3. Build-in-Public Story & Reflection
* **Key Design Decision:** Opting for a scroll-based video background combined with Three.js elements in the personal portfolio instead of static images. While this created initial performance hurdles on mobile viewports, implementing aggressive lazy-loading and asset optimization successfully preserved a 90+ Lighthouse performance score.
* **Real Limitation:** Complex 3D WebGL rendering and heavy background video decoding can cause frame drops on older, lower-end mobile chipsets, highlighting the ongoing trade-off between visual immersion and universal accessibility.
