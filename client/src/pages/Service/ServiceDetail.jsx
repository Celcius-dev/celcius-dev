import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { services } from "../../data/services"; // Veri dosyan
import "./ServiceDetail.css";

const Service = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Scroll Reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 2. Mevcut hizmeti bul
  // URL'den gelen id string olduğu için Number'a çeviriyoruz
  const currentServiceIndex = services.findIndex((s) => s.id === Number(id));
  const service = services[currentServiceIndex];

  // Hizmet bulunamazsa
  if (!service) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "6rem 0" }}
      >
        <h2>Hizmet bulunamadı.</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            border: "1px solid var(--color-border)",
            background: "transparent",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Anasayfaya Dön
        </button>
      </div>
    );
  }

  // 3. Önceki ve Sonraki Hizmetleri Hesapla
  const prevService = services[currentServiceIndex - 1];
  const nextService = services[currentServiceIndex + 1];

  return (
    <article className="service-detail-page">
      <div className="service-container">
        {/* --- ÜST NAVİGASYON --- */}
        <div className="service-navigation-top">
          <div className="back-link" onClick={() => navigate("/")}>
            ← Anasayfa
          </div>
        </div>

        {/* --- BAŞLIK ALANI --- */}
        <header className="service-header">
          <h1 className="service-title-main">{service.title}</h1>
        </header>

        {/* --- GÖRSEL --- */}
        {service.image && (
          <div className="service-image-container">
            <img
              src={service.image}
              alt={service.title}
              className="service-featured-image"
            />
          </div>
        )}

        {/* --- İÇERİK --- */}
        {/* HTML etiketlerini işlemek için */}
        <div
          className="service-content"
          dangerouslySetInnerHTML={{
            __html: service.content || `<p>${service.description}</p>`,
          }}
        />

        {/* --- ALT NAVİGASYON (Önceki/Sonraki) --- */}
        <nav className="service-navigation-bottom">
          {prevService ? (
            <div
              className="nav-btn prev"
              onClick={() => navigate(`/services/${prevService.id}`)}
            >
              <span className="nav-label">← Önceki Hizmet</span>
              <span className="nav-title">{prevService.title}</span>
            </div>
          ) : (
            <div></div> // Boşluk koruyucu
          )}

          {nextService && (
            <div
              className="nav-btn next"
              onClick={() => navigate(`/services/${nextService.id}`)}
            >
              <span className="nav-label">Sonraki Hizmet →</span>
              <span className="nav-title">{nextService.title}</span>
            </div>
          )}
        </nav>
      </div>
    </article>
  );
};

export default Service;
