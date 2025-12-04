import "./Header.css";
import VetLogo from "../../../assets/AnimatedVetLogo.svg";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <div className="site-logo">
          <img
            src={VetLogo}
            alt="VetCare Logo"
            className="site-logo-svg"
            style={{ width: "60px", height: "auto", marginRight: "10px" }}
          />
          <div>
            <div className="site-logo-text-main">Celcius Clinic</div>
            <div className="site-logo-text-sub">
              Modern veterinary & pet wellness
            </div>
          </div>
        </div>

        <nav className="site-nav">
          <div className="site-nav-links">
            <a href="#services" className="site-nav-link">
              Hizmetler
            </a>
            <a href="#about" className="site-nav-link">
              Hakkımızda
            </a>
            <a href="#patients" className="site-nav-link">
              Hastalar
            </a>
            <a href="#contact" className="site-nav-link">
              İletişim
            </a>
          </div>
        </nav>
        <button className="header-cta-btn">
          Randevu Al
          <span>↗</span>
        </button>
      </div>
    </header>
  );
}
