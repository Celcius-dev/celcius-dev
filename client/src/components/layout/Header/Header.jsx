import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import VetLogo from "../../../assets/AnimatedVetLogo.svg";

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Anasayfada mıyız kontrolü
  const isHome = location.pathname === "/";

  // Scroll olayını dinle (Opsiyonel ama şık durur: aşağı inince header beyazlaşsın)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hangi sınıfları kullanacağız?
  // Eğer anasayfa değilse VEYA scroll yapıldıysa "header-dark" olsun
  const headerClass = `site-header ${
    !isHome || isScrolled ? "header-dark" : ""
  }`;

  return (
    <header className={headerClass}>
      <div className="container site-header-inner">
        {/* LOGO */}
        <div className="site-logo">
          <img
            src={VetLogo}
            alt="VetCare Logo"
            className="site-logo-svg"
            style={{ width: "60px", height: "auto", marginRight: "10px" }}
          />
          <div>
            <div className="site-logo-text-main">VetCare Clinic</div>
            <div className="site-logo-text-sub">
              Modern veterinary & pet wellness
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="site-nav">
          <div className="site-nav-links">
            <a href="/#services" className="site-nav-link">
              Hizmetler
            </a>
            <a href="/about" className="site-nav-link">
              Hakkımızda
            </a>
            <a href="/blog" className="site-nav-link">
              Blog
            </a>
            <a href="/contact" className="site-nav-link">
              İletişim
            </a>
          </div>
        </nav>

        {/* BUTTON */}
        <button className="header-cta-btn">
          Randevu Al
          <span>↗</span>
        </button>
      </div>
    </header>
  );
}
