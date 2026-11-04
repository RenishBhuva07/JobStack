# AGENT Guidelines & Operational Rules

This file documents the mandatory operational principles and strict behavioral rules for any AI agent working on the `JobStack` (`jobstack`) project.

---

### 1. Senior React Engineer Standard & Ultra-Fast Execution

- **Senior Mindset**: Think, structure, and execute like a Senior React & TypeScript Engineer. Deliver production-grade, highly performant, type-safe, and scalable code.
- **Do Not Waste Time**: Zero conversational filler, zero delays, zero unnecessary preliminary chatter. Get straight to the solution and make the changes immediately.
- **Fast Comprehension**: Read code, inspect attached screenshots/materials, and analyze root causes swiftly and accurately on the first pass.
- **Laser Focus on the Given Task**: Address strictly what the user asked. Never wander into unprompted refactoring, never perform extraneous codebase research or open-ended browsing.
- **Precision Modifications**: Touch only the directly relevant files. Preserve existing comments, docstrings, unrelated business logic, and project conventions.

### 2. STRICT RULE: Absolute Task Fidelity & Zero Untold Changes (FOLLOW WITHOUT FAIL)

- **Strict Adherence to Instructions**: Focus strictly and exclusively on the exact requirements given by the user. Follow every instruction without fail.
- **NEVER Introduce Untold Changes or Unrequested Features**:
  - Never add unrequested UI controls, popovers, dropdowns, extra menus, or helper components that the user did not explicitly ask for.
  - When told to move an element to free up space for another element (e.g. freeing up space for a search bar), **give that freed space directly and fully to the intended element**. Never divert, absorb, or re-allocate that space to unrequested elements or dropdowns.
- **Zero Hallucinated Scope**:
  - Do not assume "nice to have" additions.
  - If a task asks to move X so that Y can take space, Y must take that space, and no new Z element should ever be introduced.
- **Verify Direct Alignment**: Before finishing any change, verify that every modification matches the user's explicit objective and that no untold code or layout shifts were introduced.

### 3. STRICT PROHIBITIONS: No Running Project, No Screenshots, No Servers, No Git Staging

- **STRICTLY FORBIDDEN: NEVER Run the Project or Start Servers**:
  - **NEVER** run `npm run dev`, `vite`, `npm run preview`, `npx vite preview`, `yarn start`, or any local server process (foreground or daemon).
  - The project runtime environment is strictly managed and run by the user.
- **STRICTLY FORBIDDEN: NEVER Take Screenshots or Launch Headless Browsers**:
  - **NEVER** launch headless Chrome, Chromium, Puppeteer, Playwright, CDP scripts, or any browser automation tool to capture screenshots or test the UI visually.
  - **NEVER** attempt to visually verify or inspect UI changes by yourself.
  - The user manually inspects, tests, and verifies all UI changes directly in their own browser.
- **STRICTLY FORBIDDEN: NO Repeated Builds**:
  - Do **NOT** run `npm run build` repeatedly across turns or edit cycles.
  - Never trigger multiple build cycles to check changes. If type verification is needed, do not run full bundling loops; let the user build and test the project.
- **NEVER Stage or Commit Changes (`git add` / `git commit`)**:
  - **Do NOT stage any changes** made during execution (`git add` is strictly prohibited).
  - Leave staging, reviewing diffs, and committing entirely to the user.
- **Preserve Backup Files**:
  - `src/data/tools.json` is a preserved **backup file only**—do not overwrite or mutate it.
  - Active runtime data is served from `src/data/new_tools.json`.
- **Zero Unprompted File Crawling**:
  - Do not crawl or grep non-essential directories when the target file or symbol is known. Keep all tool calls surgical, fast, and minimal.

### 4. Reusable Common Components & Clean Abstractions

- **Always Write Reusable, Modular Code**:
  - Leverage and extend shared components in `src/components/common/` (`CategoryIcon`, `ToolBadge`, `LoginBadge`, `JobStackLogo`, `ThemeToggle`).
  - Encapsulate repeated UI patterns into clean, single-responsibility components with explicit TypeScript interfaces (`interface ComponentProps`).
  - **Zero Duplication**: Never copy-paste icon SVGs, color dictionaries, or layout wrappers across views. Abstract shared helpers or common components.
  - Maintain consistent design tokens (`var(--bg-primary)`, `var(--text-accent)`, etc.) for seamless light/dark mode and responsive layouts.

### 5. Constant-Time (O(1)) Logic & Computational Efficiency

- **Strict O(1) Lookups**:
  - Use constant-time data structures (`Record<string, ...>`, `Map`, or `Set`) for icon mapping, category lookups, badges, and entity access.
  - Never perform repeated linear array searches (`find()`, `filter()`, `indexOf()`) inside hot rendering loops or child components.
- **Pre-Indexed Collections**:
  - Index large entity lists by key/ID when performing repeated lookups or relational mappings.
- **Optimal Single-Pass Operations**:
  - Ensure filtering, sorting, and grouping pipelines execute in linear $O(N)$ single-pass time per search/filter change—never nested $O(N^2)$ loops.
- **React Performance Best Practices**:
  - Wrap derived collections and expensive calculations in `useMemo`.
  - Pass stable callbacks with `useCallback` to prevent cascading child re-renders.
  - Apply direct DOM root updates for instant theme toggles and layout locks without layout thrashing.

### 6. UI & Architectural Requirements for JobStack

- **Dedicated Directory Page for Tools**:
  - Keep `/tools` view clean and spacious without stacking multiple thick sticky bars that crush viewport height.
- **Header Title & Right-Side Stats Placement**:
  - Avoid redundant breadcrumb rows (`Back to Home / All Tools`).
  - Place directory stats horizontally on the **right side** of the main heading (`justify-content: space-between`).
- **Zero-Gap Sticky Alignment**:
  - Fixed navigation bars maintain fixed height (`64px`). Sticky toolbars lock flush (`top: 64px`) with **zero gap**.
- **Section Title Bar on Any Category Selection**:
  - Selecting any category displays the category section title bar (icon, category name, count badge, description, all-categories button).
- **Interactive Tool Exploration**:
  - Maintain interactive one-by-one tool exploration modal with keyboard navigation (`←`/`→`), counter, and deep metadata.
- **Core Platform Directory Inclusions**:
  - Ensure key platforms are always accurately maintained: **LinkedIn**, **Naukri.com**, **Indeed**, alongside vetted freelance/remote networks.
- **Resilient Logos**:
  - Use high-quality SVG brand icons and fallbacks so third-party CDN issues never render broken images.
