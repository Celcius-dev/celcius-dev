import React, { useEffect } from "react";
import ContactSection from "../../components/sections/Contact/ContactSection.jsx";
import "./Contact.css"; // Birazdan oluşturacağız

const Contact = () => {
  // Sayfa açılınca en tepeye git
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      {/* Sayfa Başlığı (Banner gibi) */}
      <div className="contact-page-header">
        <div className="container">
          <h1 className="contact-page-title">İletişim</h1>
          <p className="contact-page-desc">
            Acil durumlar, randevu talepleri veya merak ettikleriniz için bize
            ulaşın. 7/24 hizmetinizdeyiz.
          </p>
        </div>
      </div>

      {/* Anasayfadaki İletişim Bölümünü Buraya Gömüyoruz */}
      {/* isPage prop'u göndererek başlığı gizleyebiliriz (opsiyonel) */}
      <ContactSection hideTitle />
    </div>
  );
};

export default Contact;
