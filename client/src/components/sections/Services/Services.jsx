import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import { getIconComponent } from "../../../utils/iconHelper";
import "./Services.css";

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        // Backend'den gerçek veriyi çekiyoruz
        const response = await api.get("/services");
        setServices(response.data);
      } catch (err) {
        console.error("Hizmetler yüklenirken hata:", err);
        setError("Hizmet listesi şu an görüntülenemiyor.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Yükleniyor Durumu
  if (loading) {
    return (
      <section className="services-section" id="services">
        <div
          className="container"
          style={{ textAlign: "center", padding: "6rem 0" }}
        >
          <div className="loading-spinner"></div>
          <p style={{ marginTop: "1rem", color: "#666" }}>
            Hizmetler yükleniyor...
          </p>
        </div>
      </section>
    );
  }

  // Hata Durumu
  if (error) {
    return (
      <section className="services-section" id="services">
        <div
          className="container"
          style={{ textAlign: "center", padding: "4rem 0" }}
        >
          <p style={{ color: "#ef4444" }}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section" id="services">
      <div className="container">
        {/* Bölüm Başlığı */}
        <div className="services-header">
          <h2 className="section-title">Hizmetlerimiz</h2>
          <p className="section-subtitle">
            Modern tıbbın tüm imkanlarını, sevgi ve ilgiyle birleştirerek
            sunuyoruz.
          </p>
        </div>

        {/* Hizmet Kartları Grid */}
        <div className="services-grid">
          {services.map((service) => {
            // Veritabanındaki ikon ismini (String) React Bileşenine çevir
            const IconComponent = getIconComponent(service.icon);

            return (
              <div key={service._id} className="service-card">
                <div className="service-icon-wrapper">
                  {/* Dinamik İkon */}
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>

                <h3 className="service-title">{service.title}</h3>

                {/* Kartta sadece summary (kısa özet) gösterilir */}
                <p className="service-desc">{service.summary}</p>

                {/* Detay sayfasına git (ID ile) */}
                <Link to={`/services/${service._id}`} className="service-link">
                  Detaylı Bilgi <span className="arrow">→</span>
                </Link>
              </div>
            );
          })}

          {/* Eğer hiç hizmet yoksa */}
          {services.length === 0 && (
            <div
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                padding: "2rem",
                color: "#999",
              }}
            >
              Henüz hizmet eklenmemiş.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Service;
