export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-inner">
        {/* SOL TARAF */}
        <div>
          <div className="hero-badge-row">
            <div className="hero-badge">
              <span className="hero-badge-pulse" />
              7/24 Acil Destek
            </div>
            <div className="hero-badge-text">
              Online randevu, dijital hasta geçmişi ve modern tanı sistemi.
            </div>
          </div>

          <h1 className="hero-title">
            Evcil dostlarınız için
            <br />
            <span className="highlight">yumuşak dokunuşlu</span> veteriner
            bakımı.
          </h1>

          <p className="hero-text">
            VetCare Clinic; muayene, aşı, cerrahi ve laboratuvar hizmetlerini,
            dijital kayıt sistemiyle tek noktada toplar. Siz dostunuzla
            ilgilenirken, tüm süreçleri biz takip ederiz.
          </p>

          <div className="hero-actions">
            <button className="hero-cta-primary">
              Şimdi Randevu Al <span>↗</span>
            </button>
            <button className="hero-cta-secondary">
              Hizmetlerimizi İncele
            </button>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">🐾 1.200+ mutlu hasta</div>
            <div className="hero-meta-item">⭐ 4.9 / 5 hasta memnuniyeti</div>
            <div className="hero-meta-item">📍 Kadıköy / İstanbul</div>
          </div>
        </div>

        {/* SAĞ TARAF (placeholder kart) */}
        <div className="hero-visual-wrapper">
          <div className="hero-card">
            <div className="hero-pet-avatar" />
            <div className="hero-card-title">Mia - Düzenli Aşı Takibi</div>
            <div className="hero-card-subtitle">
              2 yaşında Scottish Fold, dijital aşı kartı ve randevu hatırlatıcı
              ile takip ediliyor.
            </div>

            <div className="hero-card-tag-list">
              <span className="hero-card-tag">Aşı Takvimi</span>
              <span className="hero-card-tag">Kan Tahlili</span>
              <span className="hero-card-tag">Dijital Kayıt</span>
            </div>

            <div className="hero-card-footer">
              <span>Son kontrol: 2 hafta önce</span>
              <span>Bir sonraki: 12 Mart</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
