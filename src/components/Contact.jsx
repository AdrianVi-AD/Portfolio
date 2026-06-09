import React from "react";

const MAILTO_TO = import.meta.env.VITE_MAILTO || "dev.adrian0508@gmail.com";

export default function Contact() {
  const handleEmailClick = () => {
    const subject = "Portfolio Contact";
    const body = "Hi Adrian, I would like to connect with you.";

    const href = `mailto:${MAILTO_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const link = document.createElement("a");
    link.href = href;
    link.click();
  };

  return (
    <section id="contact" className="py-20">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Let's Connect
        </h2>
        <p className="text-textPrimary mt-3">
          Feel free to reach out through any of the platforms below.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          onClick={handleEmailClick}
          className="px-6 py-3 bg-secondary text-white rounded-xl shadow hover:opacity-90 transition w-56"
        >
          Email Me
        </button>

        <a
          href="https://github.com/AdrianVi-AD"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-800 text-white rounded-xl shadow hover:opacity-90 transition w-56 text-center"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/adrian-villacarlos-707bab30a"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:opacity-90 transition w-56 text-center"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}