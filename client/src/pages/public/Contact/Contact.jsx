import React, { useEffect } from "react";
import ContactSection from "../../../components/sections/Contact/ContactSection.jsx";
import { Helmet } from "react-helmet-async";
import "./Contact.css";

const Contact = () => {
  // Sayfa açılınca en tepeye git
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <Helmet>
        <title>Kontakt | Celcius</title>
        <meta
          name="description"
          content="VetCare Clinic adres, telefon ve konum bilgileri. Acil durumlar veya rutin kontroller için hemen online randevu oluşturun. Kadıköy/İstanbul."
        />
      </Helmet>
      {/* Sayfa Başlığı (Banner gibi) */}
      <div className="contact-page-header" style={{ margin: "10px" }}>
        <div className="container">
          <h1 className="contact-page-title">Kontakt</h1>
          <p className="contact-page-desc">Telefontid: 08.00-17.00</p>
        </div>
      </div>

      {/* Anasayfadaki İletişim Bölümünü Buraya Gömüyoruz */}
      {/* isPage prop'u göndererek başlığı gizleyebiliriz (opsiyonel) */}
      <ContactSection hideTitle />
    </div>
  );
};

export default Contact;
