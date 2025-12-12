import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Services.css";

// GEÇİCİ VERİ (Backend bağlanınca bu importu kaldırabilirsin)
import { services as staticServices } from "../../../data/services";

const ServicesSection = () => {
  // 1. STATE TANIMLAMALARI
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. VERİ ÇEKME İŞLEMİ (Simülasyon)
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        // --- GERÇEK BACKEND SENARYOSU ---
        // const response = await axios.get('https://api.vetcare.com/services');
        // setServices(response.data);

        // --- SİMÜLASYON ---
        // 1.5 saniye bekleme süresi
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Veriyi state'e at
        setServices(staticServices);
      } catch (err) {
        console.error("Hizmetler yüklenirken hata:", err);
        setError("Hizmet listesi yüklenirken bir sorun oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // 3. YÜKLENİYOR EKRANI
  if (loading) {
    return (
      <section className="services-section" id="services">
        <div
          className="container"
          style={{ textAlign: "center", padding: "6rem 0" }}
        >
          <div className="loading-spinner"></div>
          <p
            style={{ marginTop: "1rem", color: "var(--color-text-secondary)" }}
          >
            Hizmetler yükleniyor...
          </p>
        </div>
      </section>
    );
  }

  // 4. HATA EKRANI
  if (error) {
    return (
      <section className="services-section" id="services">
        <div
          className="container"
          style={{ textAlign: "center", color: "#ef4444", padding: "4rem 0" }}
        >
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              border: "1px solid #ef4444",
              borderRadius: "8px",
              background: "transparent",
              color: "#ef4444",
              cursor: "pointer",
            }}
          >
            Tekrar Dene
          </button>
        </div>
      </section>
    );
  }

  // 5. BAŞARILI DURUM
  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Başlık Alanı */}
        <div className="services-header">
          <h2 className="section-title">Hizmetlerimiz</h2>
          <p className="section-subtitle">
            Modern tıbbın tüm imkanlarını, sevgi ve ilgiyle birleştirerek
            sunuyoruz.
          </p>
        </div>

        {/* Grid Kartlar */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrapper">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>

              {/* Detay sayfasına yönlendirme */}
              <Link to={`/services/${service.id}`} className="service-link">
                Detaylı Bilgi <span className="arrow">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
