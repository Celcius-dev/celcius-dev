import "./Hero.css";
import React from "react";
import { Link } from "react-router-dom";
import heroVideo from "../../../assets/videos/video.mp4";
import { useSiteContent } from "../../../context/SiteContentContext";

export default function Hero() {
  const { hero } = useSiteContent();

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
          <h1 className="main-hero-title">{hero.title}</h1>

          <p className="main-hero-desc">{hero.subtitle}</p>

          <Link to="/about" className="hero-about-btn">
            {hero.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
