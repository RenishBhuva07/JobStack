import "./Hero.css";

interface HeroProps {
  totalTools: number;
  totalCategories: number;
  onBrowseTools: () => void;
  onViewCategories: () => void;
}

export default function Hero({
  totalTools,
  totalCategories,
  onBrowseTools,
  onViewCategories,
}: HeroProps) {
  return (
    <section id="hero" className="hero">
      {/* Background Grid */}
      <div className="hero__grid-bg" aria-hidden="true">
        <div className="hero__grid-lines" />
        <div className="hero__grid-radial" />
      </div>

      {/* Floating orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />

      <div className="container hero__content">
        {/* Announcement pill */}
        <div
          className="hero__pill"
          id="hero-announcement"
          onClick={onBrowseTools}
          style={{ cursor: "pointer" }}
        >
          <span className="hero__pill-dot" />
          <span>Handpicked collection of {totalTools}+ professional tools</span>
        </div>

        <h1 className="hero__title" id="hero-title">
          Find Your Next <span className="gradient-text">Client</span> or{" "}
          <span className="gradient-text">Job</span>
        </h1>

        <p className="hero__description" id="hero-description">
          The ultimate directory of tools that actually work. Discover
          platforms, outreach tools, and job boards — all handpicked and rated
          by the community to help you land more clients and better
          opportunities.
        </p>

        {/* CTA Buttons */}
        <div className="hero__actions" id="hero-actions">
          <button
            onClick={onBrowseTools}
            className="hero__btn hero__btn--primary"
            id="hero-cta-primary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            Browse All Tools
          </button>
          <button
            onClick={onViewCategories}
            className="hero__btn hero__btn--secondary"
            id="hero-cta-secondary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            View Categories
          </button>
        </div>

        {/* Stats */}
        <div className="hero__stats" id="hero-stats">
          <div className="hero__stat">
            <span className="hero__stat-value gradient-text">
              {totalTools}+
            </span>
            <span className="hero__stat-label">Tools Listed</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value gradient-text">
              {totalCategories}
            </span>
            <span className="hero__stat-label">Categories</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value gradient-text">100%</span>
            <span className="hero__stat-label">Free Access</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value gradient-text">Weekly</span>
            <span className="hero__stat-label">Updates</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
