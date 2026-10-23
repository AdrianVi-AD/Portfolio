import stonecreekImage from "../assets/SOT.jpg";
import ictduImage from "../assets/ictdu.jpg";

export const projects = [
  {
    id: "stonecreek",
    title: "Seeds of Tomorrow",
    subtitle: "Guardians of Stonecreek",
    category: "Game development",
    image: stonecreekImage,
    imageAlt: "Seeds of Tomorrow title artwork with a pixel-art mountain landscape",
    imageWidth: 1536,
    imageHeight: 1024,
    description:
      "A 2D top-down adventure about protecting nature. Built for mobile with Godot, with a playable web version to explore.",
    tech: ["Godot", "C#", "Python", "Aseprite"],
    github: "https://github.com/AdrianVi-AD/sotweb",
    demo: "https://adrianvi-ad.github.io/sotweb/",
    demoLabel: "Play the game",
  },
  {
    id: "ictdu",
    title: "ICTDU",
    subtitle: "A home for a student community",
    category: "Web development",
    image: ictduImage,
    imageAlt: "Information and Communications Technology Development Unit emblem",
    imageWidth: 2048,
    imageHeight: 2048,
    description:
      "A responsive website for a school technology organization, bringing its programs, events, and achievements together in one place.",
    tech: ["JavaScript", "Bootstrap", "HTML", "CSS"],
    github: "https://github.com/AdrianVi-AD/ICTDU",
    demo: "https://adrianvi-ad.github.io/ICTDU/",
    demoLabel: "Visit website",
  },
];
