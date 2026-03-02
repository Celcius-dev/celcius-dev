import React, { useState, useEffect } from "react";
import "./IntroSection.css";
import api from "../../../api/axios";
import { useSiteContent } from "../../../context/SiteContentContext";

export default function IntroSection() {
  const { intro } = useSiteContent();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sunucu resim klasörü
  const UPLOAD_URL = "http://localhost:5000/uploads/";

  useEffect(() => {
    const fetchRandomPatient = async () => {
      try {
        setLoading(true);
        // Backend'den tüm hastaları çek
        const res = await api.get("/patients");
        const patients = res.data;

        if (patients.length > 0) {
          // Rastgele birini seç
          const randomIndex = Math.floor(Math.random() * patients.length);
          setSelectedPatient(patients[randomIndex]);
        }
      } catch (error) {
        console.error("Hasta verisi çekilemedi", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPatient();
  }, []);

  const scrollToServices = () => {
    const section = document.getElementById("services");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="intro-section" id="intro">
      <div className="container intro-inner">
        {/* SOL TARAF */}
        <div className="intro-LeftPanel">
          <div className="intro-badge-row">
            <div className="intro-badge">
              <span className="intro-badge-pulse" />
              {intro.badge}
            </div>
            <div className="intro-badge-text">
              {intro.badgeText}
            </div>
          </div>

          <h2 className="intro-title">
            {intro.title} <br />
            <span className="highlight">{intro.titleHighlight}</span>
          </h2>

          <p className="intro-text">
            {intro.text}
          </p>

          <div className="intro-actions">
            <button className="intro-cta-secondary" onClick={scrollToServices}>
              {intro.buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
