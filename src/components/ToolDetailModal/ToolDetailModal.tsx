import React, { useEffect } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import type { Tool } from "../../types";
import { BrandIcon } from "../ToolCard/BrandLogos";
import { ToolBadge } from "../common/ToolBadge";
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
  if (!tool) return null;

  const currentIndex = toolsList.findIndex((t) => t.id === tool.id);
  const total = toolsList.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectTool(toolsList[currentIndex - 1]);
    } else {
      // Loop to end
      onSelectTool(toolsList[total - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      onSelectTool(toolsList[currentIndex + 1]);
    } else {
      // Loop to start
      onSelectTool(toolsList[0]);
    }
  };

  useEffect(() => {
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
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [currentIndex, total]);

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
              <BrandIcon name={tool.name} size={56} />
            </div>

            <div className="tool-modal-titles">
              <div className="tool-modal-name-row">
                <h2 className="tool-modal-title">{tool.name}</h2>
                {tool.badge && <ToolBadge badge={tool.badge} size="md" />}
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

            <div className="tool-modal-meta-item">
              <span className="tool-modal-meta-label">Community Rating</span>
              <span className="tool-modal-meta-value rating-pill">
                <Star
                  size={13}
                  fill="currentColor"
                  strokeWidth={0}
                  className="modal-rating-star"
                />
                {tool.rating} / 5.0
              </span>
            </div>

            <div className="tool-modal-meta-item">
              <span className="tool-modal-meta-label">Pricing Model</span>
              <span className="tool-modal-meta-value pricing-pill">
                {tool.pricing}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="tool-modal-section">
            <h4 className="tool-modal-section-title">Overview</h4>
            <p className="tool-modal-description">{tool.description}</p>
          </div>

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

          {/* Tags */}
          <div className="tool-modal-section">
            <h4 className="tool-modal-section-title">Tags & Focus Areas</h4>
            <div className="tool-modal-tags">
              {tool.tags.map((tag) => (
                <span key={tag} className="tool-modal-tag">
                  #{tag}
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
