import React from "react";
import "./ContactSection.css";
import { contactData } from "../../../data/contactData.jsx";

const ContactSection = () => {
  const contactInfo = contactData;

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-header">
          <h2 className="section-title">Bize Ulaşın</h2>
          <p className="section-subtitle">
            Size ve evcil dostunuza yardımcı olmak için buradayız.
          </p>
        </div>

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

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d130266.40228399768!2d17.94056157018305!3d59.32932349887754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f763119640bcb%3A0xa80d27d3679d7766!2sStockholm%2C%20%C4%B0sve%C3%A7!5e0!3m2!1str!2str!4v1701696000000!5m2!1str!2str"
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
