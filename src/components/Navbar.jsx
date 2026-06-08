import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("cool");

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = saved || "cool";
    setTheme(initial);
    document.documentElement.classList.remove("theme-warm", "theme-cool");
    document.documentElement.classList.add(
      initial === "warm" ? "theme-warm" : "theme-cool",
    );
  }, []);

  const toggleTheme = () => {
    const next = theme === "warm" ? "cool" : "warm";
    setTheme(next);
    document.documentElement.classList.remove("theme-warm", "theme-cool");
    document.documentElement.classList.add(
      next === "warm" ? "theme-warm" : "theme-cool",
    );
    localStorage.setItem("theme", next);
  };

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-semibold text-white ring-1 ring-white/6">
            A
          </div>
          <span className="text-xl font-semibold text-white">Adrian</span>
        </a>

        <nav className="hidden md:flex gap-6 items-center">
          <a
            href="#projects"
            className="nav-link text-textPrimary hover:text-white transition"
          >
            Projects
          </a>
          <a
            href="#about"
            className="nav-link text-textPrimary hover:text-white transition"
          >
            About
          </a>
          <a
            href="#skills"
            className="nav-link text-textPrimary hover:text-white transition"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="nav-link text-textPrimary hover:text-white transition"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AdrianVi-AD"
            target="_blank"
            rel="noreferrer"
            className="text-textPrimary hover:text-white transition"
          >
            GitHub
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-textPrimary hover:text-white hover:bg-primary/20 transition"
            title="Toggle accent theme"
            aria-pressed={theme === "warm"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth={1.5}
                d="M12 3C8.134 3 5 6.134 5 10c0 1.657.672 3.16 1.757 4.243A5 5 0 0012 21a5 5 0 006.243-6.243C20.328 13.16 21 11.657 21 10c0-3.866-3.134-7-9-7z"
              />
            </svg>
          </button>
          <button
            className="md:hidden p-2 rounded-md bg-primary/25 border border-primary/20 text-textPrimary hover:bg-primary/35"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div className="px-6 pb-6">
          <div className="flex flex-col gap-4">
            <a
              href="#projects"
              onClick={() => setOpen(false)}
              className="nav-link text-textPrimary hover:text-white"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="nav-link text-textPrimary hover:text-white"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => setOpen(false)}
              className="nav-link text-textPrimary hover:text-white"
            >
              Skills
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="nav-link text-textPrimary hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
