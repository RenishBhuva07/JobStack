import { useState } from "react";
import type { Tool } from "../../types";
import { BrandIcon } from "./BrandLogos";
import { ToolBadge } from "../common/ToolBadge";
import "./ToolCard.css";

interface ToolCardProps {
  tool: Tool;
  index: number;
  onExplore?: (tool: Tool) => void;
}

const categoryColors: Record<
  string,
  { bg: string; text: string; glow: string }
> = {
  "Freelance Platforms": {
    bg: "rgba(59,130,246,0.12)",
    text: "#60a5fa",
    glow: "rgba(59,130,246,0.2)",
  },
  "Job Boards": {
    bg: "rgba(16,185,129,0.12)",
    text: "#34d399",
    glow: "rgba(16,185,129,0.2)",
  },
  "AI-Powered": {
    bg: "rgba(139,92,246,0.12)",
    text: "#a78bfa",
    glow: "rgba(139,92,246,0.2)",
  },
  "Cold Outreach": {
    bg: "rgba(245,158,11,0.12)",
    text: "#fbbf24",
    glow: "rgba(245,158,11,0.2)",
  },
  Networking: {
    bg: "rgba(6,182,212,0.12)",
    text: "#22d3ee",
    glow: "rgba(6,182,212,0.2)",
  },
  Portfolio: {
    bg: "rgba(244,63,94,0.12)",
    text: "#fb7185",
    glow: "rgba(244,63,94,0.2)",
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="tool-card__stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={
            star <= Math.floor(rating)
              ? "#f59e0b"
              : star - 0.5 <= rating
                ? "url(#halfStar)"
                : "none"
          }
          stroke="#f59e0b"
          strokeWidth="1.5"
          className="tool-card__star"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="tool-card__rating-num">{rating}</span>
    </div>
  );
}

export default function ToolCard({ tool, index, onExplore }: ToolCardProps) {
  const [imgError, setImgError] = useState(false);
  const colors = categoryColors[tool.category] || {
    bg: "rgba(99,102,241,0.12)",
    text: "#818cf8",
    glow: "rgba(99,102,241,0.2)",
  };

  return (
    <article
      className={`tool-card ${tool.featured ? "tool-card--featured" : ""}`}
      id={`tool-card-${tool.id}`}
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={() => onExplore?.(tool)}
    >
      {/* Featured glow border */}
      {tool.featured && (
        <div className="tool-card__featured-border" aria-hidden="true" />
      )}

      {/* Header */}
      <div className="tool-card__header">
        {/* Logo */}
        <div className="tool-card__logo-wrap">
          {!imgError ? (
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="tool-card__logo"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <BrandIcon name={tool.name} size={48} />
          )}
        </div>

        {/* Badge */}
        {tool.badge && (
          <ToolBadge badge={tool.badge} id={`badge-${tool.id}`} size="sm" />
        )}
      </div>

      {/* Body */}
      <div className="tool-card__body">
        <div className="tool-card__title-row">
          <h3 className="tool-card__name">{tool.name}</h3>
        </div>

        <p className="tool-card__tagline">{tool.tagline}</p>
        <p className="tool-card__description">{tool.description}</p>

        {/* Tags */}
        <div className="tool-card__tags">
          {tool.tags.map((tag) => (
            <span key={tag} className="tool-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="tool-card__footer" onClick={(e) => e.stopPropagation()}>
        {/* Category + Rating */}
        <div className="tool-card__meta">
          <span
            className="tool-card__category"
            style={{ background: colors.bg, color: colors.text }}
          >
            {tool.category}
          </span>
          <StarRating rating={tool.rating} />
        </div>

        {/* Pricing + Actions */}
        <div className="tool-card__actions">
          <span className="tool-card__pricing">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            {tool.pricing}
          </span>

          <div className="tool-card__btn-group">
            <button
              type="button"
              className="tool-card__explore-btn"
              onClick={(e) => {
                e.stopPropagation();
                onExplore?.(tool);
              }}
              aria-label={`Explore ${tool.name} details`}
            >
              Explore
            </button>

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-card__visit-btn"
              id={`visit-${tool.id}`}
              aria-label={`Visit ${tool.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              Visit
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
