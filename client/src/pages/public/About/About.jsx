import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import api, { UPLOAD_URL } from "../../../api/axios"; // Backend API bağlantısı
import "./About.css";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Resimlerin sunucu yolu import edildi

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchTeam = async () => {
      try {
        setLoading(true);
        // Backend'den doktorları çek
        const res = await api.get("/doctors");
        setTeamMembers(res.data);
      } catch (error) {
        console.error("Kunde inte hämta teaminformation:", error);
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
            Laddar information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* SEO META ETİKETLERİ */}
      <Helmet>
        <title>Om oss & Vårt Team | Celsius Veterinärklinik</title>
        <meta
          name="description"
          content="På Celsius Veterinärklinik tar vi hand om hundar och katter med samma värme och engagemang som om de vore våra egna."
        />
      </Helmet>

      <div className="about-banner">
        {/* Karartma Overlay */}
        <div className="about-banner-overlay"></div>

        {/* Yazı İçeriği - GÜNCELLENDİ: HAKKIMIZDA KISMI */}
        <div className="about-banner-content">
          <h1 className="about-title">
            Vår filosofi är trygg, <br /> modern och kärleksfull vård
          </h1>
          <p className="about-desc">
            På Celsius Veterinärklinik tar vi hand om hundar och katter med
            samma värme och engagemang som om de vore våra egna. Vår filosofi är
            enkel: djur förtjänar trygg, modern och kärleksfull vård. För oss är
            det viktigt att ha en plats där både djur och djurägare känner sig
            välkomna och sedda.
          </p>
        </div>
      </div>

      <div className="container">
        {/* --- 2. VİZYON & MİSYON --- */}
        <div className="vision-mission-section">
          {/* MİSYON - GÜNCELLENDİ */}
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
            {/* BAŞLIK: Vi arbetar för att ge ditt djur... */}
            <h2 className="vm-title">
              Vi arbetar för att ge ditt djur ett friskare och lyckligare liv
            </h2>
            <div className="vm-text">
              Vi arbetar för att förbättra livskvaliteten för alla sällskapsdjur
              genom:
              {/* Maddeli yapı eklendi */}
              <ul style={{ paddingLeft: "1.2rem", margin: "1rem 0" }}>
                <li>förebyggande vård</li>
                <li>avancerad diagnostik</li>
                <li>tydliga behandlingsplaner</li>
                <li>ett öppet och tryggt bemötande</li>
              </ul>
              Varje djur och varje ägare ska känna sig delaktig i processen.
              Därför prioriterar vi transparens, omtanke och lugna möten,
              oavsett om det gäller en rutinkontroll, en utredning eller ett mer
              akut problem.
            </div>
          </div>

          {/* VİZYON - GÜNCELLENDİ */}
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
            {/* BAŞLIK: Vi vill vara en plats... */}
            <h2 className="vm-title">
              Vi vill vara en plats du och din familj känner er trygga i
            </h2>
            <p className="vm-text">
              Vi strävar efter att vara en veterinärklinik som djurägare tryggt
              rekommenderar vidare. Med modern teknisk utrustning, ett
              omtänksamt bemötande och ett kunnigt veterinärteam vill vi sätta
              en ny standard inom veterinärvård.
              <br />
              <br />
              Målet är att vara en pålitlig, varm och professionell partner
              genom hela ditt djurs liv.
            </p>
          </div>
        </div>

        {/* --- 3. EKİBİMİZ (DİNAMİK) --- */}
        <section className="team-section">
          <div className="team-header">
            {/* BAŞLIK: Vårt team består av... */}
            <h2 className="team-title">
              Vårt team består av erfarna veterinärer med hjärtat på rätt plats
            </h2>
            <p className="team-subtitle">
              Våra veterinärer och sköterskor arbetar tillsammans för att ge
              ditt djur bästa möjliga vård – från första undersökningen till
              sista återbesöket. Teamet brinner för att utvecklas, fördjupa sina
              kunskaper och ge varje patient den trygga och individuella omsorg
              den förtjänar.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member._id} className="team-card">
                <div className="team-img-wrapper">
                  <img
                    // Resim URL Kontrolü
                    src={
                      member.image
                        ? member.image.startsWith("http")
                          ? member.image
                          : UPLOAD_URL + member.image
                        : "https://placehold.co/400x400?text=Veterinär"
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
