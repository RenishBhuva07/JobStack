import {
  ArrowUp,
  Mail,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { JobStackLogo } from "../common/JobStackLogo";
import "./Footer.css";

interface FooterProps {
  totalTools?: number;
  onNavigate?: (view: "home" | "tools" | "submit", category?: string) => void;
}

export default function Footer({
  totalTools = 26,
  onNavigate,
}: FooterProps) {
  const handleNav = (
    view: "home" | "tools" | "submit",
    targetId?: string,
    category = "All",
  ) => {
    onNavigate?.(view, category);
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer__glow" aria-hidden="true" />

      <div className="container">
        {/* Main Footer Sitemap Grid */}
        <div className="footer__inner">
          {/* Column 1: Brand & Community Identity */}
          <div className="footer__brand">
            <JobStackLogo
              size="md"
              onClick={() => handleNav("home")}
              className="footer__logo-btn"
            />
            <p className="footer__tagline">
              The ultimate high-signal directory of vetted platforms, job
              boards, and freelance marketplaces helping talent land better
              opportunities.
            </p>

            <div className="footer__status-card">
              <span className="footer__live-dot" aria-hidden="true" />
              <div className="footer__status-text">
                <strong>{totalTools} Platforms Live</strong>
                <span>100% Free • Updated Weekly</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="footer__socials">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="JobStack on GitHub"
                title="GitHub"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="JobStack on X (formerly Twitter)"
                title="X / Twitter"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="JobStack on LinkedIn"
                title="LinkedIn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              <a
                href="mailto:hello@jobstack.dev"
                className="footer__social-btn"
                aria-label="Email JobStack Curators"
                title="Email hello@jobstack.dev"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore Directory */}
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Explore Directory</h4>
            <ul className="footer__nav-list">
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("tools", undefined, "All")}
                >
                  Browse All {totalTools} Tools
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("home", "featured-preview")}
                >
                  Community Highlights
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("tools", undefined, "All")}
                >
                  Sectioned Directory View
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("home", "categories-preview")}
                >
                  Category Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link footer__link--accent"
                  onClick={() => handleNav("submit")}
                >
                  Submit a New Platform →
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Category Filters */}
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Categories</h4>
            <ul className="footer__nav-list">
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("tools", undefined, "Job Boards")}
                >
                  <span>Job Boards</span>
                  <span className="footer__link-pill">18</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() =>
                    handleNav("tools", undefined, "Freelance Platforms")
                  }
                >
                  <span>Freelance Platforms</span>
                  <span className="footer__link-pill">6</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("tools", undefined, "Portfolio")}
                >
                  <span>Portfolio Platforms</span>
                  <span className="footer__link-pill">2</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link footer__link--accent"
                  onClick={() => handleNav("tools", undefined, "All")}
                >
                  <span>View All Categories →</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Curated Highlights */}
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Curated Portals</h4>
            <ul className="footer__nav-list">
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("tools", undefined, "Job Boards")}
                >
                  Global Remote Tech Portals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() =>
                    handleNav("tools", undefined, "Freelance Platforms")
                  }
                >
                  Elite Developer Marketplaces
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("tools", undefined, "Job Boards")}
                >
                  Direct Startup & YC Jobs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("tools", undefined, "Portfolio")}
                >
                  Designer & Creator Showcases
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: About & Transparency */}
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Transparency</h4>
            <ul className="footer__nav-list">
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("home", "about")}
                >
                  About JobStack
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("home", "about")}
                >
                  Curation Guidelines
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="footer__link"
                  onClick={() => handleNav("submit")}
                >
                  Submit a Tool
                </button>
              </li>
              <li>
                <span className="footer__trust-badge">
                  <ShieldCheck size={13} />
                  <span>Zero Sponsored Bias</span>
                </span>
              </li>
              <li>
                <span className="footer__trust-badge">
                  <TrendingUp size={13} />
                  <span>Updated Weekly</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright, Status & Back to Top */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} JobStack. Handcrafted for ambitious
            freelancers, software engineers, and remote builders worldwide.
          </p>

          <div className="footer__bottom-right">
            <span className="footer__health-tag">
              <span className="footer__health-dot" />
              <span>All 26 Platforms Operational</span>
            </span>

            <button
              type="button"
              className="footer__back-to-top-btn"
              onClick={scrollToTop}
              title="Back to Top"
              aria-label="Scroll back to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
