import { TrendingUp, Globe, ShieldCheck, Heart } from "lucide-react";
import { JobStackIcon } from "../common/JobStackLogo";
import "./Footer.css";

interface FooterProps {
  totalTools?: number;
  onNavigate?: (view: "home" | "tools", category?: string) => void;
}

export default function Footer({ totalTools = 18, onNavigate }: FooterProps) {
  const handleNav = (view: "home" | "tools", targetId?: string) => {
    onNavigate?.(view);
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand" id="footer-brand">
          <div
            className="footer__logo"
            onClick={() => handleNav("home")}
            style={{ cursor: "pointer" }}
          >
            <div className="footer__logo-icon">
              <JobStackIcon size={20} />
            </div>
            <span className="footer__logo-text">
              Job<span className="gradient-text">Stack</span>
            </span>
          </div>
          <p className="footer__tagline">
            The ultimate directory of tools that actually work for freelancers,
            remote workers, and ambitious professionals.
          </p>
          <div className="footer__badges">
            <span className="footer__badge">
              <TrendingUp size={12} className="footer__badge-icon" />
              {totalTools}+ Tools
            </span>
            <span className="footer__badge">
              <Globe size={12} className="footer__badge-icon" />
              Global Coverage
            </span>
            <span className="footer__badge">
              <ShieldCheck size={12} className="footer__badge-icon" />
              100% Free Access
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="footer__nav" id="footer-nav">
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Explore</h4>
            <ul className="footer__nav-list">
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("tools")}
                >
                  All Tools
                </button>
              </li>
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("tools")}
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("home", "featured-preview")}
                >
                  Featured
                </button>
              </li>
            </ul>
          </div>
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Categories</h4>
            <ul className="footer__nav-list">
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("tools")}
                >
                  Freelance Platforms
                </button>
              </li>
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("tools")}
                >
                  Job Boards
                </button>
              </li>
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("tools")}
                >
                  Cold Outreach
                </button>
              </li>
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("tools")}
                >
                  AI-Powered
                </button>
              </li>
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("tools")}
                >
                  Portfolio
                </button>
              </li>
            </ul>
          </div>
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">About</h4>
            <ul className="footer__nav-list">
              <li>
                <button
                  className="footer__link"
                  onClick={() => handleNav("home", "about")}
                >
                  About Us
                </button>
              </li>
              <li>
                <a href="mailto:hello@jobstack.dev" className="footer__link">
                  Submit a Tool
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="footer__link"
                  onClick={() => handleNav("home", "about")}
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} JobStack. Built with{" "}
            <Heart
              size={13}
              className="footer__heart"
              fill="#f43f5e"
              stroke="#f43f5e"
            />{" "}
            for the freelance community.
          </p>
          <p className="footer__note">
            Data updated weekly. All tools independently reviewed.
          </p>
        </div>
      </div>
    </footer>
  );
}
