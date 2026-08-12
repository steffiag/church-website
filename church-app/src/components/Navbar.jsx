import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const FADE_INTERVAL = 3000;

function Navbar() {
  const [announcements, setAnnouncements] = useState([]);
  const [showBanner, setShowBanner] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const hasFetched = useRef(false);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setAnnouncements(data.announcements || []))
      .catch((err) => console.error("Failed to load announcements:", err));
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const toggleMenu = () => {
    if (menuOpen) setOpenDropdown(null);
    setMenuOpen(!menuOpen);
  };

  const closeNavigation = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const clearDropdownFocus = () => {
    if (document.activeElement?.classList.contains("nav-dropdown-toggle")) {
      document.activeElement.blur();
    }
    setOpenDropdown(null);
  };

  useEffect(() => {
    if (!showBanner || announcements.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % announcements.length);
    }, FADE_INTERVAL);
    return () => clearInterval(interval);
  }, [showBanner, announcements]);

  return (
    <>
      {isHome && showBanner && announcements.length > 0 && (
        <div className="announcement-banner">
          <div className="announcement-track">
            {announcements.map((text, i) => (
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
          <span />
          <span />
          <span />
        </button>

        <ul id="primary-navigation">
          <li onMouseEnter={clearDropdownFocus}><Link to="/">Home</Link></li>

          <li className="nav-item-dropdown" onMouseEnter={clearDropdownFocus}>
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("about")}
              aria-expanded={openDropdown === "about"}
            >
              About
            </button>
            <div
              className={`dropdown-menu ${openDropdown === "about" ? "is-open" : ""}`}
              onClick={closeNavigation}
            >
              <Link to="/about#mission">Mission &amp; Vision</Link>
              <Link to="/about#history">History</Link>
              <Link to="/about#patriarch">Patriarch</Link>
              <Link to="/about#archbishop">Archbishop</Link>
              <Link to="/about#vicar">Vicar</Link>
              <Link to="/about#leadership">Leadership</Link>
            </div>
          </li>

          <li onMouseEnter={clearDropdownFocus}><Link to="/programs">Programs</Link></li>

          <li className="nav-item-dropdown" onMouseEnter={clearDropdownFocus}>
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("resources")}
              aria-expanded={openDropdown === "resources"}
            >
              Resources
            </button>
            <div
              className={`dropdown-menu ${openDropdown === "resources" ? "is-open" : ""}`}
              onClick={closeNavigation}
            >
              <Link to="/resources/calendar">Calendar</Link>
            </div>
          </li>

          <li className="nav-item-dropdown" onMouseEnter={clearDropdownFocus}>
            <button
              type="button"
              className="nav-dropdown-toggle"
              onClick={() => toggleDropdown("contact")}
              aria-expanded={openDropdown === "contact"}
            >
              Contact
            </button>
            <div
              className={`dropdown-menu ${openDropdown === "contact" ? "is-open" : ""}`}
              onClick={closeNavigation}
            >
              <Link to="/contact/location#location">Location</Link>
              <Link to="/contact/location#parking">Parking</Link>
              <Link to="/contact/inquiries">Inquiries</Link>
            </div>
          </li>

          <li className="mobile-donate" onMouseEnter={clearDropdownFocus}><Link to="/donate">Donate</Link></li>
        </ul>

        <Link to="/donate" className="donate-btn">
          Donate
        </Link>
      </nav>
    </>
  );
}

export default Navbar;
