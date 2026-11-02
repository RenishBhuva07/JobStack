import React from "react";
import {
  Flame,
  Crown,
  CheckCircle2,
  Trophy,
  Award,
  BadgePercent,
  Code2,
  Blocks,
  Palette,
  Bot,
  Terminal,
  Sparkles,
} from "lucide-react";

interface ToolBadgeProps {
  badge: string;
  className?: string;
  id?: string;
  size?: "sm" | "md";
}

function getBadgeIcon(badgeText: string, iconSize: number) {
  const normalized = badgeText.toLowerCase().replace(/[^a-z0-9]/g, " ");

  if (normalized.includes("popular")) {
    return (
      <Flame size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("elite")) {
    return (
      <Crown size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("must have") || normalized.includes("must-have")) {
    return (
      <CheckCircle2
        size={iconSize}
        className="tool-badge-icon"
        strokeWidth={2.2}
      />
    );
  }
  if (normalized.includes("global")) {
    return (
      <Trophy size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("top job") || normalized.includes("portal")) {
    return (
      <Award size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("commission")) {
    return (
      <BadgePercent
        size={iconSize}
        className="tool-badge-icon"
        strokeWidth={2.2}
      />
    );
  }
  if (normalized.includes("dev focused")) {
    return (
      <Code2 size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("web3")) {
    return (
      <Blocks size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("designer")) {
    return (
      <Palette size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("ai")) {
    return (
      <Bot size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }
  if (normalized.includes("essential")) {
    return (
      <Terminal size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
    );
  }

  return (
    <Sparkles size={iconSize} className="tool-badge-icon" strokeWidth={2.2} />
  );
}

export const ToolBadge: React.FC<ToolBadgeProps> = ({
  badge,
  className = "",
  id,
  size = "sm",
}) => {
  if (!badge) return null;

  // Strip any accidental emojis if present in legacy strings
  const cleanText = badge
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}\u{2300}-\u{23FF}\u{2B50}\u{1F900}-\u{1F9FF}\u{200D}\u{FE0F}]/gu,
      "",
    )
    .trim();

  const iconSize = size === "md" ? 13 : 11;

  return (
    <div id={id} className={`tool-card__badge ${className}`}>
      {getBadgeIcon(cleanText, iconSize)}
      <span>{cleanText}</span>
    </div>
  );
};

export default ToolBadge;
