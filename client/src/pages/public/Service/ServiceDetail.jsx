import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import api from "../../../api/axios"; // Backend bağlantısı
import { getIconComponent } from "../../../utils/iconHelper"; // İkon çevirici
import "./ServiceDetail.css";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [prevService, setPrevService] = useState(null);
  const [nextService, setNextService] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Verileri Çek ve İlgili Hizmeti Bul
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchServiceData = async () => {
      try {
        setLoading(true);
        // Tüm hizmetleri çekiyoruz (Önceki/Sonraki mantığı için)
        const res = await api.get("/services");
        const allServices = res.data;

        // Şu anki hizmetin indexini bul (_id ile)
        const currentIndex = allServices.findIndex((s) => s._id === id);

        if (currentIndex === -1) {
          setService(null);
        } else {
          setService(allServices[currentIndex]);
          // Önceki ve Sonraki hizmetleri belirle
          setPrevService(allServices[currentIndex - 1] || null);
          setNextService(allServices[currentIndex + 1] || null);
        }
      } catch (error) {
        console.error("Hizmet detayı yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  // Randevu sayfasına yönlendirme
  const handleBookNow = () => {
    if (service) {
      navigate("/appointment", { state: { serviceName: service.title } });
    }
  };

  // Yükleniyor Durumu
  if (loading) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "8rem 0" }}
      >
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Hizmet Bulunamadı Durumu
  if (!service) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "8rem 0" }}
      >
        <Helmet>
          <title>Hizmet Bulunamadı | Celcius Veterinarlink</title>
        </Helmet>
        <h2>Aradığınız hizmet bulunamadı.</h2>
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

  // İkon Bileşenini Hazırla
  const IconComponent = getIconComponent(service.icon);

  return (
    <article className="service-detail-page">
      {/* --- SEO --- */}
      <Helmet>
        <title>{service.title} | VetCare Hizmetlerimiz</title>
        <meta
          name="description"
          content={
            service.summary ||
            `${service.title} hizmetimiz hakkında detaylı bilgi.`
          }
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

        {/* --- GÖRSEL ALANI (İKON KULLANIYORUZ) --- */}
        {/* Backend modelinde resim upload yok, ikon var. O yüzden şık bir ikon alanı yapıyoruz */}
        <div
          className="service-image-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f8fafc",
            padding: "3rem",
          }}
        >
          <div style={{ color: "#2563eb" }}>
            <IconComponent size={120} strokeWidth={1} />
          </div>
        </div>

        {/* --- İÇERİK (HTML) --- */}
        <div
          className="service-content ql-editor" // ql-editor class'ı Quill stillerini korur
          dangerouslySetInnerHTML={{
            __html: service.content,
          }}
        />

        {/* --- AKSİYON BUTONU (CTA) --- */}
        <div
          className="service-cta-container"
          style={{ margin: "3rem 0", textAlign: "center" }}
        >
          <button
            onClick={handleBookNow}
            style={{
              padding: "1rem 2.5rem",
              fontSize: "1.1rem",
              fontWeight: "bold",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(37, 99, 235, 0.3)",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            📅 Bu Hizmet İçin Randevu Al
          </button>
        </div>

        {/* --- ALT NAVİGASYON --- */}
        <nav className="service-navigation-bottom">
          {prevService ? (
            <div
              className="nav-btn prev"
              onClick={() => navigate(`/services/${prevService._id}`)}
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
              onClick={() => navigate(`/services/${nextService._id}`)}
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

export default ServiceDetail;
