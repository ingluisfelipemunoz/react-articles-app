import { useEffect } from "react";
import { useAppSelector } from "./hooks";
import type { Theme } from "./uiSlice";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const effective = theme === "system" ? (prefersDark ? "dark" : "light") : theme;

  root.classList.toggle("dark", effective === "dark");
}

export function ThemeProvider() {
  const theme = useAppSelector((s) => s.ui.theme);
  useEffect(() => applyTheme(theme), [theme]);
  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(theme);
    mql?.addEventListener?.("change", onChange);
    return () => mql?.removeEventListener?.("change", onChange);
  }, [theme]);
  return null;
}
