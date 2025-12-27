import React, { useState, useEffect } from "react";
import "./IntroSection.css";
import api from "../../../api/axios"; // Backend API

export default function IntroSection() {
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
              7/24 Acil Destek
            </div>
            <div className="intro-badge-text">
              Online randevu, dijital hasta geçmişi ve modern tanı sistemi.
            </div>
          </div>

          <h2 className="intro-title">
            Evcil dostlarınız için
            <br />
            <span className="highlight">yumuşak dokunuşlu</span> veteriner
            bakımı.
          </h2>

          <p className="intro-text">
            VetCare Clinic; muayene, aşı, cerrahi ve laboratuvar hizmetlerini,
            dijital kayıt sistemiyle tek noktada toplar. Siz dostunuzla
            ilgilenirken, tüm süreçleri biz takip ederiz.
          </p>

          <div className="intro-actions">
            <button
              className="intro-cta-primary"
              onClick={(e) => e.preventDefault()}
            >
              Şimdi Randevu Al <span>↗</span>
            </button>
            <button className="intro-cta-secondary" onClick={scrollToServices}>
              Hizmetlerimizi İncele
            </button>
          </div>
        </div>

        {/* SAĞ TARAF (Dinamik Kart) */}
        <div className="intro-visual-wrapper">
          {loading ? (
            <div className="intro-card flex items-center justify-center min-h-[350px]">
              <p style={{ color: "var(--color-text-secondary)" }}>
                Yükleniyor...
              </p>
            </div>
          ) : selectedPatient ? (
            <div className="intro-card">
              {/* --- DÜZELTME BURADA YAPILDI --- */}
              <img
                src={
                  selectedPatient.image
                    ? selectedPatient.image.startsWith("http")
                      ? selectedPatient.image // Eğer dış linkse (Seed verisi) olduğu gibi kullan
                      : UPLOAD_URL + selectedPatient.image // Eğer yükleme ise başına url ekle
                    : "https://placehold.co/200"
                }
                alt={selectedPatient.name}
                className="intro-pet-avatar object-cover"
              />

              {/* İsim ve Tedavi */}
              <div className="intro-card-title">
                {selectedPatient.name} - {selectedPatient.treatment}
              </div>

              {/* Açıklama */}
              <div className="intro-card-subtitle">
                {selectedPatient.age} {selectedPatient.breed},{" "}
                {selectedPatient.description}
              </div>

              {/* Etiketler */}
              <div className="intro-card-tag-list">
                {selectedPatient.tags.map((tag, index) => (
                  <span key={index} className="intro-card-tag">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Bilgileri */}
              <div className="intro-card-footer">
                <span>Son kontrol: {selectedPatient.lastVisit}</span>
                <span>Bir sonraki: {selectedPatient.nextVisit}</span>
              </div>
            </div>
          ) : (
            <div className="intro-card flex items-center justify-center min-h-[350px]">
              <p>Henüz hasta kaydı yok.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
