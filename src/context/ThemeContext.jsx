// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved === "dark";
    } catch { /* Keep theme available when browser storage is blocked. */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); }
    catch { /* The current session can still switch themes. */ }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, theme: dark ? "dark" : "light", toggle: () => setDark((v) => !v) }}>
      {children}
    </ThemeContext.Provider>
  );
}

// This hook shares the provider's context; changes to this module may reload consumers.
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
