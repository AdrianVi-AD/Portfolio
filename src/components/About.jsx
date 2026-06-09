import React from "react";

export default function About() {
  return (
    <section id="about" className="py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="animate-fadein">
          <h2 className="text-2xl font-semibold text-white">About Me</h2>
          <p className="mt-4 text-textPrimary">
            I'm a software developer with a strong focus on backend development
            and system architecture. I have experience designing and building
            RESTful APIs, managing databases, and developing scalable web and
            mobile applications. I enjoy solving complex technical problems,
            optimizing application performance, and writing clean, maintainable
            code. My background includes working with Laravel, Node.js, React,
            and modern database technologies in collaborative Agile development
            environments.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Node.js", "MySQL", "Tailwind CSS", "Express"].map(
              (t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gradient-to-r from-primary/60 to-primary/30 border border-secondary/20 text-textPrimary rounded-full text-sm hover:scale-105 transition"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* GitHub contributions moved to dedicated Contributions section above */}

          <div className="bg-primary/100 p-6 rounded-xl shadow-card animate-fadein delay-150">
            <h3 className="text-white font-semibold">Highlights</h3>
            <ul className="mt-4 text-textPrimary space-y-2">
              <li>
                • Developed scalable web applications with React, Tailwind CSS,
                and modern frontend technologies
              </li>
              <li>
                • Built secure and efficient RESTful APIs using Node.js,
                Express, and Laravel
              </li>
              <li>
                • Designed, managed, and optimized MySQL databases to improve
                application performance and data integrity
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
