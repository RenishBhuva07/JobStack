import { useState, useEffect, useCallback } from "react";
import { Sparkles, Layers, ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import ToolGrid from "./components/ToolGrid/ToolGrid";
import Footer from "./components/Footer/Footer";
import AllToolsPage from "./components/AllToolsPage/AllToolsPage";
import SubmitToolPage from "./components/SubmitToolPage/SubmitToolPage";
import { ToolDetailModal } from "./components/ToolDetailModal/ToolDetailModal";
import { CategoryIcon } from "./components/common/CategoryIcon";
import toolsData from "./data/new_tools.json";
import type { ToolsData, Tool } from "./types";
import "./App.css";

const data = toolsData as ToolsData;

type View = "home" | "tools" | "submit";

function parseLocation(): { view: View; category: string } {
  if (typeof window === "undefined") return { view: "home", category: "All" };

  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const search = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  if (path === "/tools" || hash.startsWith("#/tools")) {
    const cat = search.get("cat") || hash.match(/cat=([^&]+)/)?.[1];
    return { view: "tools", category: cat ? decodeURIComponent(cat) : "All" };
  }
  if (path === "/submit" || hash.startsWith("#/submit")) {
    return { view: "submit", category: "All" };
  }
  return { view: "home", category: "All" };
}

function getRouteUrl(view: View, category = "All"): string {
  if (view === "tools") {
    return category !== "All"
      ? `/tools?cat=${encodeURIComponent(category)}`
      : "/tools";
  }
  return view === "submit" ? "/submit" : "/";
}

function App() {
  const [{ view, category }, setRoute] = useState(parseLocation);
  const [activeModalTool, setActiveModalTool] = useState<Tool | null>(null);

  const handleCloseModal = useCallback(() => {
    setActiveModalTool(null);
  }, []);

  // Sync route on browser Back/Forward (popstate) & clean legacy hash URLs
  useEffect(() => {
    if (window.location.hash.startsWith("#/")) {
      const current = parseLocation();
      window.history.replaceState(
        null,
        "",
        getRouteUrl(current.view, current.category),
      );
    }

    const onPopState = () => setRoute(parseLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateTo = useCallback((newView: View, newCategory = "All") => {
    const targetUrl = getRouteUrl(newView, newCategory);
    const currentUrl =
      (window.location.pathname.replace(/\/+$/, "") || "/") +
      window.location.search;

    if (currentUrl !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
    setRoute({ view: newView, category: newCategory });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const featuredTools = data.tools.filter((t) => t.featured).slice(0, 6);

  return (
    <div className="app">
      <Navbar currentView={view} onNavigate={navigateTo} />

      <main id="main-content">
        {view === "home" ? (
          <>
            {/* Hero Section */}
            <Hero
              totalTools={data.tools.length}
              totalCategories={data.categories.length - 1}
              onBrowseTools={() => navigateTo("tools", "All")}
              onViewCategories={() => {
                const el = document.getElementById("categories-preview");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  navigateTo("tools", "All");
                }
              }}
            />

            {/* Featured Tools Showcase */}
            <section id="featured-preview" className="home-featured-section">
              <div className="container">
                <div className="home-section-header">
                  <div>
                    <div className="home-section-badge">
                      <Sparkles size={12} className="home-section-badge-icon" />
                      <span>Community Highlights</span>
                    </div>
                    <h2 className="home-section-title">
                      Popular & <span className="gradient-text">Top Rated</span>{" "}
                      Tools
                    </h2>
                    <p className="home-section-desc">
                      Essential platforms with verified high success rates for
                      freelancers and job hunters.
                    </p>
                  </div>

                  <button
                    className="home-view-all-btn"
                    onClick={() => navigateTo("tools", "All")}
                  >
                    <span>View All {data.tools.length}+ Tools</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                <ToolGrid
                  tools={featuredTools}
                  onExplore={setActiveModalTool}
                />

                <div className="home-more-cta-banner">
                  <div className="home-more-cta-text">
                    <h3>Looking for more specific platforms?</h3>
                    <p>
                      Explore tools for cold outreach, AI-assisted job
                      applications, portfolio showcases, and global remote
                      boards.
                    </p>
                  </div>
                  <button
                    className="home-explore-pill-btn"
                    onClick={() => navigateTo("tools", "All")}
                  >
                    <span>Open All Tools Directory</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </section>

            {/* Category Quick Browse */}
            <section
              id="categories-preview"
              className="home-categories-section"
            >
              <div className="container">
                <div className="home-section-header center">
                  <div className="home-section-badge">
                    <Layers size={12} className="home-section-badge-icon" />
                    <span>Categories</span>
                  </div>
                  <h2 className="home-section-title">
                    Browse By <span className="gradient-text">Category</span>
                  </h2>
                  <p className="home-section-desc">
                    Find targeted solutions for every step of your career and
                    outreach workflow.
                  </p>
                </div>

                <div className="home-categories-grid">
                  {data.categories
                    .filter((c) => c !== "All")
                    .map((cat) => {
                      const count = data.tools.filter(
                        (t) => t.category === cat,
                      ).length;
                      return (
                        <button
                          key={cat}
                          className="home-category-card"
                          onClick={() => navigateTo("tools", cat)}
                        >
                          <div className="home-category-icon-wrap">
                            <CategoryIcon category={cat} size={22} />
                          </div>
                          <div className="home-category-info">
                            <h3 className="home-category-name">{cat}</h3>
                            <span className="home-category-count">
                              {count} {count === 1 ? "tool" : "tools"}
                            </span>
                          </div>
                          <div className="home-category-arrow">
                            <ArrowRight size={16} />
                          </div>
                        </button>
                      );
                    })}
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
              <div className="container">
                <div className="about-card">
                  <div
                    className="about-card__orb about-card__orb--1"
                    aria-hidden="true"
                  />
                  <div
                    className="about-card__orb about-card__orb--2"
                    aria-hidden="true"
                  />
                  <div className="about-card__content">
                    <div className="about-card__icon" aria-hidden="true">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="url(#aboutIcon)"
                        strokeWidth="1.5"
                      >
                        <defs>
                          <linearGradient
                            id="aboutIcon"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                          >
                            <stop stopColor="#3b82f6" />
                            <stop offset="1" stopColor="#8b5cf6" />
                          </linearGradient>
                        </defs>
                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="about-card__text">
                      <h2 className="about-card__title">
                        Know a tool that should be here?
                      </h2>
                      <p className="about-card__desc">
                        We're constantly curating the best tools for freelancers
                        and job seekers. If you know a worthy tool we haven't
                        listed yet, we'd love to hear about it.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateTo("submit")}
                      className="about-card__btn"
                      id="about-submit-btn"
                    >
                      <span>Submit a Tool</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : view === "tools" ? (
          /* Dedicated All Tools View */
          <AllToolsPage
            tools={data.tools}
            categories={data.categories}
            initialCategory={category}
            onBackToHome={() => navigateTo("home")}
            onExploreTool={setActiveModalTool}
          />
        ) : (
          /* Dedicated Tool Submission View */
          <SubmitToolPage
            categories={data.categories}
            onNavigateToTools={() => navigateTo("tools")}
          />
        )}
      </main>

      <Footer totalTools={data.tools.length} onNavigate={navigateTo} />

      {/* Global Interactive One-by-One Detail Modal */}
      {activeModalTool && (
        <ToolDetailModal
          tool={activeModalTool}
          toolsList={data.tools}
          onClose={handleCloseModal}
          onSelectTool={setActiveModalTool}
        />
      )}
    </div>
  );
}

export default App;
