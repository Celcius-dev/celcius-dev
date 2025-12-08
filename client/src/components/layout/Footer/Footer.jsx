import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../../../assets/logo/logo.svg?react"; // Logoyu buradan çekiyoruz

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        {/* ÜST KISIM (GRID) */}
        <div className="footer-top">
          {/* 1. KOLON: Marka & Hakkında */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
              <Logo className="footer-logo-svg" />
            </Link>
            <div className="social-links">
              <a href="#" aria-label="Instagram" className="social-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="social-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* 2. KOLON: Hızlı Linkler */}
          <div className="footer-col">
            <h3 className="footer-title">Kurumsal</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Anasayfa</Link>
              </li>
              <li>
                <Link to="/about">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/blog">Blog & Haberler</Link>
              </li>
              <li>
                <Link to="/contact">İletişim</Link>
              </li>
              <li>
                <Link to="/appointment">Randevu Al</Link>
              </li>
            </ul>
          </div>

          {/* 3. KOLON: Hizmetler (SEO için önemli) */}
          <div className="footer-col">
            <h3 className="footer-title">Hizmetlerimiz</h3>
            <ul className="footer-links">
              <li>
                <Link to="/services">Genel Muayene</Link>
              </li>
              <li>
                <Link to="/services">Aşı Takvimi</Link>
              </li>
              <li>
                <Link to="/services">Cerrahi Operasyonlar</Link>
              </li>
              <li>
                <Link to="/services">Diş Bakımı</Link>
              </li>
              <li>
                <Link to="/services">Acil Müdahale</Link>
              </li>
            </ul>
          </div>

          {/* 4. KOLON: İletişim & Saatler */}
          <div className="footer-col contact-col">
            <h3 className="footer-title">İletişim</h3>
            <ul className="contact-list">
              <li>
                <span className="contact-icon">📍</span>
                <span>Veterinärgatan 123, Stockholm</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>08-123 456 78</span>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <span>info@vetcare.se</span>
              </li>
            </ul>

            <div className="working-hours">
              <h4 className="wh-title">Çalışma Saatleri</h4>
              <p>
                Pzt - Cum: <span>08:00 - 18:00</span>
              </p>
              <p>
                Cmt: <span>09:00 - 15:00</span>
              </p>
              <p className="closed">Pazar: Kapalı</p>
            </div>
          </div>
        </div>

        {/* ALT KISIM (COPYRIGHT) */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} VetCare Clinic. Tüm hakları saklıdır.</p>
          <div className="footer-legal">
            <Link to="/privacy">Gizlilik Politikası</Link>
            <Link to="/terms">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
