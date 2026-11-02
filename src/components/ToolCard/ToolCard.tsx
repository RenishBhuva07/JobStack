import { Tag } from "lucide-react";
import type { Tool } from "../../types";
import { BrandIcon } from "./BrandLogos";
import { ToolBadge } from "../common/ToolBadge";
import "./ToolCard.css";

interface ToolCardProps {
  tool: Tool;
  index: number;
  onExplore?: (tool: Tool) => void;
}

const categoryClassMap: Record<string, string> = {
  "Freelance Platforms": "category-badge--freelance-platforms",
  "Job Boards": "category-badge--job-boards",
  "AI-Powered": "category-badge--ai-powered",
  "Cold Outreach": "category-badge--cold-outreach",
  Networking: "category-badge--networking",
  Portfolio: "category-badge--portfolio",
};

export function getCategoryBadgeClass(category: string): string {
  return categoryClassMap[category] || "category-badge--default";
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="tool-card__stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFull = star <= fullStars;
        const isHalf = star === fullStars + 1 && hasHalfStar;

        return (
          <span key={star} className="tool-card__star-wrap" aria-hidden="true">
            {isFull ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="#f59e0b"
                stroke="#f59e0b"
                strokeWidth="1.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ) : isHalf ? (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="1.5"
              >
                <path
                  fill="#f59e0b"
                  d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ) : (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="tool-card__star-empty"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
          </span>
        );
      })}
      <span className="tool-card__rating-num">{rating}</span>
    </div>
  );
}

export default function ToolCard({ tool, index, onExplore }: ToolCardProps) {
  const categoryBadgeClass = getCategoryBadgeClass(tool.category);

  return (
    <article
      className={`tool-card ${tool.featured ? "tool-card--featured" : ""}`}
      id={`tool-card-${tool.id}`}
      style={{ animationDelay: `${index * 0.04}s` }}
      onClick={() => onExplore?.(tool)}
    >
      {/* Featured top gradient accent bar */}
      {tool.featured && (
        <div className="tool-card__featured-accent" aria-hidden="true" />
      )}

      {/* Header: Logo and Badges */}
      <div className="tool-card__header">
        <div className="tool-card__logo-wrap">
          <BrandIcon name={tool.name} url={tool.url} size={48} />
        </div>

        {tool.badge && (
          <ToolBadge badge={tool.badge} id={`badge-${tool.id}`} size="sm" />
        )}
      </div>

      {/* Body: Title, Tagline, Description & Tags */}
      <div className="tool-card__body">
        <div className="tool-card__title-row">
          <h3 className="tool-card__name">{tool.name}</h3>
        </div>

        <p className="tool-card__tagline">{tool.tagline}</p>
        <p className="tool-card__description">{tool.description}</p>

        <div className="tool-card__tags">
          {tool.tags.map((tag) => (
            <span key={tag} className="tool-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Category Badge, Rating, Pricing & Actions */}
      <div className="tool-card__footer" onClick={(e) => e.stopPropagation()}>
        <div className="tool-card__meta">
          <span className={`category-badge ${categoryBadgeClass}`}>
            {tool.category}
          </span>
          <StarRating rating={tool.rating} />
        </div>

        <div className="tool-card__actions">
          <span
            className="tool-card__pricing"
            title={`Pricing: ${tool.pricing}`}
          >
            <Tag size={12} strokeWidth={2.2} />
            <span>{tool.pricing}</span>
          </span>

          <div className="tool-card__btn-group">
            <button
              type="button"
              className="tool-card__explore-btn"
              onClick={() => onExplore?.(tool)}
              title={`Explore details for ${tool.name}`}
              aria-label={`Explore ${tool.name}`}
            >
              Explore
            </button>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tool-card__visit-btn"
              title={`Visit official ${tool.name} website`}
              aria-label={`Visit ${tool.name}`}
            >
              <span>Visit</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
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
