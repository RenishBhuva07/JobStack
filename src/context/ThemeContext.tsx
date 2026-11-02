import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "jobstack_theme";

/**
 * Constant-time O(1) DOM root attribute applicator.
 * Instantly synchronizes data-theme on <html> and meta theme-color.
 */
function applyThemeToDOM(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.getElementById("theme-color-meta");
  if (meta) {
    meta.setAttribute("content", theme === "light" ? "#f8fafc" : "#080c14");
  }
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  } catch {
    return "dark";
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Sync DOM on mount
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  // Listen to OS system color scheme preference changes if user hasn't set an explicit override
  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
      const handleSystemChange = (e: MediaQueryListEvent) => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) {
          const newTheme: Theme = e.matches ? "light" : "dark";
          setThemeState(newTheme);
          applyThemeToDOM(newTheme);
        }
      };

      mediaQuery.addEventListener("change", handleSystemChange);
      return () => mediaQuery.removeEventListener("change", handleSystemChange);
    } catch {
      // Fallback for older environments
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore storage write issues
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const nextTheme: Theme = prev === "dark" ? "light" : "dark";
      applyThemeToDOM(nextTheme);
      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        // Ignore storage write issues
      }
      return nextTheme;
    });
  }, []);

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
    }),
    [theme, toggleTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
