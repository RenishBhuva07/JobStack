<div align="center">

<h1>
  <img src="public/favicon.svg" alt="JobStack Logo" width="40" height="40" align="center" />
  &nbsp;JobStack
</h1>

### The career-discovery directory with the noise turned off.

**Hand-curated freelance platforms, job boards, startup hubs, and career tools in one instant, keyboard-first interface.**

<br />

[![GitHub Repository](https://img.shields.io/badge/GitHub-RenishBhuva07%2FJobStack-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RenishBhuva07/JobStack)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=20232A)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-Powered-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

![CLS](https://img.shields.io/badge/CLS-0.000-22c55e?style=flat-square)
![INP](https://img.shields.io/badge/INP-%3C50ms-22c55e?style=flat-square)
![Search](https://img.shields.io/badge/Search-%3C10ms-22c55e?style=flat-square)
![Trackers](https://img.shields.io/badge/Trackers-0-f43f5e?style=flat-square)
![Server Calls](https://img.shields.io/badge/Server%20Roundtrips-0-0ea5e9?style=flat-square)

</div>

---

## 🎯 Purpose

Job hunting today is plagued by ghost listings, recruiter spam, ad trackers, and dozens of disconnected browser tabs. **JobStack** solves this by unifying top freelance marketplaces, job boards, startup hubs, and career research platforms into one fast, distraction-free screen.

- **Zero Sign-Ups**: Browse every platform and direct link without creating an account.
- **Zero Trackers & Ad-Tech**: 100% private, client-side directory with zero layout shifts and zero tracking scripts.
- **Upfront Transparency**: Review candidate costs, pricing models, and authentication methods *before* clicking away.

---

## 🚀 Key Features

### ⚡ Instant Multi-Vector Search
- Sub-10ms client-side search scanning across 11 fields (names, tags, roles, regions, notes, and login types).
- Press <kbd>⌘</kbd> + <kbd>F</kbd> (Mac) or <kbd>Ctrl</kbd> + <kbd>F</kbd> (Windows/Linux) anywhere to immediately focus the search bar.
- One-click clear (`✕`) and filter reset.

### ⌨️ Keyboard-First Navigation
- <kbd>⌘</kbd>+<kbd>F</kbd> / <kbd>Ctrl</kbd>+<kbd>F</kbd>: Focus directory search.
- <kbd>Esc</kbd>: Blur search or close open modal.
- <kbd>←</kbd> / <kbd>→</kbd>: Step through tools sequentially inside the detail modal.
- Full keyboard operability (<kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd>) with accessible high-contrast focus rings.

### 🎠 Single-Row Category Carousel
- Smooth, auto-centering horizontal track with gradient edge-fade masks and directional chevrons.
- **13 curated categories**: Freelance Platforms, Job Boards, Startup Jobs, Remote Hubs, India Portals, Company Research, AI Tools, Cold Outreach, Portfolio, and more.

### 🔍 Deep-Inspection Modal
- Inspect platform details without losing your place or opening 15 background tabs.
- View candidate costs (`Free`, `Freemium`, `Paid`), verified community ratings, curator insider insights, and key capability bullets.
- Direct outbound links with hardened security (`target="_blank" rel="noopener noreferrer"`).

### 🔐 Upfront Authentication Badges
- Know the login requirement before you click: **Google Login**, **Username / Password**, or **SSO**.

### 🌗 Instant Dual Theme
- Seamless Dark and Light modes with automatic OS system preference sync (`prefers-color-scheme`).
- Instant $O(1)$ theme toggle with zero screen flash and `localStorage` persistence.

### 🛠️ Interactive Submission Studio (`/submit`)
- Two-column workspace: interactive form on the left with a live WYSIWYG `ToolCard` updating in real time on the right.
- Export ready-to-merge JSON for Pull Requests or submit directly via email.

---

## ⚡ Tech Stack

- **Framework**: React 19 + TypeScript (Strict Mode)
- **Bundler**: Vite
- **Icons**: Lucide React
- **Styling**: Pure CSS Design Tokens (Zero bloated UI frameworks, zero runtime CSS-in-JS)
- **Architecture**: 100% Client-side $O(1)$ lookups & $O(N)$ single-pass filtering

---

## 🏁 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/RenishBhuva07/JobStack.git
cd JobStack

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build for production
npm run build
```

---

<div align="center">

**Handcrafted for developers, freelancers, and active job hunters.**

[GitHub Repository](https://github.com/RenishBhuva07/JobStack) · [Submit a Tool](https://github.com/RenishBhuva07/JobStack/pulls) · [hello@jobstack.dev](mailto:hello@jobstack.dev)

</div>
