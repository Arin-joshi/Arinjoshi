import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "ghost-dark";
}

const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ variant = "default" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const ghostDark =
    "h-8 w-8 rounded-lg border-0 bg-transparent text-slate-300 shadow-none hover:bg-white/10 hover:text-white";
  const ghost =
    "h-8 w-8 rounded-lg border-0 bg-transparent text-slate-600 shadow-none hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white";

  const base =
    variant === "ghost-dark"
      ? ghostDark
      : variant === "ghost"
        ? ghost
        : "h-10 w-10 rounded-lg border border-slate-200 bg-white/95 text-red-600 shadow-sm hover:border-red-400 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800/90 dark:text-red-300 dark:hover:border-red-500/50 dark:hover:text-red-300";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative flex shrink-0 items-center justify-center transition-all ${base}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <Sun size={variant === "ghost" ? 17 : 20} aria-hidden /> : <Moon size={variant === "ghost" ? 17 : 20} aria-hidden />}
    </button>
  );
});

export default ThemeToggle;
