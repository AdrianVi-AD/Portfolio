import portrait from "../assets/VillacarlosAdrianFormalPic.jpg";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-content">
        <p className="hero-role">
          <span className="status-dot" />
          Software developer
        </p>
        <h1 id="hero-title">
          <span>Adrian</span>{" "}
          <span>Villacarlos.</span>
        </h1>
        <p className="hero-description">
          I build practical applications with reliable systems and thoughtful
          interfaces. An IT graduate with a curiosity for how things work—and
          how to make them better.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <Icon name="arrow" />
          </a>
          <a className="text-link" href="#contact">
            Let’s connect <Icon name="arrow" />
          </a>
        </div>
      </div>
      <figure className="hero-portrait">
        <div className="portrait-frame">
          <img
            src={portrait}
            alt="Adrian Villacarlos"
            width="819"
            height="941"
            fetchPriority="high"
          />
        </div>
        <figcaption>A little curiosity goes a long way.</figcaption>
      </figure>
      <div className="hero-footnote">
        <span>From backend logic to the details you see.</span>
        <a href="#projects">
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
