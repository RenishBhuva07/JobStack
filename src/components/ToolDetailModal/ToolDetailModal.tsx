import React, { useEffect, useCallback } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import type { Tool } from "../../types";
import { BrandIcon } from "../ToolCard/BrandLogos";
import { ToolBadge } from "../common/ToolBadge";
import { LoginBadge } from "../common/LoginBadge";
import "./ToolDetailModal.css";

interface ToolDetailModalProps {
  tool: Tool | null;
  toolsList: Tool[];
  onClose: () => void;
  onSelectTool: (tool: Tool) => void;
}

export const ToolDetailModal: React.FC<ToolDetailModalProps> = ({
  tool,
  toolsList,
  onClose,
  onSelectTool,
}) => {
  const isOpen = Boolean(tool);
  const total = toolsList.length;

  const handlePrev = useCallback(() => {
    if (!tool || total === 0) return;
    const currentIndex = toolsList.findIndex((t) => t.id === tool.id);
    if (currentIndex > 0) {
      onSelectTool(toolsList[currentIndex - 1]);
    } else {
      // Loop to end
      onSelectTool(toolsList[total - 1]);
    }
  }, [tool, total, toolsList, onSelectTool]);

  const handleNext = useCallback(() => {
    if (!tool || total === 0) return;
    const currentIndex = toolsList.findIndex((t) => t.id === tool.id);
    if (currentIndex < total - 1) {
      onSelectTool(toolsList[currentIndex + 1]);
    } else {
      // Loop to start
      onSelectTool(toolsList[0]);
    }
  }, [tool, total, toolsList, onSelectTool]);

  // Lock background scrolling while modal is open, and restore when closed/unmounted
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow === "hidden" ? "" : previousOverflow;
    };
  }, [isOpen]);

  // Handle keyboard navigation (Escape to close, Left/Right arrows to step)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!tool) return null;

  const currentIndex = toolsList.findIndex((t) => t.id === tool.id);

  const numericRating =
    typeof tool.rating === "number"
      ? tool.rating
      : tool.rating &&
          typeof tool.rating === "object" &&
          typeof tool.rating.value === "number"
        ? tool.rating.value
        : null;

  const ratingDetail =
    tool.rating && typeof tool.rating === "object" ? tool.rating : null;

  return (
    <div
      className="tool-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="tool-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="tool-modal-header">
          <div className="tool-modal-stepper">
            <button
              className="tool-modal-nav-btn"
              onClick={handlePrev}
              title="Previous Tool (Left Arrow)"
              aria-label="Previous Tool"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
              <span>Prev</span>
            </button>

            <span className="tool-modal-counter">
              <strong>{currentIndex + 1}</strong> of {total} tools
            </span>

            <button
              className="tool-modal-nav-btn"
              onClick={handleNext}
              title="Next Tool (Right Arrow)"
              aria-label="Next Tool"
            >
              <span>Next</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <button
            className="tool-modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            title="Close (Esc)"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="tool-modal-body">
          <div className="tool-modal-identity">
            <div className="tool-modal-logo">
              <BrandIcon name={tool.name} url={tool.url} size={56} />
            </div>

            <div className="tool-modal-titles">
              <div className="tool-modal-name-row">
                <h2 className="tool-modal-title">{tool.name}</h2>
                {tool.badge && <ToolBadge badge={tool.badge} size="md" />}
                {tool.loginType && (
                  <LoginBadge loginType={tool.loginType} size="md" />
                )}
              </div>
              <p className="tool-modal-tagline">{tool.tagline}</p>
            </div>
          </div>

          {/* Quick Meta Row */}
          <div className="tool-modal-meta-row">
            <div className="tool-modal-meta-item">
              <span className="tool-modal-meta-label">Category</span>
              <span className="tool-modal-meta-value category-pill">
                {tool.category}
              </span>
            </div>

            {tool.loginType && (
              <div className="tool-modal-meta-item">
                <span className="tool-modal-meta-label">Login Method</span>
                <span className="tool-modal-meta-value">
                  <LoginBadge loginType={tool.loginType} size="sm" />
                </span>
              </div>
            )}

            {numericRating !== null ? (
              <div className="tool-modal-meta-item">
                <span className="tool-modal-meta-label">Rating</span>
                <span className="tool-modal-meta-value rating-pill">
                  <Star
                    size={13}
                    fill="currentColor"
                    strokeWidth={0}
                    className="modal-rating-star"
                  />
                  {numericRating} / 5.0
                  {ratingDetail?.source && (
                    <span
                      style={{
                        fontSize: "11px",
                        opacity: 0.85,
                        marginLeft: "4px",
                      }}
                    >
                      ({ratingDetail.source}
                      {ratingDetail.reviews
                        ? ` · ${ratingDetail.reviews} reviews`
                        : ""}
                      )
                    </span>
                  )}
                </span>
              </div>
            ) : null}

            <div className="tool-modal-meta-item">
              <span className="tool-modal-meta-label">Pricing Model</span>
              <span className="tool-modal-meta-value pricing-pill">
                {tool.pricing}
              </span>
            </div>

            {tool.seekerCost && (
              <div className="tool-modal-meta-item">
                <span className="tool-modal-meta-label">Seeker Cost</span>
                <span
                  className="tool-modal-meta-value"
                  style={{ textTransform: "capitalize" }}
                >
                  {tool.seekerCost}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="tool-modal-section">
            <h4 className="tool-modal-section-title">Overview</h4>
            <p className="tool-modal-description">{tool.description}</p>
          </div>

          {/* Verified Notes / Insider Pro-Tip */}
          {tool.notes && (
            <div className="tool-modal-section tool-modal-notes-box">
              <h4 className="tool-modal-section-title">Verified Insight</h4>
              <p className="tool-modal-notes-text">{tool.notes}</p>
            </div>
          )}

          {/* Key Features */}
          {tool.features && tool.features.length > 0 && (
            <div className="tool-modal-section">
              <h4 className="tool-modal-section-title">
                Key Advantages & Capabilities
              </h4>
              <ul className="tool-modal-features-list">
                {tool.features.map((feat, idx) => (
                  <li key={idx} className="tool-modal-feature-item">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags & Metadata */}
          <div className="tool-modal-section">
            <h4 className="tool-modal-section-title">
              Tags & Target Audiences
            </h4>
            <div className="tool-modal-tags">
              {tool.tags.map((tag) => (
                <span key={`tag-${tag}`} className="tool-modal-tag">
                  #{tag}
                </span>
              ))}
              {tool.regions?.map((reg) => (
                <span key={`reg-${reg}`} className="tool-modal-tag">
                  🌐 {reg}
                </span>
              ))}
              {tool.audience?.map((aud) => (
                <span key={`aud-${aud}`} className="tool-modal-tag">
                  👥 {aud}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="tool-modal-footer">
          <div className="tool-modal-keyboard-hint">
            <kbd>
              <ArrowLeft
                size={10}
                style={{ display: "inline", verticalAlign: "-1px" }}
              />
            </kbd>{" "}
            <kbd>
              <ArrowRight
                size={10}
                style={{ display: "inline", verticalAlign: "-1px" }}
              />
            </kbd>{" "}
            navigate one by one &bull; <kbd>Esc</kbd> to close
          </div>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tool-modal-visit-btn"
          >
            <span>Visit {tool.name}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
