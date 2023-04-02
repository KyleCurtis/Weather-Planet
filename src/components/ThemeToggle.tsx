import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <button
      className="theme-button w-[30px] h-[30px] bg-blue-100 rounded-lg dark:bg-slate-800 flex items-center justify-center hover:ring-2 ring-blue-400 transition-all duration-300 focus:outline-none ml-4"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <FaMoon className="text-blue-500 w-5 h-5" />
      ) : (
        <FaSun className="text-blue-400 w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggler;
