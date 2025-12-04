import React from "react";
import "./IntroSection.css";

export default function IntroSection() {
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

        {/* SAĞ TARAF */}
        <div className="intro-visual-wrapper">
          <div className="intro-card">
            <div className="intro-pet-avatar" />
            <div className="intro-card-title">Mia - Düzenli Aşı Takibi</div>
            <div className="intro-card-subtitle">
              2 yaşında Scottish Fold, dijital aşı kartı ve randevu hatırlatıcı
              ile takip ediliyor.
            </div>

            <div className="intro-card-tag-list">
              <span className="intro-card-tag">Aşı Takvimi</span>
              <span className="intro-card-tag">Kan Tahlili</span>
              <span className="intro-card-tag">Dijital Kayıt</span>
            </div>

            <div className="intro-card-footer">
              <span>Son kontrol: 2 hafta önce</span>
              <span>Bir sonraki: 12 Mart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
