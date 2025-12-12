import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../../assets/logo/logo.svg?react";

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Anasayfada mıyız kontrolü
  const isHome = location.pathname === "/";
  // Sayfa değişirse menüyü kapat
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  }, [location]);
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

  // Menü Aç/Kapa Fonksiyonu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Menü açılınca arkadaki sayfa kaymasın diye body'i kilitliyoruz
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <header className={headerClass}>
      <div className="container site-header-inner">
        {/* --- LOGO --- */}
        <Link to="/" className="site-logo" aria-label="VetCare Anasayfa">
          <Logo className="site-logo-svg" />
        </Link>

        {/* --- DESKTOP NAV (desktop-only sınıfı eklendi) --- */}
        <nav className="site-nav desktop-only">
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

        {/* --- DESKTOP BUTTON (desktop-only sınıfı eklendi) --- */}
        <div className="header-actions desktop-only">
          <button className="header-cta-btn">
            Randevu Al
            <span>↗</span>
          </button>
        </div>

        {/* --- MOBILE BURGER BUTTON (Yeni Eklendi) --- */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Menüyü Aç"
        >
          {/* Hamburger İkonu */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* --- MOBILE MENU OVERLAY / MODAL (Yeni Eklendi) --- */}
        <div
          className={`mobile-menu-overlay ${isMobileMenuOpen ? "open" : ""}`}
        >
          {/* Modal Header: Logo ve Kapat Butonu */}
          <div className="mobile-menu-header">
            <Link to="/" onClick={toggleMenu}>
              {/* Mobilde logo rengini CSS ile yöneteceğiz (header-dark mantığına uyması için) */}
              <Logo className="mobile-logo-svg" />
            </Link>

            {/* Kapat Butonu (X) */}
            <button className="mobile-close-btn" onClick={toggleMenu}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Modal İçeriği */}
          <div className="mobile-menu-content">
            {/* Mobil Linkler */}
            <nav className="mobile-nav">
              <a href="/#services" onClick={toggleMenu}>
                Hizmetler
              </a>
              <a href="/about" onClick={toggleMenu}>
                Hakkımızda
              </a>
              <a href="/blog" onClick={toggleMenu}>
                Blog
              </a>
              <a href="/contact" onClick={toggleMenu}>
                İletişim
              </a>
            </nav>

            {/* Mobil Randevu Butonu (En Altta) */}
            <div className="mobile-menu-footer">
              <button className="header-cta-btn mobile-cta">
                Randevu Al <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
