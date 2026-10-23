import Icon from "./Icon";

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-title"
    >
      <div>
        <p className="section-label">Let’s connect</p>
        <h2 id="contact-title">
          Good things start with
          <br />a conversation.
        </h2>
        <p className="contact-description">
          Have a project in mind or an opportunity to share?
          <br />
          I’d be happy to hear from you.
        </p>
      </div>
      <div className="contact-actions">
        <a
          className="button button-primary"
          href="https://www.linkedin.com/in/adrian-villacarlos-707bab30a"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="linkedin" />
          Connect on LinkedIn <Icon name="arrow" />
        </a>
        <a
          className="text-link"
          href="https://github.com/AdrianVi-AD"
          target="_blank"
          rel="noreferrer"
        >
          <Icon name="github" />
          Find me on GitHub <Icon name="arrow" />
        </a>
      </div>
    </section>
  );
}
