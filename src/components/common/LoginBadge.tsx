import React from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import "./LoginBadge.css";

export interface LoginBadgeProps {
  loginType?: string | null;
  className?: string;
  id?: string;
  size?: "sm" | "md";
}

export const LoginBadge: React.FC<LoginBadgeProps> = ({
  loginType,
  className = "",
  id,
  size = "sm",
}) => {
  if (!loginType || typeof loginType !== "string" || !loginType.trim()) {
    return null;
  }

  const raw = loginType.trim();
  const lower = raw.toLowerCase();
  const iconSize = size === "md" ? 13 : 11;

  const isGoogle = lower.includes("google");
  const isCredentials =
    lower.includes("username") ||
    lower.includes("password") ||
    lower.includes("credentials") ||
    lower.includes("email");

  if (isGoogle) {
    return (
      <div
        id={id}
        className={`login-badge login-badge--google ${size === "md" ? "login-badge--md" : ""} ${className}`.trim()}
        title="Saved Login: Google Login"
        aria-label="Logged in with Google"
      >
        <span className="login-badge-icon">
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </span>
        <span>Google Login</span>
      </div>
    );
  }

  if (isCredentials) {
    return (
      <div
        id={id}
        className={`login-badge login-badge--credentials ${size === "md" ? "login-badge--md" : ""} ${className}`.trim()}
        title="Saved Login: Username & Password"
        aria-label="Logged in with Username & Password"
      >
        <span className="login-badge-icon">
          <KeyRound size={iconSize} strokeWidth={2.4} aria-hidden="true" />
        </span>
        <span>Username Password</span>
      </div>
    );
  }

  return (
    <div
      id={id}
      className={`login-badge login-badge--default ${size === "md" ? "login-badge--md" : ""} ${className}`.trim()}
      title={`Saved Login: ${raw}`}
      aria-label={`Logged in with ${raw}`}
    >
      <span className="login-badge-icon">
        <ShieldCheck size={iconSize} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span>{raw}</span>
    </div>
  );
};

export default LoginBadge;
