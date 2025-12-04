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
            Minik Dostlarınız İçin <br />
            <span className="text-highlight">Modern ve Sevgi Dolu</span> Bir
            Yuva
          </h1>

          <p className="main-hero-desc">
            İsveç standartlarında veteriner hekimlik hizmeti, artık Türkiye'de.
            Onlar ailenizin bir parçası, bizim ise önceliğimiz.
          </p>

          <Link to="/about" className="hero-about-btn">
            Hakkımızda Daha Fazla
          </Link>
        </div>
      </div>
    </section>
  );
}
