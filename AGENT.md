# AGENT Guidelines & Operational Rules

This file documents the mandatory operational principles and behavioral rules for any AI agent working on the `JobStack` (`jobstack`) project.

---

### 1. Analysis & Planning First

- **Identify & List Issues First**: Always start by reviewing UI, snapshots, and code to list out all identified issues, discrepancies, and feedback before making any changes.
- **Formulate a Step-by-Step Plan**: Provide a concise, actionable plan detailing how each issue will be addressed and resolved.
- **Re-evaluate Before Execution**: Review the plan critically, prune unnecessary or redundant elements, and verify layout efficiency before touching code.

### 2. Fast & Focused Execution

- **Instant Code Execution**: When a modification or fix is requested, make the changes immediately with minimal friction. Do not waste time with conversational filler, unnecessary preliminaries, or analysis delays.
- **Strict File-Scoping Discipline**: Modify only the directly targeted and required files. Do not inspect, open, or crawl unrelated files across the codebase.
- **Zero Distractions**: Focus directly on producing high-quality, production-grade code modifications rapidly.
- **Precision Modifications**: Update strictly the relevant files and preserve unrelated existing code and configurations.

### 3. Strict Prohibitions: No Server Runs, No Manual Dev Testing, No Distracting Traversal

- **Never Run Project Manually**: **Do not** start dev servers (`npm run dev`, `vite`, `yarn start`), preview servers, or launch background daemon processes unless explicitly commanded by the user.
- **No Automated Post-Execution Testing**: Do not execute test suites, browser scripts (Puppeteer, Playwright), or cURL commands. The user will verify and test all code manually in their own browser environment.
- **Zero Unprompted File Crawling**: Do not read or search across non-essential files when the target location or asset is known. Keep tool calls surgical, fast, and minimal.

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

### 5. Code Integration Rules: Reusable Common Components & Constant-Time Logic

- **Always Integrate Reusable Common Component-Based Code**:
  - **Shared Primitives First**: Always utilize and extend shared components located in `src/components/common/` (e.g., `CategoryIcon`, `ToolBadge`, `JobStackLogo`, `ThemeToggle`) rather than implementing redundant one-off inline SVG icons, badge markups, or repeated styling blocks.
  - **Single Responsibility & Modularity**: Encapsulate newly created UI abstractions into distinct, single-responsibility components with well-defined TypeScript interfaces (`interface ComponentProps`).
  - **Uniform Design Tokens**: Reference root CSS design tokens (`var(--bg-primary)`, `var(--text-accent)`, etc.) across all components to ensure uniform theming, dark/light mode consistency, and effortless maintainability.
  - **Zero Duplication**: Never copy-paste icon SVGs, color dictionaries, or layout wrappers across different views. If a visual or functional pattern is needed in multiple locations, abstract it into `src/components/common/` or a dedicated shared helper.

- **Strict Constant-Time (O(1)) Logic & Computational Efficiency**:
  - **O(1) Lookups Over Linear Scans**: Always use constant-time data structures—JavaScript objects (`Record<string, ...>`), `Map`, or `Set`—for lookups, category icon mapping, color schemes, badge determination, and key indexing. Never perform repeated linear array searches (`find()`, `filter()`, `indexOf()`) inside hot rendering loops.
  - **Pre-Indexed Lookups for Large Datasets**: When navigating or accessing entities by ID or category, access them via indexed maps or dictionaries rather than iterating over full collections.
  - **Avoid Nested Loops & Quadratic Complexity**: Ensure filtering, categorization, and sorting pipelines run in optimal linear time O(N) once per input change, never O(N²) or higher.
  - **React Memoization & Stable References**: Use `useMemo` for derived lists, grouping dictionaries, and filtered datasets. Use `useCallback` for event handlers passed down to child components to prevent cascading re-renders.
  - **Direct Constant-Time DOM Updates**: For critical global states (like theme switching or scroll locking), apply direct O(1) attribute manipulation on document roots (`document.documentElement.setAttribute('data-theme', theme)`) with zero layout thrashing.
  - **Fast UI Response Times**: Keep UI interactions (search keystrokes, category switching, modal navigation) running at 60 FPS with instant sub-millisecond response times.
