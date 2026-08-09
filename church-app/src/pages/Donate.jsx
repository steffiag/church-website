import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Donate() {
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
          <h1>Donate</h1>
        </div>
      </header>

      <section className="donate-section reveal">
        <div className="donate-grid">
          <div className="donate-card">
            <span className="donate-card-eyebrow">Give Online</span>
            <h2>PayPal</h2>
            <img src="/paypal.png" alt="QR Code" className="qr-img" />
            <a
              href="https://www.paypal.com/US/fundraiser/charity/1916521"
              target="_blank"
              rel="noopener noreferrer"
              className="donate-card-btn"
            >
              Donate via PayPal
            </a>
          </div>

          <div className="donate-card">
            <span className="donate-card-eyebrow">Bank Transfer</span>
            <h2>Zelle</h2>
            <img src="/donate.png" alt="QR Code" className="qr-img" />
            <div className="donate-card-detail">
              stmarysbergen
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Donate;
