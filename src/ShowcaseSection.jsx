import React from "react";
import { FaReact, FaNodeJs, FaGithub, FaLaptopCode } from "react-icons/fa";
import { SiCss3, SiJavascript, SiRedux } from "react-icons/si";
import "./ShowcaseSection.css";

const ShowcaseSection = () => {
  return (
    <section className="showcase-section">
      <div className="recent-projects-grid">

        {/* Project 1 */}
        <div className="project-card">
          <div className="project-icon">
            <FaLaptopCode size={60} color="#00d4ff" />
          </div>
          <h3>Portfolio Website</h3>
          <p>A modern portfolio website built with React and CSS, showcasing projects and skills.</p>
          <div className="project-card-footer">
            <div className="tech-stack">
              <FaReact size={24} color="#61dafb" />
              <SiCss3 size={24} color="#264de4" />
            </div>
            <a href="#" className="live-site-link">Live Site →</a>
          </div>
        </div>

        {/* Project 2 */}
        <div className="project-card">
          <div className="project-icon">
            <FaLaptopCode size={60} color="#4da6ff" />
          </div>
          <h3>Task Manager App</h3>
          <p>An app to manage daily tasks efficiently, built with React and Node.js.</p>
          <div className="project-card-footer">
            <div className="tech-stack">
              <FaReact size={24} color="#61dafb" />
              <FaNodeJs size={24} color="#8cc84b" />
            </div>
            <a href="#" className="live-site-link">Live Site →</a>
          </div>
        </div>

        {/* Add more projects similarly */}
      </div>

      <div className="github-link">
        <a href="#" className="github-btn">
          <FaGithub size={20} /> View GitHub
        </a>
      </div>
    </section>
  );
};

export default ShowcaseSection;
