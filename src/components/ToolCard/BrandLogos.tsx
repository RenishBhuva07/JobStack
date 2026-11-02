import React, { useState } from "react";
import { JobStackIcon, JobStackLogo } from "../common/JobStackLogo";

export { JobStackIcon, JobStackLogo };

export interface BrandIconProps {
  name: string;
  url?: string;
  size?: number;
  className?: string;
}

// Fallback canonical URLs for known platforms when url prop is omitted
const KNOWN_PORTAL_URLS: Record<string, string> = {
  upwork: "https://www.upwork.com",
  toptal: "https://www.toptal.com",
  fiverr: "https://www.fiverr.com",
  linkedin: "https://www.linkedin.com",
  indeed: "https://www.indeed.com",
  naukri: "https://www.naukri.com",
  weworkremotely: "https://weworkremotely.com",
  contra: "https://contra.com",
  lemon: "https://lemon.io",
  arc: "https://arc.dev",
  otta: "https://otta.com",
  braintrust: "https://www.usebraintrust.com",
  behance: "https://www.behance.net",
  dribbble: "https://dribbble.com",
  remoteok: "https://remoteok.com",
  wellfound: "https://wellfound.com",
  "y combinator": "https://www.workatastartup.com",
  yc: "https://www.workatastartup.com",
  flexjobs: "https://www.flexjobs.com",
  "virtual vocations": "https://www.virtualvocations.com",
  remotive: "https://remotive.com",
  "working nomads": "https://www.workingnomads.com",
  himalayas: "https://himalayas.app",
  "dynamite jobs": "https://dynamitejobs.com",
  jobspresso: "https://jobspresso.co",
  lenny: "https://www.lennysjobs.com",
  a16z: "https://jobs.a16z.com",
  unstop: "https://unstop.com",
  cutshort: "https://cutshort.io",
  uplers: "https://www.uplers.com",
  "remote.io": "https://remote.io",
  remoteio: "https://remote.io",
};

/**
 * Universal fallback monogram chip when an icon cannot be fetched or offline.
 */
export const BrandIconFallback: React.FC<BrandIconProps> = ({
  name,
  size = 48,
  className = "",
}) => {
  const initial = (name.trim().charAt(0) || "?").toUpperCase();
  const radius = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.44);

  return (
    <div
      className={`tool-card__logo-fallback ${className}`.trim()}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
        border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
        color: "var(--accent-primary, #60a5fa)",
        fontFamily: "var(--font-brand), var(--font-heading), inherit",
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        userSelect: "none",
        flexShrink: 0,
      }}
      aria-label={name}
    >
      {initial}
    </div>
  );
};

export const BrandIcon: React.FC<BrandIconProps> = ({
  name,
  url,
  size = 48,
  className = "",
}) => {
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});

  // Direct JobStack brand icon match
  if (name.toLowerCase().includes("jobstack")) {
    const iconImgSize = Math.round(size * 0.72);
    return (
      <div
        className={`tool-card__logo-fallback ${className}`.trim()}
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.22),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(59, 130, 246, 0.16) 0%, rgba(139, 92, 246, 0.16) 100%)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          boxShadow: "0 2px 12px rgba(59, 130, 246, 0.2)",
          flexShrink: 0,
        }}
        aria-label="JobStack"
      >
        <JobStackIcon size={iconImgSize} />
      </div>
    );
  }

  // Resolve target URL
  let targetUrl = url?.trim();
  if (!targetUrl) {
    const lowerName = name.toLowerCase();
    const matchedKey = Object.keys(KNOWN_PORTAL_URLS).find((key) =>
      lowerName.includes(key),
    );
    if (matchedKey) {
      targetUrl = KNOWN_PORTAL_URLS[matchedKey];
    }
  }

  const hasError = Boolean(targetUrl && failedUrls[targetUrl]);

  if (!hasError && targetUrl) {
    const faviconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${encodeURIComponent(
      targetUrl,
    )}&size=128`;

    const iconImgSize = Math.round(size * 0.72);
    const radius = Math.round(size * 0.18);

    return (
      <img
        src={faviconUrl}
        alt={`${name} icon`}
        width={iconImgSize}
        height={iconImgSize}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (targetUrl) {
            setFailedUrls((prev) => ({ ...prev, [targetUrl]: true }));
          }
        }}
        className={`brand-icon-img ${className}`.trim()}
        style={{
          width: iconImgSize,
          height: iconImgSize,
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          borderRadius: radius,
          display: "block",
        }}
      />
    );
  }

  return (
    <BrandIconFallback
      name={name}
      url={url}
      size={size}
      className={className}
    />
  );
};

export default BrandIcon;
