// App.jsx
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
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
  FaUserTie
} from "react-icons/fa";
import Navbar from "./Navbar.jsx";
import "./App.css";
import MatrixBackground from "./MatrixBackground.jsx";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(TextPlugin, ScrollTrigger);
function App() {
  // App state (each declared only once)
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [currentReview, setCurrentReview] = useState(0);

  // Reviews data (single declaration)
  const reviews = [
    {
      text:
        "Working with Muhammad Uwais Karim was an absolute pleasure. His dedication, creativity, and technical expertise turned our vision into a seamless, modern web solution.",
      author: "— Sarah Johnson, Startup Founder"
    },
    {
      text:
        "Uwais is a highly skilled developer who understands both design and functionality. He delivered everything on time and exceeded our expectations.",
      author: "— Daniel Lee, Project Manager"
    },
    {
      text:
        "Great collaborator! He communicates well, takes initiative, and brings ideas that elevate the project. I’d definitely work with him again.",
      author: "— Maria Fernandez, UI/UX Designer"
    },
    {
      text:
        "Professional, reliable, and detail-oriented. Uwais transformed our outdated system into a fast, modern web app that our team loves to use.",
      author: "— James Smith, Tech Lead"
    }
  ];

  // Loading screen progress simulation (keeps only one `anim` local)
  useEffect(() => {
    if (!isFirstLoad) return;

    setProgress(0);

    const anim = gsap.to({}, {
      duration: 2.5,
      ease: "power1.inOut",
      onUpdate: function () {
        // this is the tween instance
        setProgress(this.progress() * 100);
      },
      onComplete: () => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setIsFirstLoad(false);
        }, 1500);
      }
    });

    return () => anim.kill();
  }, [isFirstLoad]);

  const showAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("muwaisk2@gmail.com");
    showAlert("Email copied to clipboard!");
  };

  // Typewriter / rotating text (guard DOM queries)
  useEffect(() => {
    const phrases = [
      "• Always meets deadlines with consistent results",
      "• Strong communicator.",
      "• Writes clean, scalable, and maintainable code",
      "• Delivers modern, user-focused experiences",
      "• Passionate about continuous learning & growth",
      "• Tech enthusiast with a love for innovation",
      "• Focused on client satisfaction and success",
      "• Lets WORK AND BUILD something GREAT together!"
    ];

    const textEl = document.querySelector(".typewriter-text");
    const cursorEl = document.querySelector(".typewriter-cursor");

    if (!textEl || !cursorEl) return;

    const tl = gsap.timeline({ repeat: -1 });
    

    phrases.forEach((phrase) => {
      tl.to(textEl, {
        duration: phrase.length * 0.05,
        text: phrase,
        opacity: 1,
        ease: "none",
        onStart: () => {
          gsap.set(cursorEl, { opacity: 1 });
          gsap.killTweensOf(cursorEl);
        }
      })
        .to(cursorEl, {
          opacity: 0,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        }, ">")
        .to({}, { duration: 0.5 })
        .to(textEl, {
          duration: phrase.length * 0.02,
          text: "",
          opacity: 0,
          ease: "power1.inOut",
          onStart: () => {
            gsap.set(cursorEl, { opacity: 1 });
            gsap.killTweensOf(cursorEl);
          }
        });
    });

    return () => tl.kill();
  }, []);

  // Enhanced scroll-triggered animations with GSAP
  useEffect(() => {
    // Header entrance
    gsap.from("header", {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power3.out"
    });

    const fadeUpAnimation = {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power3.out"
    };

    // .fade-in elements scroll triggers (keeps behavior DRY)
    gsap.utils.toArray(".fade-in").forEach((element, i) => {
      ScrollTrigger.create({
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(element, {
            ...fadeUpAnimation,
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            delay: i * 0.1
          });
        },
        onLeave: () => {
          gsap.to(element, {
            opacity: 0,
            y: -30,
            filter: "blur(10px)",
            duration: 1
          });
        },
        onEnterBack: () => {
          gsap.to(element, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5
          });
        },
        onLeaveBack: () => {
          gsap.to(element, {
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
            duration: 0.5
          });
        }
      });
    });

    // Info blocks
    gsap.from(".info-block", {
      scrollTrigger: {
        trigger: ".info-blocks-section",
        start: "top 75%"
      },
      duration: 0.5,
      opacity: 0,
      y: 30,
      stagger: 0.2,
      ease: "power2.out"
    });

    // Project cards
    gsap.from(".project-card", {
      scrollTrigger: {
        trigger: ".recent-projects-grid",
        start: "top 70%"
      },
      duration: 0.5,
      opacity: 0,
      y: 50,
      stagger: 0.3,
      ease: "back.out(1.2)"
    });

    // Faster Work Experience animation (updated values)
    gsap.from(".experience-card", {
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 85%"
      },
      duration: 0.3,
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -30 : 30),
      stagger: 0.15,
      ease: "power2.out"
    });

    // Faster CTA animation
    gsap.from(".cta-section", {
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top 80%"
      },
      duration: 0.4,
      opacity: 0,
      y: 20,
      ease: "power2.out"
    });

    // cleanup all ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  // Reviews navigation handlers (single declarations)
  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance reviews
  useEffect(() => {
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, []);

  // ----- JSX -----
  return (
    <div id="root">
      {/* pass setIsLoading so LoadingScreen can call it if needed */}
      <LoadingScreen setIsLoading={setIsLoading} progress={progress} />
      <MatrixBackground />
      <Navbar />

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
            animation: "fadeInOut 1s ease-in-out"
          }}
        >
          {alertMessage}
        </div>
      )}

      {/* Heading Section */}
      <div
        id="home"
        className="App-heading fade-in"
        style={{
          textAlign: "center",
          fontFamily: "'Poppins', sans-serif",
          animationDelay: "1s",
          position: "relative",
          margin: "0 auto",
          padding: "0",
          background: "none",
          maxWidth: "100%"
        }}
      >
       <h1
  className="heading-animation main-heading"
  style={{
    animationDelay: "0.8s",
    fontWeight: "12000",
    fontSize: "4.5em",
    letterSpacing: "-0.02em",
    lineHeight: "1.1",
    margin: "0 auto",
    opacity: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.1em",
    textAlign: "center",
  }}
