import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = false,
  className = "",
  id = "theme-toggle",
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      id={id}
      type="button"
      className={`theme-toggle-btn ${showLabel ? "theme-toggle-btn--with-label" : ""} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle-icon">
        {isDark ? (
          <Sun size={18} strokeWidth={2.2} />
        ) : (
          <Moon size={18} strokeWidth={2.2} />
        )}
      </span>

      {showLabel && (
        <span className="theme-toggle-label">
          <span>Theme</span>
          <span className="theme-toggle-badge">
            {isDark ? "Dark" : "Light"}
          </span>
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
