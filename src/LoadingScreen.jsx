import React, { useEffect, useRef, useState } from "react";
import { FaReact, FaNodeJs, FaGithub, FaEnvelope } from "react-icons/fa";
import "./LoadingScreen.css";

export default function LoadingScreen({ setIsLoading, progress = 0 }) {
  const rootRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);

  // Rotate languages while loading
  const langs = ["Welcome", "Hello", "Hola", "مرحبا", "こんにちは", "你好", "Bienvenue"];
  const [langIndex, setLangIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setLangIndex(i => (i + 1) % langs.length), 700);
    return () => clearInterval(interval);
  }, []);

  // Trigger exit immediately when progress reaches 100
  useEffect(() => {
    if (progress >= 100 && !isExiting) {
      setIsExiting(true);
    }
  }, [progress, isExiting]);

  // After exit animation, hide loading screen
  useEffect(() => {
    if (!isExiting) return;
    const el = rootRef.current;
    if (!el) {
      setIsLoading(false);
      return;
    }

    const onTransitionEnd = (ev) => {
      if (ev.propertyName === "transform") setIsLoading(false);
    };

    el.addEventListener("transitionend", onTransitionEnd);
    // safety fallback
    const fallback = setTimeout(() => setIsLoading(false), 1200);

    return () => {
      el.removeEventListener("transitionend", onTransitionEnd);
      clearTimeout(fallback);
    };
  }, [isExiting, setIsLoading]);

  return (
    <div ref={rootRef} className={`loading-screen ${isExiting ? "loading-exit" : ""}`}>
      <div className="loading-inner">
        <h1 className="loading-welcome">
          <span className="welcome-cursive" style={{ fontFamily: "cursive", fontSize: "50px" }}>Welcome,</span>{" "}
          <span className="welcome-lang">{langs[langIndex]}</span>
        </h1>

        <div className="loading-icons">
          <FaReact className="loading-icon" />
          <FaNodeJs className="loading-icon" />
          <FaGithub className="loading-icon" />
          <FaEnvelope className="loading-icon" />
        </div>

        <div className="loading-bar-wrapper">
          <div className="loading-bar-track" style={{ width: "300px", fontSize: "20px", fontWeight: "bold" }}>
            <div
              className="loading-bar-fill"
              style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
            />
            <div
              className="loading-bar-glow"
              style={{ left: `${Math.max(0, Math.min(100, progress))}%`, opacity: progress > 3 ? 1 : 0 }}
            />
          </div>
          <div className="loading-percent">{Math.round(progress)}%</div>
        </div>

        <div className="loading-subtext" style={{ opacity: 0.7, fontSize: "15px", fontStyle: "italic", fontFamily: "Roboto,monospace,sans-serif", animation: "fadeIn 2s ease-in-out" }}>
          Preparing your immersive developer environment...
        </div>
      </div>
    </div>
  );
}
