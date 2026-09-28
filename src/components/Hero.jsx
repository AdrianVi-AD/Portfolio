import React from "react";
import heroImg from "../assets/VillacarlosAdrianFormalPic.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="py-20 flex flex-col md:flex-row items-center gap-10"
    >
      <div className="flex-1 text-left animate-fadein">
        <p className="text-sm uppercase tracking-wide text-secondary font-medium">
          Hi, my name is
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-bold text-white leading-tight">
          Adrian - Developer
        </h1>
        <p className="mt-4 text-textPrimary max-w-xl">
          Recent Information Technology graduate with a tech-savvy mindset and a
          strong foundation in networking, Linux administration, and software
          development. Experienced working in a Linux Ubuntu environment during
          my internship and skilled in troubleshooting, backend systems, and
          RESTful APIs. Passionate about learning new technologies and eager to
          begin my career in the IT industry by applying my analytical,
          problem-solving, and technical skills while contributing to
          organizational success.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-outline">
            Contact Me
          </a>
          <a
            href="/MyResume.pdf"
            download
            className="px-6 py-3 bg-green-600 text-white rounded-xl shadow hover:opacity-90 transition w-56 text-center"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="flex-shrink-0 animate-fadein delay-150">
        <img
          src={heroImg}
          alt="Adrian profile"
          className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-full ring-4 ring-accent/20 shadow-card tilt-hover"
        />
      </div>
    </section>
  );
}
