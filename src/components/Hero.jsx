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
          Adrian - Aspiring Software Developer
        </h1>
        <p className="mt-4 text-textPrimary max-w-xl">
          I build modern, responsive web applications with a focus on clean UX,
          performance, and maintainable code. I&apos;m comfortable across the
          stack and enjoy working with Laravel, Reactjs, and databases.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-md shadow hover:scale-[1.02] transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border border-accent text-accent px-5 py-2 rounded-md hover:bg-accent/10 transition"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="flex-shrink-0 animate-fadein delay-150">
        <img
          src={heroImg}
          alt="Adrian profile"
          className="w-44 h-44 md:w-56 md:h-56 object-cover rounded-full ring-4 ring-accent/20 shadow-card hover:scale-105 transition-transform"
        />
      </div>
    </section>
  );
}
