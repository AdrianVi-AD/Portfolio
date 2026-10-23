import Icon from "./Icon";

export default function About() {
  return (
    <section
      id="about"
      className="section about-section"
      aria-labelledby="about-title"
    >
      <div>
        <p className="section-label">The person behind the code</p>
        <h2 id="about-title">
          Curious mind.
          <br />
          Practical approach.
        </h2>
      </div>
      <div className="about-content">
        <p className="about-intro">
          I’m Adrian, an Information Technology graduate who enjoys turning a
          problem into something that works.
        </p>
        <p>
          My focus is backend development: building RESTful APIs, working with
          databases, and understanding the systems behind an application. I also
          enjoy bringing those systems to life through clean, usable interfaces.
        </p>
        <p>
          During my internship, I worked in a Linux Ubuntu environment and
          developed my troubleshooting and administration skills. I’m continuing
          to explore web development, system architecture, and the occasional
          game.
        </p>
        <a
          className="text-link"
          href={`${import.meta.env.BASE_URL}MyResume.pdf`}
          download
        >
          Get to know my background <Icon name="down" />
        </a>
      </div>
    </section>
  );
}
