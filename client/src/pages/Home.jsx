import Hero from "../components/layout/Hero/Hero.jsx";
import ContactSection from "../components/sections/Contact/ContactSection.jsx";
import IntroSection from "../components/sections/IntroSecton/IntroSection.jsx";
import LatestPosts from "../components/sections/LatestPosts/LatestPosts.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
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
      <LatestPosts />

      <ContactSection />
    </>
  );
}
