import React from "react";
import "./ContactSection.css";
import { contactData } from "../../../data/contactData.jsx";

// hideTitle prop'u varsayılan olarak false (yani başlık görünür)
const ContactSection = ({ hideTitle = false }) => {
  const contactInfo = contactData;

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        {/* Eğer hideTitle false ise başlığı göster, true ise gizle */}
        {!hideTitle && (
          <div className="contact-header">
            <h2 className="section-title">Bize Ulaşın</h2>
            <p className="section-subtitle">
              Size ve evcil dostunuza yardımcı olmak için buradayız.
            </p>
          </div>
        )}

        {/* İletişim Kartları */}
        <div className="contact-cards-grid">
          {contactInfo.map((info) => (
            <div key={info.id} className="contact-card">
              <div className="icon-wrapper">{info.icon}</div>
              <h3 className="card-title">{info.title}</h3>
              <p className="card-text">{info.text}</p>
              <span className="card-subtext">{info.subText}</span>
            </div>
          ))}
        </div>

        {/* Harita */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.6504900160863!2d29.0234!3d40.9901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab86260f8626f%3A0x2cb666037a177263!2sKad%C4%B1k%C3%B6y%2C%20Istanbul!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="VetCare Clinic Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
