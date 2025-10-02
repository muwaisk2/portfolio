// LoadingScreen.jsx
import { useEffect } from "react";
import { FaReact, FaNodeJs, FaGithub, FaEnvelope } from "react-icons/fa";
import "./LoadingScreen.css";

export default function LoadingScreen({ setIsLoading, progress }) {
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress, setIsLoading]);

  return (
    <div
      className="loading-screen"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        color: "white",
      }}
    >
      {/* Welcome Text */}
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "20px",
          background: "linear-gradient(90deg, #00BFFF, #13ff4e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        Welcome
      </h1>

      {/* Animated Icons Row */}
      <div className="loading-icons" style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <FaReact className="loading-icon" size={40} color="#61DBFB" />
        <FaNodeJs className="loading-icon" size={40} color="#68A063" />
        <FaGithub className="loading-icon" size={40} color="white" />
        <FaEnvelope className="loading-icon" size={40} color="#00BFFF" />
      </div>

      {/* Loading Bar */}
      <div
        className="loading-bar"
        style={{
          width: "300px",
          height: "10px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #00BFFF, #13ff4e)",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>

      {/* Percentage */}
      <p style={{ fontWeight: "600", fontSize: "18px" }}>{Math.round(progress)}%</p>
    </div>
  );
}
