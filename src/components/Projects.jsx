import { projects } from "../data/projects";
import Icon from "./Icon";

function ProjectArtwork({ project }) {
  return (
    <div className={`project-artwork project-image project-image--${project.id}`}>
      <img
        src={project.image}
        alt={project.imageAlt}
        width={project.imageWidth}
        height={project.imageHeight}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section work-section"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="section-label">A few things I’ve built</p>
          <h2 id="work-title">Selected work</h2>
        </div>
        <a
          className="text-link section-heading-link"
          href="https://github.com/AdrianVi-AD"
          target="_blank"
          rel="noreferrer"
        >
          More on GitHub <Icon name="arrow" />
        </a>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project" key={project.id}>
            <a
              className="project-cover"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.demoLabel}: ${project.title}`}
            >
              <ProjectArtwork project={project} />
              <span className="project-cover-action">
                <Icon name="arrow" />
              </span>
            </a>
            <div className="project-info">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="project-subtitle">{project.subtitle}</p>
              <p className="project-description">{project.description}</p>
              <ul
                className="technology-list"
                aria-label={`${project.title} technologies`}
              >
                {project.tech.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <div className="project-links">
                <a
                  className="text-link"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.demoLabel} <Icon name="arrow" />
                </a>
                <a
                  className="project-source"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} source on GitHub`}
                >
                  <Icon name="github" /> Source code
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
