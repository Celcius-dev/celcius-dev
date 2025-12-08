import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../../assets/logo/logo.svg?react";

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Anasayfada mıyız kontrolü
  const isHome = location.pathname === "/";

  // Scroll olayını dinle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const headerClass = `site-header ${
    !isHome || isScrolled ? "header-dark" : ""
  }`;

  return (
    <header className={headerClass}>
      <div className="container site-header-inner">
        {/* LOGO */}

        <Link to="/" className="site-logo" aria-label="VetCare Anasayfa">
          <Logo className="site-logo-svg" />
        </Link>

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
