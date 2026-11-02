import './Footer.css';

interface FooterProps {
  totalTools?: number;
  onNavigate?: (view: 'home' | 'tools', category?: string) => void;
}

export default function Footer({ totalTools = 18, onNavigate }: FooterProps) {
  const handleNav = (view: 'home' | 'tools', targetId?: string) => {
    onNavigate?.(view);
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer id="footer" className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand" id="footer-brand">
          <div className="footer__logo" onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
            <div className="footer__logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#fLogoGrad1)" />
                <path d="M2 17l10 5 10-5" stroke="url(#fLogoGrad2)" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 12l10 5 10-5" stroke="url(#fLogoGrad3)" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="fLogoGrad1" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="fLogoGrad2" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="fLogoGrad3" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
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
            <span className="footer__badge">🚀 {totalTools}+ Tools</span>
            <span className="footer__badge">🌐 Global</span>
            <span className="footer__badge">✨ 100% Free Access</span>
          </div>
        </div>

        {/* Links */}
        <div className="footer__nav" id="footer-nav">
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Explore</h4>
            <ul className="footer__nav-list">
              <li>
                <button className="footer__link" onClick={() => handleNav('tools')}>
                  All Tools
                </button>
              </li>
              <li>
                <button className="footer__link" onClick={() => handleNav('tools')}>
                  Categories
                </button>
              </li>
              <li>
                <button className="footer__link" onClick={() => handleNav('home', 'featured-preview')}>
                  Featured
                </button>
              </li>
            </ul>
          </div>
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">Categories</h4>
            <ul className="footer__nav-list">
              <li>
                <button className="footer__link" onClick={() => handleNav('tools')}>
                  Freelance Platforms
                </button>
              </li>
              <li>
                <button className="footer__link" onClick={() => handleNav('tools')}>
                  Job Boards
                </button>
              </li>
              <li>
                <button className="footer__link" onClick={() => handleNav('tools')}>
                  Cold Outreach
                </button>
              </li>
              <li>
                <button className="footer__link" onClick={() => handleNav('tools')}>
                  AI-Powered
                </button>
              </li>
              <li>
                <button className="footer__link" onClick={() => handleNav('tools')}>
                  Portfolio
                </button>
              </li>
            </ul>
          </div>
          <div className="footer__nav-group">
            <h4 className="footer__nav-title">About</h4>
            <ul className="footer__nav-list">
              <li>
                <button className="footer__link" onClick={() => handleNav('home', 'about')}>
                  About Us
                </button>
              </li>
              <li>
                <a href="mailto:hello@jobstack.dev" className="footer__link">
                  Submit a Tool
                </a>
              </li>
              <li>
                <a href="#about" className="footer__link" onClick={() => handleNav('home', 'about')}>
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
            © {new Date().getFullYear()} JobStack. Built with ❤️ for the freelance community.
          </p>
          <p className="footer__note">
            Data updated weekly. All tools independently reviewed.
          </p>
        </div>
      </div>
    </footer>
  );
}
