import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import api from "../../../api/axios"; // Backend API bağlantısı
import "./About.css";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Resimlerin sunucu yolu
  const UPLOAD_URL = "https://celcius-dev.vercel.app/uploads/";

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchTeam = async () => {
      try {
        setLoading(true);
        // Backend'den doktorları çek
        const res = await api.get("/doctors");
        setTeamMembers(res.data);
      } catch (error) {
        console.error("Ekip bilgileri yüklenemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <div className="about-page">
        <div
          className="container"
          style={{ textAlign: "center", paddingTop: "10rem" }}
        >
          <div className="loading-spinner"></div>
          <p
            style={{ marginTop: "1rem", color: "var(--color-text-secondary)" }}
          >
            Ekip bilgileri yükleniyor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* SEO META ETİKETLERİ */}
      <Helmet>
        <title>Hakkımızda & Hekim Kadromuz | VetCare Clinic</title>
        <meta
          name="description"
          content="VetCare Clinic'in uzman veteriner hekim kadrosu ile tanışın. 2010'dan beri modern tıbbi altyapımız ve sevgi dolu yaklaşımımızla dostlarınızın yanındayız."
        />
      </Helmet>

      <div className="about-banner">
        {/* Arka Plan Resmi */}
        <img
          src="https://images.unsplash.com/photo-1700665537650-1bf37979aae0?q=80&w=2072&auto=format&fit=crop"
          alt="VetCare Ekibi"
          className="about-banner-bg"
        />

        {/* Karartma Overlay */}
        <div className="about-banner-overlay"></div>

        {/* Yazı İçeriği */}
        <div className="about-banner-content">
          <h1 className="about-title">Hakkımızda</h1>
          <p className="about-desc">
            VetCare Clinic olarak 2010 yılından beri minik dostlarınızın sağlığı
            ve mutluluğu için çalışıyoruz. Modern tıbbın imkanlarını, hayvan
            sevgisiyle harmanlayarak güvenilir bir sağlık hizmeti sunuyoruz.
          </p>
        </div>
      </div>

      <div className="container">
        {/* --- 2. VİZYON & MİSYON --- */}
        <div className="vision-mission-section">
          {/* MİSYON */}
          <div className="vm-card">
            <div className="vm-icon-wrapper">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="vm-title">Misyonumuz</h2>
            <p className="vm-text">
              Evcil hayvanların yaşam kalitesini artırmak için koruyucu hekimlik
              ve ileri tanı yöntemlerini ulaşılabilir kılmak. Hasta ve hasta
              yakını memnuniyetini en üst düzeyde tutarak şeffaf bir tedavi
              süreci yürütmek.
            </p>
          </div>

          {/* VİZYON */}
          <div className="vm-card">
            <div className="vm-icon-wrapper">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h2 className="vm-title">Vizyonumuz</h2>
            <p className="vm-text">
              Türkiye'de veteriner hekimlik standartlarını yükselten, teknolojik
              altyapısı ve uzman kadrosuyla referans gösterilen öncü bir sağlık
              merkezi olmak.
            </p>
          </div>
        </div>

        {/* --- 3. EKİBİMİZ (DİNAMİK) --- */}
        <section className="team-section">
          <div className="team-header">
            <h2 className="team-title">Uzman Kadromuz</h2>
            <p className="team-subtitle">
              Sizlere en iyi hizmeti sunmak için çalışan uzman hekim kadromuz.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member._id} className="team-card">
                <div className="team-img-wrapper">
                  <img
                    // Resim URL Kontrolü (Dış Link mi, Upload mu?)
                    src={
                      member.image
                        ? member.image.startsWith("http")
                          ? member.image
                          : UPLOAD_URL + member.image
                        : "https://placehold.co/400x400?text=Hekim"
                    }
                    alt={member.name}
                    className="team-img"
                    loading="lazy"
                  />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-role">{member.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
