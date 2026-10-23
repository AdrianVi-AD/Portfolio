const groups = [
  {
    title: "Frontend",
    description: "Interfaces that feel straightforward.",
    items: ["React", "JavaScript", "Tailwind CSS", "HTML & CSS", "Vite"],
  },
  {
    title: "Backend",
    description: "The systems that make them work.",
    items: ["PHP", "Laravel", "Lumen", "Node.js", "MySQL", "REST APIs"],
  },
  {
    title: "Tools & workflow",
    description: "A little structure behind the scenes.",
    items: ["Git", "Linux", "Postman", "Playwright", "Godot"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="section skills-section"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-label">What I work with</p>
          <h2 id="skills-title">My toolkit</h2>
        </div>
        <p className="section-note">
          The right tool for the problem.
          <br />
          Always room to learn another.
        </p>
      </div>
      <div className="skills-grid">
        {groups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
