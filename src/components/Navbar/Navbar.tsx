import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { JobStackIcon } from "../common/JobStackLogo";
import "./Navbar.css";

interface NavbarProps {
  currentView: "home" | "tools";
  onNavigate: (view: "home" | "tools", category?: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view: "home" | "tools", hash?: string) => {
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
        <button
          className="navbar__logo"
          id="nav-logo"
          onClick={() => handleNavClick("home")}
          aria-label="JobStack Home"
        >
          <div className="navbar__logo-icon">
            <JobStackIcon size={22} />
          </div>
          <span className="navbar__logo-text">
            Job<span className="gradient-text">Stack</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <ul className="navbar__links" id="nav-links">
          <li>
            <button
              className={`navbar__link ${currentView === "home" ? "active" : ""}`}
              onClick={() => handleNavClick("home")}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`navbar__link ${currentView === "tools" ? "active" : ""}`}
              id="nav-tools"
              onClick={() => handleNavClick("tools")}
            >
              Browse All Tools
            </button>
          </li>
          <li>
            <button
              className="navbar__link"
              id="nav-categories"
              onClick={() => handleNavClick("tools")}
            >
              Categories
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
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu" id="mobile-menu">
          <button onClick={() => handleNavClick("home")}>Home</button>
          <button onClick={() => handleNavClick("tools")}>
            Browse All Tools
          </button>
          <button onClick={() => handleNavClick("tools")}>Categories</button>
          <button onClick={() => handleNavClick("home", "about")}>About</button>
        </div>
      )}
    </nav>
  );
}
