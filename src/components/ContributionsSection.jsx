import React, { useCallback } from "react";
import GithubContributions from "./GithubContributions";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "AdrianVi-AD"; // 🔁 Replace with your GitHub username

export default function ContributionsSection() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section id="contributions" className="relative py-20 overflow-hidden">
      {/* 🌌 Background Particles */}
      <Particles
        className="absolute inset-0 -z-10"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 50 },
            size: { value: 2 },
            move: { speed: 0.3 },
            opacity: { value: 0.5 },
            color: { value: "#f59e0b" },
          },
        }}
      />

      <div className="container-md relative">
        <div className="rounded-2xl p-6 md:p-8 bg-primary/50 border border-secondary/20 shadow-lg backdrop-blur-md transition duration-500 hover:scale-[1.01] hover:shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            {/* LEFT TEXT */}
            <div className="md:w-1/3 space-y-3 animate-fadein">
              <h2 className="text-3xl font-bold text-white">GitHub Activity</h2>

              <p className="text-textPrimary leading-relaxed">
                A glance at my recent contributions and activity on GitHub.
              </p>

              {/* CTA */}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-accent hover:underline transition"
              >
                View Full Profile →
              </a>
            </div>

            {/* RIGHT GRAPH */}
            <div className="w-full md:w-2/3 lg:w-3/4 transition duration-500 hover:scale-[1.02]">
              <GithubContributions username={GITHUB_USERNAME} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
