import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { JobStackLogo } from "../common/JobStackLogo";
import { ThemeToggle } from "../common/ThemeToggle";
import "./Navbar.css";

interface NavbarProps {
  currentView: "home" | "tools" | "submit";
  onNavigate: (view: "home" | "tools" | "submit", category?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view: "home" | "tools" | "submit", hash?: string) => {
    setMenuOpen(false);
    onNavigate(view);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav id="navbar" className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <JobStackLogo
          size="md"
          id="nav-logo"
          onClick={() => handleNavClick("home")}
        />

        {/* Desktop Nav */}
        <ul className="navbar__links" id="nav-links">
          <li>
            <button
              className={`navbar__link ${currentView === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home")}
              aria-current={currentView === "home" ? "page" : undefined}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`navbar__link ${currentView === "tools" ? "active" : ""}`}
              id="nav-tools"
              onClick={() => handleNavClick("tools")}
              aria-current={currentView === "tools" ? "page" : undefined}
            >
              Browse All Tools
            </button>
          </li>
          <li>
            <button
              className="navbar__link"
              id="nav-about"
              onClick={() => handleNavClick("home", "about")}
            >
              About
            </button>
          </li>
        </ul>

        <div className="navbar__actions">
          <ThemeToggle id="nav-theme-toggle" />
          <button
            className="navbar__cta"
            id="nav-cta"
            onClick={() => handleNavClick("tools")}
          >
            <span>Explore Tools</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
          id="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu" id="mobile-menu">
          <button
            className={currentView === "home" ? "active" : ""}
            onClick={() => handleNavClick("home")}
            aria-current={currentView === "home" ? "page" : undefined}
          >
            Home
          </button>
          <button
            className={currentView === "tools" ? "active" : ""}
            onClick={() => handleNavClick("tools")}
            aria-current={currentView === "tools" ? "page" : undefined}
          >
            Browse All Tools
          </button>
          <button onClick={() => handleNavClick("home", "about")}>About</button>
          <div className="navbar__mobile-theme">
            <ThemeToggle showLabel id="mobile-nav-theme-toggle" />
          </div>
        </div>
      )}
    </nav>
  );
}
