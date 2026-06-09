import React from "react";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <h2 className="text-2xl font-semibold text-white">Projects</h2>
      <p className="mt-2 text-textPrimary">
        Selected projects — click through to view source or demo.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((p, idx) => (
          <article
            key={p.id}
            className="group project-card p-6 rounded-xl glass card-accent overflow-hidden transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl animate-entrance"
            style={{ animationDelay: `${idx * 120}ms` }}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-white font-semibold text-lg">{p.title}</h3>
              <div className="text-xs text-textPrimary">Featured</div>
            </div>

            <p className="project-description">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-2 py-4">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-xs bg-primary/100 border border-secondary/20 rounded-md text-textPrimary"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3 card-footer">
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-md text-sm shadow-sm hover:opacity-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.73.5.89 5.34.89 11.62c0 4.73 3.07 8.75 7.33 10.17.54.1.74-.24.74-.52 0-.26-.01-1.12-.02-2.03-2.98.65-3.61-1.43-3.61-1.43-.49-1.25-1.2-1.58-1.2-1.58-.98-.67.07-.66.07-.66 1.08.08 1.65 1.12 1.65 1.12.96 1.65 2.52 1.17 3.13.9.1-.71.38-1.17.69-1.44-2.38-.27-4.88-1.19-4.88-5.29 0-1.17.42-2.13 1.11-2.88-.11-.27-.48-1.37.11-2.86 0 0 .9-.29 2.95 1.1.86-.24 1.79-.36 2.71-.36.92 0 1.85.12 2.71.36 2.05-1.39 2.95-1.1 2.95-1.1.59 1.49.22 2.59.11 2.86.69.75 1.11 1.71 1.11 2.88 0 4.11-2.51 5.02-4.9 5.28.39.34.73 1.02.73 2.06 0 1.48-.01 2.68-.01 3.04 0 .28.2.62.75.51 4.26-1.43 7.33-5.44 7.33-10.17C23.11 5.34 18.27.5 12 .5z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-md text-sm hover:bg-accent/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 3h7v7" />
                  <path d="M10 14L21 3" />
                  <path d="M21 21H3V3" />
                </svg>
                <span>Live Demo</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
