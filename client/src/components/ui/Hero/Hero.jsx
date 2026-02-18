import "./Hero.css";
import React from "react";
import { Link } from "react-router-dom";
import heroVideo from "../../../assets/videos/video.mp4";

export default function Hero() {
  return (
    <section className="video-hero">
      {/* Video Arkaplanı */}
      <div className="video-overlay"></div>
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={heroVideo} type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>

      {/* İçerik Alanı */}
      <div className="container hero-content-container">
        <div className="hero-content">
          <h1 className="main-hero-title">
            En modern och kärleksfull plats <br />
            <span className="text-highlight">för dina små vänner</span>
          </h1>

          <p className="main-hero-desc">
            Den större kliniken med det varma hjärtat i den lilla
          </p>

          <Link to="/about" className="hero-about-btn">
            Om oss
          </Link>
        </div>
      </div>
    </section>
  );
}
