import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./index.css";
import ContributionsSection from "./components/ContributionsSection";

import Starfield from "./components/Starfield";

function App() {
  return (
    <div className="min-h-screen relative z-10 bg-gradient-to-b from-primary/95 via-primary/80 to-primary text-textPrimary">
      <Starfield />
      <Navbar />
      <main className="container-md pt-8">
        <Hero />
        <ContributionsSection />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
