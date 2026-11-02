# AGENT Guidelines & Operational Rules

This file documents the mandatory operational principles and behavioral rules for any AI agent working on the `JobStack` (`jobstack`) project.

---

### 1. Analysis & Planning First

- **Identify & List Issues First**: Always start by reviewing UI, snapshots, and code to list out all identified issues, discrepancies, and feedback before making any changes.
- **Formulate a Step-by-Step Plan**: Provide a concise, actionable plan detailing how each issue will be addressed and resolved.
- **Re-evaluate Before Execution**: Review the plan critically, prune unnecessary or redundant elements, and verify layout efficiency before touching code.

### 2. Fast & Focused Execution

- **Zero Distractions**: Do not waste time with unnecessary commentary or hesitation. Focus directly on implementing high-quality, production-ready code.
- **Precision Modifications**: Update only the relevant files and preserve unrelated existing code and configurations.

### 3. No Automated Post-Execution Testing or Server Runs

- **Do Not Test Automatically**: After finishing code edits, **do not** run tests, start dev servers (`npm run dev`), launch preview servers, or run curl/puppeteer commands by yourself.
- **User Verification**: The user will test and verify all functionality manually in their browser.

### 4. UI & Architectural Requirements for JobStack

- **Dedicated Directory Page for Tools**:
  - Avoid stacking multiple thick sticky bars on the landing page that compress the viewport.
  - Provide a dedicated `/tools` page so users have maximum vertical screen real estate to explore platforms comfortably.
- **Header Title & Right-Side Stats Placement**:
  - Do not clutter directory views with redundant breadcrumb rows (e.g. `Back to Home / All Tools`).
  - Display the directory stats (e.g. `18 tools handpicked across 5 categories`) horizontally on the **right side** of the main heading (`Explore All Job Tools`) in a single flex row (`justify-content: space-between`), with prominent bold typography.
- **Zero-Gap Sticky Header & Toolbar Alignment**:
  - Fixed navigation bars must maintain a stable fixed height (e.g., `height: 64px`), avoiding height or padding shifts on scroll.
  - Sticky toolbars directly below the header must lock flush (`top: 64px`) with **zero gap**, preventing underlying cards or background from showing through during scroll.
- **Section Title Bar on Any Category Selection**:
  - Selecting any category must always display the category's section title bar (icon, category name, count badge, short description, and a button to view all categories), maintaining a consistent, polished layout across all views.
- **Strict Vertical Spacing Discipline in Directory Views**:
  - Header and toolbar must be compact (under ~120px combined) so that the first row of tool cards is immediately visible above the fold on standard displays.
  - Avoid multi-row wrapping in toolbars on desktop: keep search input, category pills, and view toggles unified in a sleek single row.
  - Section headers must be streamlined and inline (icon, title, count pill, one-line summary) rather than heavy multi-line banners.
- **No Redundant Navigation Controls**:
  - Do not introduce duplicate rows such as "Jump to section" chips when category tabs already perform that function.
  - Do not display empty categories with 0 tools (e.g. `Networking 0`).
- **Sectioned Category Browsing in "All"**:
  - When viewing the "All" category, list tools divided into dedicated **category sections** (e.g., Freelance Platforms, Job Boards, Cold Outreach, AI-Powered, Networking, Portfolio), each with a category title and count.
- **One-by-One Tool Exploration**:
  - Provide an interactive one-by-one tool inspector/modal with **Previous** (`←`) and **Next** (`→`) navigation, keyboard shortcuts, counter (e.g. `Tool 4 of 18`), deep feature overviews, and direct visit actions.
- **Core Platform Directory Inclusions**:
  - Ensure key job discovery platforms are permanently maintained: **LinkedIn**, **Naukri.com**, and **Indeed**, alongside freelance marketplaces like Upwork, Toptal, and Fiverr.
- **Visual Integrity & Resilient Logos**:
  - Provide high-quality SVG brand icons and fallbacks so third-party CDN rate-limiting or blocking never results in broken images or generic plain boxes.