>
  {/* First line (blue) */}
  <span
    style={{
      fontSize: "1.5em",
      fontWeight: "1000",
      color: "#00BFFF" // bright blue
    }}
  >
    Transform your ideas into
  </span>

  {/* Second line (green) */}
  <span
    style={{
      fontSize: "1.5em",
      fontWeight: "1000",
      color: "#13ff4e" // neon green
    }}
  >
    User Experiences
  </span>
</h1>

       <h2
          className="heading-animation sub-heading"
          style={{
            animationDelay: "1s",
            color: "white",
            fontSize: "1.5em",
            marginTop: "30px",
            fontWeight: "500",
            lineHeight: "1.4",
            maxWidth: "800px",
            margin: "30px auto 0",
            opacity: 1
          }}
        >
          Hi, I'm <strong>Muhammad Uwais Karim</strong> — a passionate{" "}
          <strong>software developer</strong> crafting{" "}
          <strong>modern applications and Websites</strong>.
        </h2>

        <div
          className="typewriter-container fade-in"
          style={{ animationDelay: "1.2s", position: "relative", zIndex: 10, opacity: 1 }}
        >
          <span className="typewriter-text"></span>
          <span className="typewriter-cursor"></span>
        </div>

        <button
          className="main-button fade-in"
          style={{ animationDelay: "2.8s", position: "relative", zIndex: 10 }}
          onClick={() => {
            const projectsSection = document.getElementById("projects");
            if (projectsSection) projectsSection.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Explore Projects
        </button>

          
        <div
          className="scroll-down fade-in"
          style={{
            animationDelay: "3s",
            position: "absolute",
            bottom: "120px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "14px",
            color: "#00BFFF",
            fontWeight: "600",
            zIndex: 10
          }}
        >
          Scroll Down ↓
        </div>
      </div>

      {/* Info Blocks */}
      <section className="info-blocks-section fade-in" style={{ animationDelay: "2.3s" }}>
        <div className="info-block fade-in" style={{ animationDelay: "2.5s" }}>
          <FaGlobe size={28} style={{ marginRight: "10px" }} />
          I prioritize client collaboration, fostering open communication.
        </div>
        <div className="info-block fade-in" style={{ animationDelay: "2.7s" }}>
          <FaReact size={28} style={{ marginRight: "10px" }} />
          I constantly try to improve. Tech enthusiast with a passion for development.
        </div>
        <div className="info-block fade-in" style={{ animationDelay: "2.9s" }}>
          <FaVuejs size={28} style={{ marginRight: "10px" }} />
          My tech stack: ReactJS, VueJS, NextJS, Typescript, GraphQL, Express.
        </div>
        <div
          className="info-block copy-email-block fade-in"
          style={{ animationDelay: "3.1s", cursor: "pointer" }}
          onClick={copyEmail}
        >
          <FaEnvelope size={28} style={{ marginRight: "10px" }} />
          Copy my email address
        </div>
      </section>

      {/* Recent Projects */}
      <section id="projects" className="recent-projects fade-in" style={{ animationDelay: "2.3s" }}>
        <h2 className="recent-projects-title">Recent Projects</h2>
        <p className="recent-projects-subtitle">A selection of projects I have worked on recently.</p>

        <div className="recent-projects-grid">
          <div className="project-card fade-in" style={{ animationDelay: "2.5s" }}>
            <div className="project-icon"><FaFolder size={60} /></div>
            <h3>Muhammad Uwais Karim's Personal Brand Website</h3>
            <p>A modern and sleek website that showcases my personal brand and portfolio, built with React, Vite, Javascript, HTML and CSS.</p>
            <div className="project-card-footer">
              <div className="tech-stack"><FaReact className="tech-icon" /><FaVuejs className="tech-icon" /></div>
              <a href="https://muhammad-uwais-karim-s-brand-websit.vercel.app/" className="live-site-link">Live Site → <FaGlobe /></a>
            </div>
          </div>

          <div className="project-card fade-in" style={{ animationDelay: "2.7s" }}>
            <div className="project-icon"><FaFolder size={60} /></div>
            <h3>1st Choice Prepaid</h3>
            <p>A small business owner that showcases their services and products through a dedicated web platform.</p>
            <div className="project-card-footer">
              <div className="tech-stack"><FaReact className="tech-icon" /><FaNodeJs className="tech-icon" /></div>
              <a href="https://1st-choice-prepaid-website.vercel.app/" className="live-site-link" target="_blank" rel="noreferrer">Live Site → <FaGlobe /></a>
            </div>
          </div>
        </div>

        <div className="github-link fade-in" style={{ animationDelay: "2.9s" }}>
          <a href="https://github.com/muwaisk2" className="github-btn" target="_blank" rel="noopener noreferrer">
            <FaGithub style={{ marginRight: "8px" }} /> View GitHub
          </a>
        </div>
      </section>

      {/* Experience */}
      <section className="experience-section fade-in" style={{ animationDelay: "1s" }}>
        <h2 className="experience-title">My Work Experience</h2>
        <div className="timeline">
          <div className="timeline-line" />
          <div className="experience-row">
            <div className="experience-card fade-in" style={{ animationDelay: "1.2s" }}>
              <FaLaptopCode className="experience-icon" />
              <h3>Frontend Engineer Intern</h3>
              <p>Assisted in the development of a web-based platform using React.js, enhancing interactivity.</p>
            </div>
            <div className="experience-card fade-in" style={{ animationDelay: "1.4s" }}>
              <FaMobileAlt className="experience-icon" />
              <h3>Mobile App Dev - JSM Tech</h3>
              <p>Designed and developed mobile apps for both iOS & Android platforms using React Native.</p>
            </div>
          </div>

          <div className="experience-row">
            <div className="experience-card fade-in" style={{ animationDelay: "1.6s" }}>
              <FaLightbulb className="experience-icon" />
              <h3>Freelance App Dev Project</h3>
              <p>Led the development of a mobile app for a client, from initial concept to deployment on app stores.</p>
            </div>
            <div className="experience-card fade-in" style={{ animationDelay: "1.8s" }}>
              <FaUserTie className="experience-icon" />
              <h3>Lead Frontend Developer</h3>
              <p>Developed and maintained user-facing features using modern frontend technologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach / CTA / Reviews / Footer */}
      <section id="about" className="approach-section fade-in">
        <h2 className="approach-title">My <span className="highlight">approach</span></h2>
        <div className="approach-container">
          <div className="approach-card">
            <h3 className="phase-number">Phase 1</h3>
            <p className="phase-description">Plan & Research</p>
            <p className="phase-text">Understanding your goals, researching user needs, and mapping out a clear project plan.</p>
          </div>
          <div className="approach-card">
            <h3 className="phase-number">Phase 2</h3>
            <p className="phase-description">Development & Progress Update</p>
            <p className="phase-text">Once we agree on the plan, I dive into coding. From sketches to polished code, I keep you updated every step.</p>
          </div>
          <div className="approach-card">
            <h3 className="phase-number">Phase 3</h3>
            <p className="phase-description">Launch & Support</p>
            <p className="phase-text">Deploying the final product, ensuring smooth launch, and offering ongoing support.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="cta-section fade-in" style={{ textAlign: "center", padding: "60px 20px" }}>
        <h2>Ready to take <span className="highlight">your</span> digital presence to the next level?</h2>
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
            transition: "all 1s ease-in-out"
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

      <section className="review-section fade-in" style={{ animationDelay: "1.8s" }}>
        <h2 className="review-title" style={{ color: "#00BFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif", fontSize: "36px" }}>Client Reviews</h2>
        <div className="review-card">
          <FaQuoteLeft className="quote-icon" />
          <p className="review-text">{reviews[currentReview].text}</p>
          <p className="review-author">{reviews[currentReview].author}</p>
          <div className="review-controls">
            <button className="review-btn" onClick={prevReview}><FaChevronLeft /></button>
            <button className="review-btn" onClick={nextReview}><FaChevronRight /></button>
          </div>
        </div>
      </section>

      <footer className="footer"><p>©2025 Muhammad Uwais Karim</p></footer>

      <div className="wave-container">
        <div className="wave wave1" />
        <div className="wave wave2" />
        <div className="wave wave3" />
      </div>
    </div>
  );
}

export default App;

