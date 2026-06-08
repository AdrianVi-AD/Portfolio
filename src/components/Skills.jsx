import React from "react";

const groups = [
  {
    title: "Frontend",
    items: ["ReactJS", "Tailwind CSS", "JavaScript", "Vite"],
  },
  {
    title: "Backend",
    items: ["MySQL", "Laravel", "PHP", "Lumen", "REST APIs"],
  },
  { title: "Tools", items: ["Git", "Postman", "Playwright"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <h2 className="text-2xl font-semibold text-white">Skills</h2>
      <p className="mt-2 text-textPrimary">
        Selected technologies I'm comfortable using.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((g) => (
          <div
            key={g.title}
            className="p-6 bg-primary/90 rounded-xl shadow-card transform transition hover:-translate-y-1 animate-fadein"
          >
            <h3 className="text-white font-semibold">{g.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-primary/70 border border-secondary/20 text-textPrimary rounded-full text-sm hover:scale-105 transition"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
