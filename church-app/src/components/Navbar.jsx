import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ANNOUNCEMENTS = [
  "announcement 1",
  "announcement 2",
];

const FADE_INTERVAL = 3000;

function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const toggleMenu = () => {
    if (menuOpen) setOpenDropdown(null);
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (!showBanner || ANNOUNCEMENTS.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % ANNOUNCEMENTS.length);
    }, FADE_INTERVAL);
    return () => clearInterval(interval);
  }, [showBanner]);

  return (
    <>
      {isHome && showBanner && (
        <div className="announcement-banner">
          <div className="announcement-track">
            {ANNOUNCEMENTS.map((text, i) => (
              <span
                className={`announcement-text ${
                  i === activeIndex ? "is-active" : ""
                }`}
                key={i}
              >
                {text}
              </span>
            ))}
          </div>

          <button
            className="announcement-close"
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss announcement"
          >
            ×
          </button>
        </div>
      )}

      <nav className={`navbar ${menuOpen ? "menu-open" : ""}`} aria-label="Main navigation">
        <div className="logo">
          <Link to="/">
            <img src="/church-logo.png" alt="church" className="logo-img" />
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <ul id="primary-navigation">
          <li><Link to="/">Home</Link></li>

          <li className="nav-item-dropdown">
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("about")}
              aria-expanded={openDropdown === "about"}
            >
              About
            </button>
            <div className={`dropdown-menu ${openDropdown === "about" ? "is-open" : ""}`}>
              <Link to="/about#mission">Mission &amp; Vision</Link>
              <Link to="/about#history">History</Link>
              <Link to="/about#vicar">Vicar</Link>
              <Link to="/about#leadership">Leadership</Link>
            </div>
          </li>

          <li><Link to="/programs">Programs</Link></li>

          <li className="nav-item-dropdown">
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("resources")}
              aria-expanded={openDropdown === "resources"}
            >
              Resources
            </button>
            <div className={`dropdown-menu ${openDropdown === "resources" ? "is-open" : ""}`}>
              <Link to="/resources/calendar">Calendar</Link>
            </div>
          </li>

          <li className="nav-item-dropdown">
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("contact")}
              aria-expanded={openDropdown === "contact"}
            >
              Contact
            </button>
            <div className={`dropdown-menu ${openDropdown === "contact" ? "is-open" : ""}`}>
              <Link to="/contact/location">Location</Link>
              <Link to="/contact/inquiries">Inquiries</Link>
            </div>
          </li>

          <li className="mobile-donate"><Link to="/donate">Donate</Link></li>
        </ul>

        <Link to="/donate" className="donate-btn">
          Donate
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
