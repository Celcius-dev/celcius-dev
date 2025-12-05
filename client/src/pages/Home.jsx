import Hero from "../components/layout/Hero/Hero.jsx";
import ContactSection from "../components/sections/Contact/ContactSection.jsx";
import IntroSection from "../components/sections/IntroSecton/IntroSection.jsx";
import LatestPosts from "../components/sections/LatestPosts/LatestPosts.jsx";
import ServicesSection from "../components/sections/Services/Services.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <LatestPosts />
      <ContactSection />
    </>
  );
}
