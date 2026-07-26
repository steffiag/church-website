import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const ANNOUNCEMENT = "announcement";

function Navbar() {
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {isHome && showBanner && (
        <div className="announcement-banner">
          <span className="announcement-text">{ANNOUNCEMENT}</span>
          <button
            className="announcement-close"
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss announcement"
          >
            ×
          </button>
        </div>
      )}

      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src="/church-logo.png" alt="church" className="logo-img" />
          </Link>
        </div>

        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/programs">Programs</Link></li>

          <li className="nav-item-dropdown">
            <span tabIndex={0}>Resources</span>
            <div className="dropdown-menu">
              <Link to="/resources/calendar">Calendar</Link>
            </div>
          </li>

          <li className="nav-item-dropdown">
            <span tabIndex={0}>Contact</span>
            <div className="dropdown-menu">
              <Link to="/contact/location">Location</Link>
              <Link to="/contact/inquiries">Inquiries</Link>
            </div>
          </li>
        </ul>

        <a
          className="donate-btn"
          href="https://www.paypal.com/US/fundraiser/charity/1916521"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate
        </a>
      </nav>
    </>
  );
}

export default Navbar;