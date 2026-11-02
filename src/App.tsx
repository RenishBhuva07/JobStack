import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ToolGrid from './components/ToolGrid/ToolGrid';
import Footer from './components/Footer/Footer';
import AllToolsPage from './components/AllToolsPage/AllToolsPage';
import { ToolDetailModal } from './components/ToolDetailModal/ToolDetailModal';
import toolsData from './data/tools.json';
import type { ToolsData, Tool } from './types';
import './App.css';

const data = toolsData as ToolsData;

const categoryIcons: Record<string, string> = {
  'Freelance Platforms': '💼',
  'Job Boards': '🎯',
  'AI-Powered': '⚡',
  'Cold Outreach': '📨',
  'Networking': '🤝',
  'Portfolio': '🎨',
};

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'tools'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTool, setActiveModalTool] = useState<Tool | null>(null);

  // Sync hash routing on mount and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/tools') || hash === '#tools' || hash === '#categories') {
        setCurrentView('tools');
        if (hash.includes('cat=')) {
          const match = hash.match(/cat=([^&]+)/);
          if (match) setSelectedCategory(decodeURIComponent(match[1]));
        }
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: 'home' | 'tools', category = 'All') => {
    setCurrentView(view);
    setSelectedCategory(category);
    if (view === 'tools') {
      window.location.hash = category !== 'All' ? `#/tools?cat=${encodeURIComponent(category)}` : '#/tools';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '#/';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const featuredTools = data.tools.filter((t) => t.featured).slice(0, 6);

  return (
    <div className="app">
      <Navbar currentView={currentView} onNavigate={navigateTo} />

      <main id="main-content">
        {currentView === 'home' ? (
          <>
            {/* Hero Section */}
            <Hero
              totalTools={data.tools.length}
              totalCategories={data.categories.length - 1}
              onBrowseTools={() => navigateTo('tools', 'All')}
              onViewCategories={() => navigateTo('tools', 'All')}
            />

            {/* Featured Tools Showcase */}
            <section id="featured-preview" className="home-featured-section">
              <div className="container">
                <div className="home-section-header">
                  <div>
                    <div className="home-section-badge">⭐ Community Highlights</div>
                    <h2 className="home-section-title">
                      Popular & <span className="gradient-text">Top Rated</span> Tools
                    </h2>
                    <p className="home-section-desc">
                      Essential platforms with verified high success rates for freelancers and job hunters.
                    </p>
                  </div>

                  <button
                    className="home-view-all-btn"
                    onClick={() => navigateTo('tools', 'All')}
                  >
                    <span>View All {data.tools.length}+ Tools</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <ToolGrid tools={featuredTools} onExplore={setActiveModalTool} />

                <div className="home-more-cta-banner">
                  <div className="home-more-cta-text">
                    <h3>Looking for more specific platforms?</h3>
                    <p>Explore tools for cold outreach, AI-assisted job applications, portfolio showcases, and global remote boards.</p>
                  </div>
                  <button
                    className="home-explore-pill-btn"
                    onClick={() => navigateTo('tools', 'All')}
                  >
                    Open All Tools Directory →
                  </button>
                </div>
              </div>
            </section>

            {/* Category Quick Browse */}
            <section id="categories-preview" className="home-categories-section">
              <div className="container">
                <div className="home-section-header center">
                  <div className="home-section-badge">📁 Categories</div>
                  <h2 className="home-section-title">
                    Browse By <span className="gradient-text">Category</span>
                  </h2>
                  <p className="home-section-desc">
                    Find targeted solutions for every step of your career and outreach workflow.
                  </p>
                </div>

                <div className="home-categories-grid">
                  {data.categories.filter((c) => c !== 'All').map((cat) => {
                    const count = data.tools.filter((t) => t.category === cat).length;
                    return (
                      <button
                        key={cat}
                        className="home-category-card"
                        onClick={() => navigateTo('tools', cat)}
                      >
                        <div className="home-category-icon-wrap">
                          {categoryIcons[cat] || '💼'}
                        </div>
                        <div className="home-category-info">
                          <h3 className="home-category-name">{cat}</h3>
                          <span className="home-category-count">{count} {count === 1 ? 'tool' : 'tools'}</span>
                        </div>
                        <div className="home-category-arrow">→</div>
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
                  <div className="about-card__orb about-card__orb--1" aria-hidden="true" />
                  <div className="about-card__orb about-card__orb--2" aria-hidden="true" />
                  <div className="about-card__content">
                    <div className="about-card__icon" aria-hidden="true">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#aboutIcon)" strokeWidth="1.5">
                        <defs>
                          <linearGradient id="aboutIcon" x1="0" y1="0" x2="1" y2="1">
                            <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#8b5cf6" />
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
                        We're constantly curating the best tools for freelancers and job seekers.
                        If you know a worthy tool we haven't listed yet, we'd love to hear about it.
                      </p>
                    </div>
                    <a href="mailto:hello@jobstack.dev" className="about-card__btn" id="about-submit-btn">
                      Submit a Tool
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Dedicated All Tools View */
          <AllToolsPage
            tools={data.tools}
            categories={data.categories}
            initialCategory={selectedCategory}
            onBackToHome={() => navigateTo('home')}
            onExploreTool={setActiveModalTool}
          />
        )}
      </main>

      <Footer totalTools={data.tools.length} onNavigate={navigateTo} />

      {/* Global Interactive One-by-One Detail Modal */}
      <ToolDetailModal
        tool={activeModalTool}
        toolsList={data.tools}
        onClose={() => setActiveModalTool(null)}
        onSelectTool={setActiveModalTool}
      />
    </div>
  );
}

export default App;
