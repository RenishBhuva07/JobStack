import React from "react";

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
      className={className}
    >
      <defs>
        <linearGradient id="jsIconTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="jsIconMid" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="jsIconBot" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>

      {/* Layer 3: Bottom Foundation */}
      <path
        d="M6 21.5 L16 26.5 L26 21.5"
        stroke="url(#jsIconBot)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 2: Middle Tier */}
      <path
        d="M6 16.5 L16 21.5 L26 16.5"
        stroke="url(#jsIconMid)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Layer 1: Top Hero Diamond */}
      <path
        d="M16 6 L25.5 10.75 L16 15.5 L6.5 10.75 Z"
        fill="url(#jsIconTop)"
      />

      {/* Gloss Highlight on Top Plate */}
      <path
        d="M16 7.5 L23 10.75 L16 14 L9 10.75 Z"
        fill="#ffffff"
        opacity="0.22"
      />

      {/* Core Node */}
      <circle cx="16" cy="10.75" r="1.4" fill="#ffffff" opacity="0.95" />
    </svg>
  );
};

interface JobStackLogoProps {
  iconSize?: number;
  fontSize?: string;
  showText?: boolean;
  className?: string;
}

export const JobStackLogo: React.FC<JobStackLogoProps> = ({
  iconSize = 22,
  showText = true,
  className = "",
}) => {
  return (
    <div
      className={`jobstack-brand-logo ${className}`}
      style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
    >
      <div
        className="navbar__logo-icon"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <JobStackIcon size={iconSize} />
      </div>
      {showText && (
        <span className="navbar__logo-text">
          Job<span className="gradient-text">Stack</span>
        </span>
      )}
    </div>
  );
};

export default JobStackLogo;
