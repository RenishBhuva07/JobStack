import type { Tool } from '../../types';
import ToolCard from '../ToolCard/ToolCard';
import './ToolGrid.css';

interface ToolGridProps {
  tools: Tool[];
  loading?: boolean;
  onExplore?: (tool: Tool) => void;
}

function EmptyState() {
  return (
    <div className="tool-grid__empty" id="empty-state">
      <div className="tool-grid__empty-icon" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </div>
      <h3>No tools found</h3>
      <p>Try adjusting your search or filter to find what you're looking for.</p>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="tool-card tool-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--logo" />
      <div className="skeleton skeleton--title" />
      <div className="skeleton skeleton--line" />
      <div className="skeleton skeleton--line skeleton--line-short" />
      <div className="skeleton skeleton--tags">
        <div className="skeleton skeleton--tag" />
        <div className="skeleton skeleton--tag" />
      </div>
    </div>
  );
}

export default function ToolGrid({ tools, loading = false, onExplore }: ToolGridProps) {
  if (loading) {
    return (
      <div className="tool-grid" id="tools-grid-loading">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="tool-grid" id="tools-grid" role="list">
      {tools.map((tool, index) => (
        <div key={tool.id} role="listitem">
          <ToolCard tool={tool} index={index} onExplore={onExplore} />
        </div>
      ))}
    </div>
  );
}
