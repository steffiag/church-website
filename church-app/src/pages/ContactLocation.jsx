import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactLocation() {
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

  return (
    <div className="App">
      <header className="page-hero">
        <Navbar />
        <div className="page-hero-text">
          <span className="eyebrow">Visit Us</span>
          <h1>Our Location</h1>
        </div>
      </header>

      <section className="contact-section">
        <div className="contact-grid">
          <div className="info-card reveal">
            <span className="eyebrow">Address</span>
            <p>173 North Washington Ave</p>
            <p>Bergenfield, NJ 07621</p>
          </div>


          <div className="info-card reveal">
            <span className="eyebrow">Parking</span>
            <p>Street parking available</p>
            <p>on North Washington Ave</p>
            <p> and the back lot of Staples</p>
          </div>
        </div>

        <div className="contact-map-card reveal">
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

      <Footer />
    </div>
  );
}

export default ContactLocation;