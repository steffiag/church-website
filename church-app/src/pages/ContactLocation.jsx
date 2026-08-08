import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactLocation() {
  const location = useLocation();

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="App">
      <header className="page-hero">
        <Navbar />
        <div className="page-hero-text">
          <span className="eyebrow">Visit Us</span>
          <h1>Our Location</h1>
        </div>
      </header>

      <section id="location" className="location-section reveal">
        <div className="location-section-inner">
          <h2>Address</h2>
          <div className="about-body">
            <p>173 North Washington Ave</p>
            <p>Bergenfield, NJ 07621</p>
          </div>
        </div>
        <div className="location-full-image">
          <iframe
            title="Church location map"
            src="https://www.google.com/maps?q=173+N+Washington+Ave,+Bergenfield,+NJ+07621&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section id="parking" className="location-section location-section-alt reveal">
        <div className="location-section-inner">
          <h2>Parking</h2>
        </div>
        <div className="location-full-image">
          <img src="/parking.jpg" alt="Parking map" />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactLocation;