import React, { useState, useEffect } from "react";
import "./IntroSection.css";
// Veri dosyasını import ediyoruz
import { patients } from "../../../data/patients";

export default function IntroSection() {
  // Rastgele hasta seçimi için State
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Component yüklendiğinde çalışır
    const fetchRandomPatient = async () => {
      setLoading(true);

      // Gerçekçilik hissi için yarım saniye bekletiyoruz (isteğe bağlı)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Rastgele bir index seç
      const randomIndex = Math.floor(Math.random() * patients.length);
      setSelectedPatient(patients[randomIndex]);

      setLoading(false);
    };

    fetchRandomPatient();
  }, []);

  return (
    <section className="intro-section" id="intro">
      <div className="container intro-inner">
        {/* SOL TARAF (Senin Metinlerin Aynen Korundu) */}
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
            <button className="intro-cta-primary">
              Şimdi Randevu Al <span>↗</span>
            </button>
            <button className="intro-cta-secondary">
              Hizmetlerimizi İncele
            </button>
          </div>

          <div className="intro-meta">
            <div className="intro-meta-item">🐾 1.200+ mutlu hasta</div>
            <div className="intro-meta-item">⭐ 4.9 / 5 hasta memnuniyeti</div>
            <div className="intro-meta-item">📍 Kadıköy / İstanbul</div>
          </div>
        </div>

        {/* SAĞ TARAF (Artık Dinamik) */}
        <div className="intro-visual-wrapper">
          {loading ? (
            // Yüklenirken gösterilecek geçici kart
            <div
              className="intro-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "350px",
              }}
            >
              <p style={{ color: "var(--color-text-secondary)" }}>
                Hasta verisi yükleniyor...
              </p>
            </div>
          ) : (
            selectedPatient && (
              <div className="intro-card">
                {/* Avatar: Artık img etiketi ve dinamik src */}
                <img
                  src={selectedPatient.image}
                  alt={selectedPatient.name}
                  className="intro-pet-avatar"
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

                {/* Etiketler (Map ile dönüyoruz) */}
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
            )
          )}
        </div>
      </div>
    </section>
  );
}
