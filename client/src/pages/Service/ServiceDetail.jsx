import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // SEO Eklentisi
import { services } from "../../data/services";
import "./ServiceDetail.css";

const Service = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Scroll Reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 2. Mevcut hizmeti bul
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

  // --- YENİ FONKSİYON: Randevu sayfasına veri taşıma ---
  const handleBookNow = () => {
    // Randevu sayfasına giderken hizmet adını 'state' olarak gönderiyoruz
    navigate("/appointment", { state: { serviceName: service.title } });
  };

  return (
    <article className="service-detail-page">
      {/* --- SEO GÜNCELLEMESİ --- */}
      <Helmet>
        <title>{service.title} | Celcius Veterinarlink</title>
        <meta
          name="description"
          content={`${service.title} hizmetimiz hakkında detaylı bilgi alın.`}
        />
      </Helmet>

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
        <div
          className="service-content"
          dangerouslySetInnerHTML={{
            __html: service.content || `<p>${service.description}</p>`,
          }}
        />

        {/* --- YENİ EKLENEN AKSİYON BUTONU (CTA) --- */}
        <div
          className="service-cta-container"
          style={{ margin: "2rem 0", textAlign: "center" }}
        >
          <button
            className="submit-btn" // Appointment.css'deki stili kullandık veya service css'e ekle
            onClick={handleBookNow}
            style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}
          >
            📅 Bu Hizmet İçin Randevu Al
          </button>
        </div>

        {/* --- ALT NAVİGASYON --- */}
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
            <div></div>
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
