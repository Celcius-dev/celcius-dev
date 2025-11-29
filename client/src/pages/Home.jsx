import Hero from "../components/layout/Hero.jsx";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Şimdilik placeholder sectionlar, ileride dolduracağız */}
      <section
        id="services"
        className="container"
        style={{ padding: "3rem 0" }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Hizmetler</h2>
        <p style={{ color: "var(--color-text-soft)" }}>
          Buraya modern kartlar, ikonlar ve klinikte sunulan hizmetlerin kısa
          açıklamaları gelecek.
        </p>
      </section>

      <section id="about" className="container" style={{ padding: "3rem 0" }}>
        <h2 style={{ marginBottom: "1rem" }}>Hakkımızda</h2>
        <p style={{ color: "var(--color-text-soft)" }}>
          Klinik ekibi, vizyon, misyon ve çalışma saatleri gibi bilgiler burada
          olacak.
        </p>
      </section>

      <section
        id="contact"
        className="container"
        style={{ padding: "3rem 0 4rem" }}
      >
        <h2 style={{ marginBottom: "1rem" }}>İletişim</h2>
        <p style={{ color: "var(--color-text-soft)" }}>
          Adres, telefon, WhatsApp ve basit bir iletişim formu bu alanda yer
          alacak.
        </p>
      </section>
    </>
  );
}
