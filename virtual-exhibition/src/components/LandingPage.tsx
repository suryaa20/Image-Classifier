import React, { useState } from "react";
import ImageClassifierSection from "./ImageClassifierSection";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleExploreClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      window.location.href = "/exhibition";
    }, 800);
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="landing-overlay"></div>

        <div className="landing-content">
          <header>
            <div className="logo">
              <span className="logo-text">
                Art<span className="highlight">Vision</span>
              </span>
            </div>
          </header>

          <main>
            <h1 className="title">
              <span className="title-line">Virtual Art</span>
              <span className="title-line">Exhibition Platform</span>
            </h1>

            <p className="subtitle">
              Explore artwork in an immersive 3D environment with AI-powered
              categorization
            </p>

            <div className="features">
              <div className="feature">
                <div className="feature-icon">🖼️</div>
                <h3>Immersive Viewing</h3>
                <p>Experience artwork in a 3D virtual gallery</p>
              </div>

              <div className="feature">
                <div className="feature-icon">🧠</div>
                <h3>AI Classification</h3>
                <p>Artwork automatically categorized by style</p>
              </div>

              <div className="feature">
                <div className="feature-icon">📱</div>
                <h3>Responsive Design</h3>
                <p>Perfect viewing on any device</p>
              </div>
            </div>

            <button
              className={`cta-button ${loading ? "loading" : ""}`}
              onClick={handleExploreClick}
              disabled={loading}
            >
              {loading ? "Loading..." : "Explore Exhibition"}
            </button>
          </main>
        </div>
      </div>

      <ImageClassifierSection />

      <footer>
        <div className="footer-content">
          <p>
            © 2023 Virtual Exhibition Platform. Powered by React Three Fiber.
          </p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
