import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-xl font-semibold text-white">
          Adrian
        </a>

        <nav className="hidden md:flex gap-6 items-center">
          <a
            href="#projects"
            className="text-textPrimary hover:text-white transition"
          >
            Projects
          </a>
          <a
            href="#about"
            className="text-textPrimary hover:text-white transition"
          >
            About
          </a>
          <a
            href="#skills"
            className="text-textPrimary hover:text-white transition"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="text-textPrimary hover:text-white transition"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-textPrimary hover:text-white transition"
          >
            GitHub
          </a>
          <button
            className="md:hidden p-2 rounded-md bg-primary/40 border border-primary/30 text-textPrimary"
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
              className="text-textPrimary hover:text-white"
            >
              Projects
            </a>
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="text-textPrimary hover:text-white"
            >
              About
            </a>
            <a
              href="#skills"
              onClick={() => setOpen(false)}
              className="text-textPrimary hover:text-white"
            >
              Skills
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="text-textPrimary hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
