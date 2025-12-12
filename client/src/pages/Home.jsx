import Hero from "../components/layout/Hero/Hero.jsx";
import ContactSection from "../components/sections/Contact/ContactSection.jsx";
import IntroSection from "../components/sections/IntroSecton/IntroSection.jsx";
import LatestPosts from "../components/sections/LatestPosts/LatestPosts.jsx";
import ServicesSection from "../components/sections/Services/Services.jsx";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>VetCare Clinic | Kadıköy Veteriner Kliniği & 7/24 Acil</title>
        <meta
          name="description"
          content="İstanbul Kadıköy'de 7/24 hizmet veren modern veteriner kliniği. Aşı takibi, cerrahi operasyonlar, laboratuvar ve acil müdahale hizmetleri."
        />
      </Helmet>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <LatestPosts />
      <ContactSection />
    </>
  );
}
