import { projects } from "../data/projects";
import Icon from "./Icon";

function ProjectArtwork({ project }) {
  if (project.id === "stonecreek") {
    return (
      <div className="project-artwork artwork-game" aria-hidden="true">
        <span className="artwork-caption">
          An adventure in a small, greener world.
        </span>
        <div className="game-title">
          Seeds of
          <br />
          Tomorrow<span>Guardians of Stonecreek</span>
        </div>
        <svg
          className="landscape"
          viewBox="0 0 560 140"
          fill="none"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 81h46V67h58v18h60V54h59v19h46V48h71v32h55V60h78v24h87v56H0Z"
            fill="#3b5445"
          />
          <path
            d="M0 106h81V91h67v20h70V94h74v15h74V88h88v19h106v33H0Z"
            fill="#4c6c55"
          />
          <path
            d="M0 127h127v-12h83v25H0Zm560 0H414v-12h-75v25h221Z"
            fill="#365440"
          />
          <path d="M260 98h31v15h17v27h-70v-18h22Z" fill="#a7baaa" />
          <path d="M94 60V31h9V20h14v11h9v29Z" fill="#779574" />
          <path d="M106 58h8v24h-8Z" fill="#8d846c" />
          <path d="M434 59V24h10V10h16v14h10v35Z" fill="#779574" />
          <path d="M447 56h9v29h-9Z" fill="#8d846c" />
        </svg>
      </div>
    );
  }

  return (
    <div className="project-artwork artwork-web" aria-hidden="true">
      <div className="website-illustration">
        <div className="illustration-toolbar">
          <span />
          <span />
          <span />
          <i />
        </div>
        <div className="illustration-nav">
          <strong>
            ICTDU<span>.</span>
          </strong>
          <div>
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="illustration-content">
          <span>Built around community.</span>
          <strong>
            Technology.
            <br />
            People.
            <br />
            Possibilities.
          </strong>
          <div className="illustration-button" />
        </div>
        <div className="illustration-symbol">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
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
