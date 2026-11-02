import React from "react";
import "./JobStackLogo.css";

interface JobStackIconProps {
  size?: number;
  className?: string;
}

export const JobStackIcon: React.FC<JobStackIconProps> = ({
  size = 28,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`jobstack-icon-svg ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Top Plate Face */}
        <linearGradient
          id="jsTopGrad"
          x1="5"
          y1="3"
          x2="27"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        {/* Top Plate Left Bevel */}
        <linearGradient
          id="jsTopLeftBevel"
          x1="5"
          y1="9"
          x2="16"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Top Plate Right Bevel */}
        <linearGradient
          id="jsTopRightBevel"
          x1="16"
          y1="11"
          x2="27"
          y2="17"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#5b21b6" />
        </linearGradient>

        {/* Middle Tier Stroke */}
        <linearGradient
          id="jsMidGrad"
          x1="6"
          y1="16"
          x2="26"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.95" />
        </linearGradient>

        {/* Bottom Tier Stroke */}
        <linearGradient
          id="jsBotGrad"
          x1="6"
          y1="22"
          x2="26"
          y2="27"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#818cf8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Tier 3 (Foundation Platform) */}
      <path
        d="M6 22.5 L16 27.5 L26 22.5"
        stroke="url(#jsBotGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tier 2 (Middle Acceleration Tier) */}
      <path
        d="M6 16.5 L16 21.5 L26 16.5"
        stroke="url(#jsMidGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tier 1 Bevel Sides (Depth) */}
      <path
        d="M5.5 9.5 L16 14.8 L16 17 L5.5 11.7 Z"
        fill="url(#jsTopLeftBevel)"
      />
      <path
        d="M16 14.8 L26.5 9.5 L26.5 11.7 L16 17 Z"
        fill="url(#jsTopRightBevel)"
      />

      {/* Tier 1 Face (Summit Diamond Plate) */}
      <path
        d="M16 4.2 L26.5 9.5 L16 14.8 L5.5 9.5 Z"
        fill="url(#jsTopGrad)"
      />

      {/* Specular Edge Highlight */}
      <path
        d="M6.5 9.5 L16 4.8 L25.5 9.5"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.45"
        strokeLinecap="round"
      />

      {/* Core Summit Spark Node */}
      <circle cx="16" cy="9.5" r="1.6" fill="#ffffff" />
      <circle cx="16" cy="9.5" r="3.2" fill="#38bdf8" fillOpacity="0.35" />
    </svg>
  );
};

interface JobStackLogoProps {
  size?: "sm" | "md" | "lg";
  iconSize?: number;
  fontSize?: string;
  showText?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const JobStackLogo: React.FC<JobStackLogoProps> = ({
  size = "md",
  iconSize,
  fontSize,
  showText = true,
  className = "",
  onClick,
  id,
}) => {
  const calculatedIconSize =
    iconSize || (size === "sm" ? 18 : size === "lg" ? 28 : 22);

  return (
    <button
      type="button"
      id={id}
      className={`jobstack-brand-logo jobstack-brand-logo--${size} ${className}`}
      onClick={onClick}
      aria-label="JobStack - Return to Home"
    >
      <div className="jobstack-logo__icon-wrap">
        <JobStackIcon size={calculatedIconSize} />
      </div>
      {showText && (
        <span
          className="jobstack-logo__text"
          style={fontSize ? { fontSize } : undefined}
        >
          Job<span className="jobstack-logo__text-gradient">Stack</span>
        </span>
      )}
    </button>
  );
};

export default JobStackLogo;
