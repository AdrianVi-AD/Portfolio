import React from "react";

export default function About() {
  return (
    <section id="about" className="py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="animate-fadein">
          <h2 className="text-2xl font-semibold text-white">About Me</h2>
          <p className="mt-4 text-textPrimary">
            I&apos;m a Computer Engineering student building full stack
            applications. I focus on writing accessible, tested, and performant
            code. I have experience working with modern JavaScript frameworks
            and backend technologies.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "React",
              "Node.js",
              "MySQL",
              "Tailwind CSS",
              "TypeScript",
              "Express",
            ].map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-gradient-to-r from-primary/60 to-primary/30 border border-secondary/20 text-textPrimary rounded-full text-sm hover:scale-105 transition"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* GitHub contributions moved to dedicated Contributions section above */}

          <div className="bg-primary/70 p-6 rounded-xl shadow-card animate-fadein delay-150">
            <h3 className="text-white font-semibold">Highlights</h3>
            <ul className="mt-4 text-textPrimary space-y-2">
              <li>• Built responsive SPAs with React and Tailwind CSS</li>
              <li>• REST APIs with Node.js and Express</li>
              <li>• Relational database design and optimization (MySQL)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
