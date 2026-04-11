import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white/95 text-amber-600 shadow-sm transition-all hover:border-violet-400 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-800/90 dark:text-amber-300 dark:hover:border-violet-500/50 dark:hover:text-violet-300"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? (
        <Sun size={20} aria-hidden />
      ) : (
        <Moon size={20} aria-hidden />
      )}
    </button>
  );
};

export default ThemeToggle;
