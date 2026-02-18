import Hero from "../../components/ui/Hero/Hero.jsx";
import ContactSection from "../../components/sections/Contact/ContactSection.jsx";
import IntroSection from "../../components/sections/IntroSecton/IntroSection.jsx";
import LatestPosts from "../../components/sections/LatestPosts/LatestPosts.jsx";
import ServicesSection from "../../components/sections/Services/Services.jsx";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Celcius Klinik | Malmö Veterinärklinik & Akutmottagning</title>
        <meta
          name="description"
          content="Modern veterinärklinik i Malmö öppen dygnet runt. Vi erbjuder vaccinationer, kirurgi, laboratorium och akutvård."
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
