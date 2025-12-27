import React, { useState, useEffect } from "react";
import api from "../../../api/axios";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import "./ContactSection.css";

const ContactSection = ({ hideTitle = false }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data);
      } catch (error) {
        console.error("İletişim bilgileri alınamadı", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) return null;

  // --- DİNAMİK LİNKLERİ OLUŞTURUYORUZ ---

  // 1. Telefon Linki (Boşlukları temizle: "+90 555" -> "+90555")
  const phoneLink = settings?.phone
    ? `tel:${settings.phone.replace(/\s+/g, "")}`
    : "#";

  // 2. Mail Linki
  const mailLink = settings?.email ? `mailto:${settings.email}` : "#";

  // 3. Harita Linki (Google Maps'te adresi arat)
  const addressLink = settings?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        settings.address
      )}`
    : "#";

  const contactInfo = [
    {
      id: 1,
      icon: <Phone size={32} strokeWidth={1.5} />,
      title: "Telefon",
      text: settings?.phone || "Numara Girilmemiş",
      subText: "Hemen Aramak İçin Tıklayın", // Kullanıcıyı yönlendiren metin
      link: phoneLink, // Link eklendi
      isExternal: false, // Yeni sekmede açılmasın
    },
    {
      id: 2,
      icon: <Mail size={32} strokeWidth={1.5} />,
      title: "E-Posta",
      text: settings?.email || "info@klinik.com",
      subText: "Mail Göndermek İçin Tıklayın",
      link: mailLink,
      isExternal: false,
    },
    {
      id: 3,
      icon: <MapPin size={32} strokeWidth={1.5} />,
      title: "Adres",
      text: settings?.address || "Adres Bilgisi Yok",
      subText: "Yol Tarifi Al",
      link: addressLink,
      isExternal: true, // Harita yeni sekmede açılsın
    },
    {
      id: 4,
      icon: <Clock size={32} strokeWidth={1.5} />,
      title: "Çalışma Saatleri",
      text: `Hafta İçi: ${settings?.hours?.weekdayStart || "09:00"} - ${
        settings?.hours?.weekdayEnd || "18:00"
      }`,
      subText: `Hafta Sonu: ${settings?.hours?.weekendStart || "10:00"} - ${
        settings?.hours?.weekendEnd || "15:00"
      }`,
      link: null, // Saatler tıklanabilir değil
    },
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        {!hideTitle && (
          <div className="contact-header">
            <h2 className="section-title">Bize Ulaşın</h2>
            <p className="section-subtitle">
              Size ve evcil dostunuza yardımcı olmak için buradayız.
            </p>
          </div>
        )}

        <div className="contact-cards-grid">
          {contactInfo.map((info) => {
            // Eğer link varsa 'a' etiketi, yoksa 'div' kullanıyoruz
            const CardWrapper = info.link ? "a" : "div";

            return (
              <CardWrapper
                key={info.id}
                href={info.link}
                target={info.isExternal ? "_blank" : undefined}
                rel={info.isExternal ? "noopener noreferrer" : undefined}
                className={`contact-card ${
                  info.link
                    ? "cursor-pointer hover:shadow-lg transition-shadow"
                    : ""
                }`}
                // Link olmayan kartlarda tıklama görüntüsünü engellemek için
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="icon-wrapper">{info.icon}</div>
                <h3 className="card-title">{info.title}</h3>
                <p className="card-text">{info.text}</p>
                <span className="card-subtext">{info.subText}</span>
              </CardWrapper>
            );
          })}
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1127.0754007480407!2d13.033401456905093!3d55.59938909322886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a3d877560297%3A0x331dfc0bf198a8a4!2zQ2Vsc2l1c2dhdGFuIDQwLCAyMTIgMTQgTWFsbcO2LCDEsHN2ZcOn!5e0!3m2!1str!2str!4v1766842070984!5m2!1str!2str"
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
