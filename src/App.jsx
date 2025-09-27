import React, { useEffect, useState } from "react";
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaFolder,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaLaptopCode,
  FaMobileAlt,
  FaLightbulb,
  FaUserTie,
} from "react-icons/fa";
import Navbar from "./Navbar.jsx";
import "./App.css";
import MatrixBackground from "./MatrixBackground.jsx";

function App() {
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("muwaisk2@gmail.com");
    showAlert("Email copied to clipboard!");
  };

  // Scroll-triggered fade-in animations
  useEffect(() => {
    const faders = document.querySelectorAll(".fade-in");
    const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, appearOptions);

    faders.forEach((fader) => appearOnScroll.observe(fader));
  }, []);

  // Reviews data
  const reviews = [
    {
      text: "Working with Muhammad Uwais Karim was an absolute pleasure. His dedication, creativity, and technical expertise turned our vision into a seamless, modern web solution.",
      author: "— Sarah Johnson, Startup Founder",
    },
    {
      text: "Uwais is a highly skilled developer who understands both design and functionality. He delivered everything on time and exceeded our expectations.",
      author: "— Daniel Lee, Project Manager",
    },
    {
      text: "Great collaborator! He communicates well, takes initiative, and brings ideas that elevate the project. I’d definitely work with him again.",
      author: "— Maria Fernandez, UI/UX Designer",
    },
    {
      text: "Professional, reliable, and detail-oriented. Uwais transformed our outdated system into a fast, modern web app that our team loves to use.",
      author: "— James Smith, Tech Lead",
    },
  ];

  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="root">
      <MatrixBackground />
      <Navbar />

      {/* Alert Message */}
      {alertMessage && (
        <div
          className="alert-message"
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#00BFFF",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "600",
            zIndex: 9999,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            animation: "fadeInOut 2.5s ease-in-out",
          }}
        >
          {alertMessage}
        </div>
      )}

      {/* Heading Section */}
      <header
        id="home"
        className="App-heading fade-in"
        style={{ marginTop: "-90px", padding: "100px", textAlign: "center", fontFamily: "'Poppins', sans-serif" }}
      >
        <h1 className="heading-animation" style={{ animationDelay: "0.2s", padding: "0px" }}>
          <strong>
            Transform your ideas into Seamless{" "}
            <span className="highlight" style={{ color: "#7F00FF" }}>
              User Experiences
            </span>
          </strong>
        </h1>
        <h2 className="heading-animation" style={{ animationDelay: "0.2s" }}>
          Hi, I'm <strong>Muhammad Uwais Karim</strong> — a passionate{" "}
          <strong>software developer</strong> crafting <strong>modern applications and Websites</strong>.
        </h2>
        <button
          className="main-button fade-in"
          style={{ animationDelay: "0.4s" }}
          onClick={() => {
            const projectsSection = document.getElementById("projects");
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Explore Projects
        </button>
        <div className="scroll-down fade-in" style={{ animationDelay: "0.6s" }}>
          Scroll Down ↓
        </div>
      </header>

      {/* Info Blocks Section */}
      <section className="info-blocks-section fade-in">
        <div className="info-block fade-in" style={{ animationDelay: "0.2s" }}>
          <FaGlobe size={28} style={{ marginRight: "10px" }} />
          I prioritize client collaboration, fostering open communication.
        </div>
        <div className="info-block fade-in" style={{ animationDelay: "0.4s" }}>
          <FaReact size={28} style={{ marginRight: "10px" }} />
          I constantly try to improve. Tech enthusiast with a passion for development.
        </div>
        <div className="info-block fade-in" style={{ animationDelay: "0.6s" }}>
          <FaVuejs size={28} style={{ marginRight: "10px" }} />
          My tech stack: ReactJS, VueJS, NextJS, Typescript, GraphQL, Express.
        </div>
        <div className="info-block copy-email-block fade-in" style={{ animationDelay: "0.8s", cursor: "pointer" }} onClick={copyEmail}>
          <FaEnvelope size={28} style={{ marginRight: "10px" }} />
          Copy my email address
        </div>
      </section>

      {/* Recent Projects */}
      <section id="projects" className="recent-projects fade-in" style={{ animationDelay: "1s" }}>
        <h2 className="recent-projects-title">Recent Projects</h2>
        <p className="recent-projects-subtitle">A selection of projects I have worked on recently.</p>
        <div className="recent-projects-grid">
          {/* Project cards */}
          <div className="project-card fade-in" style={{ animationDelay: "1.2s" }}>
            <div className="project-icon">
              <FaFolder size={60} />
            </div>
            <h3>Portfolio Website</h3>
            <p>A modern portfolio website built with React and CSS, showcasing projects and skills.</p>
            <div className="project-card-footer">
              <div className="tech-stack">
                <FaReact className="tech-icon" />
                <FaVuejs className="tech-icon" />
              </div>
              <a href="#" className="live-site-link">
                Live Site → <FaGlobe />
              </a>
            </div>
          </div>

          <div className="project-card fade-in" style={{ animationDelay: "1.4s" }}>
            <div className="project-icon">
              <FaFolder size={60} />
            </div>
            <h3>Quran Learning App</h3>
            <p>
              An app to help users learn Quranic verses with interactive quizzes and progress tracking. Includes Full Quran, Duas Kitaab, and audio support.
            </p>
            <div className="project-card-footer">
              <div className="tech-stack">
                <FaReact className="tech-icon" />
                <FaNodeJs className="tech-icon" />
              </div>
              <a href="https://github.com/muwaisk2/Towards-Learning-the-Quran-Part-2-" className="live-site-link">
                Live Site → <FaGlobe />
              </a>
            </div>
          </div>
        </div>

        <div className="github-link fade-in" style={{ animationDelay: "1.6s" }}>
          <a href="https://github.com/muwaisk2" className="github-btn" target="_blank" rel="noopener noreferrer">
            <FaGithub style={{ marginRight: "8px" }} /> View GitHub
          </a>
        </div>
      </section>

      {/* Work Experience Timeline */}
      <section className="experience-section fade-in" style={{ animationDelay: "1.4s" }}>
        <h2 className="experience-title">My Work Experience</h2>
        <div className="timeline">
          <div className="timeline-line"></div>
          <div className="experience-row">
            <div className="experience-card fade-in" style={{ animationDelay: "1.6s" }}>
              <FaLaptopCode className="experience-icon" />
              <h3>Frontend Engineer Intern</h3>
              <p>Assisted in the development of a web-based platform using React.js, enhancing interactivity.</p>
            </div>
            <div className="experience-card fade-in" style={{ animationDelay: "1.8s" }}>
              <FaMobileAlt className="experience-icon" />
              <h3>Mobile App Dev - JSM Tech</h3>
              <p>Designed and developed mobile apps for both iOS & Android platforms using React Native.</p>
            </div>
          </div>
          <div className="experience-row">
            <div className="experience-card fade-in" style={{ animationDelay: "2s" }}>
              <FaLightbulb className="experience-icon" />
              <h3>Freelance App Dev Project</h3>
              <p>Led the development of a mobile app for a client, from initial concept to deployment on app stores.</p>
            </div>
            <div className="experience-card fade-in" style={{ animationDelay: "2.2s" }}>
              <FaUserTie className="experience-icon" />
              <h3>Lead Frontend Developer</h3>
              <p>Developed and maintained user-facing features using modern frontend technologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach / Phases */}
      <section id="about" className="approach-section fade-in">
        <h2 className="approach-title">
          My <span className="highlight">approach</span>
        </h2>
        <div className="approach-container">
          <div className="approach-card">
            <h3 className="phase-number">Phase 1</h3>
            <p className="phase-description">Plan & Research</p>
            <p className="phase-text">
              Understanding your goals, researching user needs, and mapping out a clear project plan.
            </p>
          </div>
          <div className="approach-card">
            <h3 className="phase-number">Phase 2</h3>
            <p className="phase-description">Development & Progress Update</p>
            <p className="phase-text">
              Once we agree on the plan, I dive into coding. From sketches to polished code, I keep you updated every step.
            </p>
          </div>
          <div className="approach-card">
            <h3 className="phase-number">Phase 3</h3>
            <p className="phase-description">Launch & Support</p>
            <p className="phase-text">
              Deploying the final product, ensuring smooth launch, and offering ongoing support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta-section fade-in" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>
          Ready to take <span className="highlight">your</span> digital presence to the next level?
        </h2>
        <p>Reach out to me today by copying my email and starting a conversation.</p>
        <button
          className="cta-btn"
          style={{
            display: "inline-block",
            marginTop: "20px",
            padding: "14px 36px",
            background: "linear-gradient(90deg, #00BFFF, #1E90FF)",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
          onClick={copyEmail}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.background = "linear-gradient(90deg, #1E90FF, #00BFFF)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "linear-gradient(90deg, #00BFFF, #1E90FF)";
          }}
        >
          Copy My Email → muwaisk2@gmail.com
        </button>
      </section>

      {/* Reviews Carousel */}
      <section className="review-section fade-in" style={{ animationDelay: "1.8s" }}>
        <h2 className="review-title" style={{ color: "#00BFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif", fontSize: "36px" }}>
          Client Reviews
        </h2>
        <div className="review-card">
          <FaQuoteLeft className="quote-icon" />
          <p className="review-text">{reviews[currentReview].text}</p>
          <p className="review-author">{reviews[currentReview].author}</p>
          <div className="review-controls">
            <button className="review-btn" onClick={prevReview}>
              <FaChevronLeft />
            </button>
            <button className="review-btn" onClick={nextReview}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>©2025 Muhammad Uwais Karim</p>
      </footer>
      <div className="wave-container">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
    </div>

  );
}

export default App;
