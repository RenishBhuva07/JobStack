import { useState, useMemo } from "react";
import { X, Search, ArrowRight } from "lucide-react";
import type { Tool } from "../../types";
import ToolGrid from "../ToolGrid/ToolGrid";
import { CategoryIcon } from "../common/CategoryIcon";
import "./AllToolsPage.css";

interface AllToolsPageProps {
  tools: Tool[];
  categories: string[];
  initialCategory?: string;
  onBackToHome: () => void;
  onExploreTool: (tool: Tool) => void;
}

const categoryDescriptions: Record<string, string> = {
  "Freelance Platforms":
    "Top marketplaces and vetted networks to find client projects and contracts.",
  "Job Boards":
    "Premier portals and aggregators for remote, tech, and corporate opportunities.",
  "AI-Powered": "AI tools to accelerate your applications and outreach.",
  "Cold Outreach": "Direct contact databases and email intelligence tools.",
  Networking: "Communities and social platforms to build personal branding.",
  Portfolio: "Showcase hubs to display your code, design, and case studies.",
};

export default function AllToolsPage({
  tools,
  categories,
  initialCategory = "All",
  onExploreTool,
}: AllToolsPageProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"sections" | "grid">("sections");

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery("");
    const targetUrl =
      cat !== "All" ? `/tools?cat=${encodeURIComponent(cat)}` : "/tools";
    window.history.replaceState(null, "", targetUrl);
  };

  const [prevInitialCategory, setPrevInitialCategory] = useState(initialCategory);
  if (prevInitialCategory !== initialCategory) {
    setPrevInitialCategory(initialCategory);
    setActiveCategory(initialCategory);
  }

  // Pre-indexed category counts for constant-time O(1) lookups
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: tools.length };
    for (let i = 0; i < tools.length; i++) {
      const cat = tools[i].category;
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, [tools]);

  // Only show categories that have at least 1 tool (avoids showing empty categories like "Networking 0")
  const availableCategories = useMemo(() => {
    return categories.filter((cat) => {
      if (cat === "All") return true;
      return (categoryCounts[cat] || 0) > 0;
    });
  }, [categories, categoryCounts]);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [tools, activeCategory, searchQuery]);

  // Group filtered tools by category for sections view
  const toolsByCategory = useMemo(() => {
    const realCategories = availableCategories.filter((c) => c !== "All");
    const grouped: Record<string, Tool[]> = {};

    realCategories.forEach((cat) => {
      grouped[cat] = [];
    });

    filteredTools.forEach((tool) => {
      if (!grouped[tool.category]) {
        grouped[tool.category] = [];
      }
      grouped[tool.category].push(tool);
    });

    return grouped;
  }, [availableCategories, filteredTools]);

  const activeCategoriesWithTools = useMemo(() => {
    return Object.keys(toolsByCategory).filter(
      (cat) => toolsByCategory[cat].length > 0,
    );
  }, [toolsByCategory]);

  return (
    <div className="all-tools-page" id="all-tools-page">
      {/* Compact Page Header with Title and Right-Side Stats */}
      <div className="all-tools-page__hero">
        <div className="container all-tools-page__hero-inner">
          <div className="all-tools-page__title-row">
            <h1 className="all-tools-page__title">
              Explore All <span className="gradient-text">Job Tools</span>
            </h1>
            <span className="all-tools-page__stats-subtitle">
              <strong>{tools.length} tools</strong> handpicked across{" "}
              <strong>{availableCategories.length - 1} categories</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Slim Single-Row Compact Sticky Toolbar */}
      <div className="all-tools-page__toolbar">
        <div className="container all-tools-page__toolbar-inner">
          {/* Search Box */}
          <div className="all-tools-page__search-wrap">
            <svg
              className="all-tools-page__search-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="all-tools-page__search-input"
              placeholder="Search tools, platforms, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search tools"
            />
            {searchQuery && (
              <button
                className="all-tools-page__search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Inline Category Pills */}
          <div className="all-tools-page__category-tabs">
            {availableCategories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  className={`all-tools-page__cat-tab ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => handleSelectCategory(cat)}
                >
                  <span className="all-tools-page__tab-icon">
                    <CategoryIcon category={cat} size={13} />
                  </span>
                  <span>{cat}</span>
                  <span className="all-tools-page__tab-badge">{count}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher (available when viewing All) */}
          {activeCategory === "All" && !searchQuery && (
            <div className="all-tools-page__view-toggle">
              <button
                className={`all-tools-page__toggle-btn ${viewMode === "sections" ? "active" : ""}`}
                onClick={() => setViewMode("sections")}
                title="View categorized sections"
                aria-label="Sections view"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="6" rx="2" />
                  <rect x="3" y="14" width="18" height="6" rx="2" />
                </svg>
                <span>Sections</span>
              </button>
              <button
                className={`all-tools-page__toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="View unified grid"
                aria-label="Grid view"
              >
                <svg
                  width="14"
                  height="14"
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
                <span>Grid</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container all-tools-page__content">
        {filteredTools.length === 0 ? (
          <div className="all-tools-page__empty">
            <div className="all-tools-page__empty-icon">
              <Search size={32} strokeWidth={1.5} />
            </div>
            <h3>No tools match your criteria</h3>
            <p>
              Try searching for a different keyword or resetting your category
              filter.
            </p>
            <button
              className="all-tools-page__reset-btn"
              onClick={() => handleSelectCategory("All")}
            >
              Reset Filters
            </button>
          </div>
        ) : activeCategory === "All" &&
          viewMode === "sections" &&
          !searchQuery ? (
          /* SECTIONED CATEGORY LISTING FOR 'ALL' */
          <div className="all-tools-page__sections-wrap">
            {activeCategoriesWithTools.map((categoryName) => {
              const catTools = toolsByCategory[categoryName];
              const sectionId = `cat-section-${categoryName.toLowerCase().replace(/\s+/g, "-")}`;

              return (
                <section
                  key={categoryName}
                  id={sectionId}
                  className="all-tools-page__cat-section"
                >
                  <div className="all-tools-page__cat-header">
                    <div className="all-tools-page__cat-header-left">
                      <span className="all-tools-page__cat-icon">
                        <CategoryIcon category={categoryName} size={15} />
                      </span>
                      <h2 className="all-tools-page__cat-title">
                        {categoryName}
                      </h2>
                      <span className="all-tools-page__cat-count">
                        {catTools.length}
                      </span>
                      <span className="all-tools-page__cat-divider">
                        &bull;
                      </span>
                      <p className="all-tools-page__cat-desc">
                        {categoryDescriptions[categoryName] ||
                          "Explore tools in this category."}
                      </p>
                    </div>

                    <button
                      className="all-tools-page__cat-filter-btn"
                      onClick={() => handleSelectCategory(categoryName)}
                      title={`Filter to only ${categoryName}`}
                    >
                      <span>Filter {categoryName}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <ToolGrid tools={catTools} onExplore={onExploreTool} />
                </section>
              );
            })}
          </div>
        ) : activeCategory !== "All" ? (
          /* SPECIFIC CATEGORY SELECTED -> DISPLAY WITH SECTION TITLE BAR */
          <section className="all-tools-page__cat-section">
            <div className="all-tools-page__cat-header">
              <div className="all-tools-page__cat-header-left">
                <span className="all-tools-page__cat-icon">
                  <CategoryIcon category={activeCategory} size={15} />
                </span>
                <h2 className="all-tools-page__cat-title">{activeCategory}</h2>
                <span className="all-tools-page__cat-count">
                  {filteredTools.length}
                </span>
                <span className="all-tools-page__cat-divider">&bull;</span>
                <p className="all-tools-page__cat-desc">
                  {categoryDescriptions[activeCategory] ||
                    "Explore tools in this category."}
                </p>
              </div>

              <button
                className="all-tools-page__cat-filter-btn"
                onClick={() => handleSelectCategory("All")}
                title="View All Categories"
              >
                <span>View All Categories</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <ToolGrid tools={filteredTools} onExplore={onExploreTool} />
          </section>
        ) : (
          /* UNIFIED GRID FOR SEARCH / ALL */
          <div className="all-tools-page__flat-wrap">
            <div className="all-tools-page__meta-bar">
              <span className="all-tools-page__meta-count">
                Showing <strong>{filteredTools.length}</strong>{" "}
                {filteredTools.length === 1 ? "tool" : "tools"}
                {searchQuery ? ` matching "${searchQuery}"` : ""}
              </span>
              {searchQuery && (
                <button
                  className="all-tools-page__clear-link"
                  onClick={() => setSearchQuery("")}
                >
                  Clear search
                </button>
              )}
            </div>

            <ToolGrid tools={filteredTools} onExplore={onExploreTool} />
          </div>
        )}
      </div>
    </div>
  );
}
