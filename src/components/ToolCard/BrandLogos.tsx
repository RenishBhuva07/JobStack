import React from 'react';
import {
  Globe,
  Code2,
  Compass,
  Target,
  Blocks,
  Crosshair,
  Database,
  Wand2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface BrandIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({ name, size = 48, className = '' }) => {
  const normalized = name.toLowerCase();
  const radius = Math.round(size * 0.24);
  const iconSize = Math.round(size * 0.52);

  // 1. Upwork
  if (normalized.includes('upwork')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#14A800" />
        <path
          d="M16.5 7.5C15.1 7.5 14.1 8.3 13.6 9.4C13.2 8.3 12.3 7.5 11 7.5C9.3 7.5 8 8.8 8 10.5V14H9.8V10.5C9.8 9.9 10.3 9.4 11 9.4C11.6 9.4 12.1 9.9 12.1 10.5V14H13.9V11.2C14.1 10.1 15 9.4 16.1 9.4C17 9.4 17.6 10 17.6 11V14H19.5V10.8C19.5 9 18.2 7.5 16.5 7.5ZM5.8 7.5H4V14H5.8V7.5Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 2. Toptal
  if (normalized.includes('toptal')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#0E2D65" />
        <path d="M6 7.5H18V10H13.3V17H10.7V10H6V7.5Z" fill="#204ECF" />
        <circle cx="12" cy="7.5" r="2.2" fill="#38B6FF" />
      </svg>
    );
  }

  // 3. Fiverr
  if (normalized.includes('fiverr')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#1DBF73" />
        <path
          d="M10 6.5C8.6 6.5 7.5 7.6 7.5 9V17H10V11H12.5V8.8H10V8.2C10 7.8 10.3 7.5 10.7 7.5H12.5V5.5H10.8C10.5 5.5 10.2 5.8 10 6.5ZM13.8 17H16.2V10H13.8V17ZM15 6C14.2 6 13.5 6.7 13.5 7.5C13.5 8.3 14.2 9 15 9C15.8 9 16.5 8.3 16.5 7.5C16.5 6.7 15.8 6 15 6Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 4. LinkedIn
  if (normalized.includes('linkedin')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#0A66C2" />
        <path
          d="M7.8 17.5H5.2V9H7.8V17.5ZM6.5 7.8C5.7 7.8 5 7.1 5 6.3C5 5.5 5.7 4.8 6.5 4.8C7.3 4.8 8 5.5 8 6.3C8 7.1 7.3 7.8 6.5 7.8ZM19 17.5H16.4V13.3C16.4 12.3 16.4 10.9 15 10.9C13.5 10.9 13.3 12 13.3 13.2V17.5H10.7V9H13.2V10.2H13.2C13.6 9.5 14.5 8.7 15.9 8.7C18.8 8.7 19.3 10.6 19.3 13.1V17.5H19Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 5. Indeed
  if (normalized.includes('indeed')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#003A9B" />
        <path
          d="M12.5 5.5C10.6 5.5 9 7.1 9 9V17.5H11.5V11C11.5 10 12.3 9.2 13.3 9.2C14.3 9.2 15.1 10 15.1 11V17.5H17.6V10.8C17.6 7.9 15.3 5.5 12.5 5.5ZM6.2 9H8.7V17.5H6.2V9Z"
          fill="#FFFFFF"
        />
        <circle cx="7.45" cy="6.5" r="1.3" fill="#2164f3" />
      </svg>
    );
  }

  // 6. Naukri.com
  if (normalized.includes('naukri')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#4A90E2" />
        <path
          d="M7 6.5V17.5H9.5L14.5 10.5V17.5H17V6.5H14.5L9.5 13.5V6.5H7Z"
          fill="#FFFFFF"
        />
        <circle cx="17.5" cy="6" r="2" fill="#FF7555" />
      </svg>
    );
  }

  // 7. We Work Remotely (Lucide Globe on Coral)
  if (normalized.includes('weworkremotely') || normalized.includes('we work remotely')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: '#EA4335',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(234, 67, 53, 0.25)',
        }}
      >
        <Globe size={iconSize} color="#ffffff" strokeWidth={2.2} />
      </div>
    );
  }

  // 8. Contra (Lucide Zap on Dark Slate)
  if (normalized.includes('contra')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #27272a 0%, #09090b 100%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
        }}
      >
        <Zap size={iconSize} color="#f43f5e" strokeWidth={2.4} />
      </div>
    );
  }

  // 9. Lemon.io (Lucide Code2 on Lemon Amber)
  if (normalized.includes('lemon')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
        }}
      >
        <Code2 size={iconSize} color="#18181b" strokeWidth={2.5} />
      </div>
    );
  }

  // 10. Arc.dev (Lucide Compass on Deep Cyan)
  if (normalized.includes('arc.dev') || normalized.includes('arc')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #0f172a 0%, #083344 100%)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(6, 182, 212, 0.25)',
        }}
      >
        <Compass size={iconSize} color="#22d3ee" strokeWidth={2.3} />
      </div>
    );
  }

  // 11. Otta (Lucide Target on Indigo)
  if (normalized.includes('otta')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
        }}
      >
        <Target size={iconSize} color="#ffffff" strokeWidth={2.3} />
      </div>
    );
  }

  // 12. Braintrust (Lucide Blocks on Royal Blue)
  if (normalized.includes('braintrust')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
        }}
      >
        <Blocks size={iconSize} color="#ffffff" strokeWidth={2.2} />
      </div>
    );
  }

  // 13. Behance
  if (normalized.includes('behance')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#1769FF" />
        <path
          d="M6 7.5H9.5C11 7.5 11.8 8.2 11.8 9.2C11.8 10 11.2 10.5 10.4 10.8C11.4 11.1 12 11.8 12 12.9C12 14.2 11 15 9.3 15H6V7.5ZM8 10.5H9.2C9.8 10.5 10.2 10.2 10.2 9.6C10.2 9 9.8 8.8 9.2 8.8H8V10.5ZM8 13.7H9.4C10.1 13.7 10.5 13.3 10.5 12.6C10.5 11.9 10.1 11.6 9.4 11.6H8V13.7ZM14 9H17.5V10H14V9ZM15.8 10.8C17.4 10.8 18.5 11.9 18.5 13.5C18.5 13.7 18.5 13.9 18.4 14.1H14.5C14.6 14.8 15.2 15.2 16 15.2C16.6 15.2 17.1 14.9 17.3 14.5H18.4C18.1 15.6 17.2 16.2 15.9 16.2C14.1 16.2 13.2 14.9 13.2 13.5C13.2 12 14.2 10.8 15.8 10.8ZM14.5 13.1H17.2C17.1 12.4 16.6 11.8 15.8 11.8C15.1 11.8 14.6 12.3 14.5 13.1Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 14. Dribbble
  if (normalized.includes('dribbble')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#EA4C89" />
        <circle cx="12" cy="12" r="7.5" stroke="#FFFFFF" strokeWidth="1.6" />
        <path d="M5.5 10.5C9.5 10 13.5 10.2 18.5 11" stroke="#FFFFFF" strokeWidth="1.6" />
        <path d="M8.5 5.5C11 9 13 13 14 18.5" stroke="#FFFFFF" strokeWidth="1.6" />
        <path d="M7 16.5C10 14 14 13.5 17.5 15" stroke="#FFFFFF" strokeWidth="1.6" />
      </svg>
    );
  }

  // 15. Hunter.io (Lucide Crosshair on Orange)
  if (normalized.includes('hunter')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #ff7a45 0%, #ff5722 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(255, 87, 34, 0.3)',
        }}
      >
        <Crosshair size={iconSize} color="#ffffff" strokeWidth={2.4} />
      </div>
    );
  }

  // 16. Apollo.io (Lucide Database on Violet)
  if (normalized.includes('apollo')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
        }}
      >
        <Database size={iconSize} color="#ffffff" strokeWidth={2.2} />
      </div>
    );
  }

  // 17. Magical (Lucide Wand2 on Gradient)
  if (normalized.includes('magical')) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(236, 72, 153, 0.3)',
        }}
      >
        <Wand2 size={iconSize} color="#ffffff" strokeWidth={2.3} />
      </div>
    );
  }

  // 18. GitHub
  if (normalized.includes('github')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="6" fill="#181717" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 4C7.58 4 4 7.67 4 12.2C4 15.82 6.29 18.89 9.47 19.98C9.87 20.05 10.02 19.8 10.02 19.58C10.02 19.38 10.01 18.72 10.01 17.92C7.78 18.42 7.31 16.94 7.31 16.94C6.95 15.98 6.42 15.73 6.42 15.73C5.69 15.22 6.47 15.23 6.47 15.23C7.28 15.29 7.7 16.08 7.7 16.08C8.42 17.34 9.58 16.98 10.04 16.77C10.11 16.23 10.32 15.86 10.56 15.65C8.78 15.44 6.91 14.74 6.91 11.59C6.91 10.7 7.22 9.97 7.73 9.4C7.65 9.19 7.37 8.35 7.81 7.24C7.81 7.24 8.48 7.02 10.01 8.08C10.65 7.9 11.33 7.81 12.01 7.81C12.69 7.81 13.37 7.9 14.01 8.08C15.54 7.02 16.21 7.24 16.21 7.24C16.65 8.35 16.37 9.19 16.29 9.4C16.8 9.97 17.11 10.7 17.11 11.59C17.11 14.75 15.23 15.44 13.44 15.64C13.74 15.91 14 16.45 14 17.27C14 18.45 13.99 19.4 13.99 19.58C13.99 19.81 14.13 20.06 14.54 19.98C17.72 18.88 20 15.82 20 12.2C20 7.67 16.42 4 12 4Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Default stylized fallback with Lucide Sparkles
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.18) 100%)',
        border: '1px solid rgba(59,130,246,0.3)',
        boxShadow: '0 2px 8px rgba(59,130,246,0.15)',
      }}
    >
      <Sparkles size={iconSize} color="#60a5fa" strokeWidth={2} />
    </div>
  );
};

export default BrandIcon;
