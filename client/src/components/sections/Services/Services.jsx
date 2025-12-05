import React from "react";
import { services } from "../../../data/services";
import "./Services.css";

const ServicesSection = () => {
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

              <a href="/services" className="service-link">
                Detaylı Bilgi <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
