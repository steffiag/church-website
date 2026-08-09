import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


const fallbackCarouselImages = [
  "/church-exterior.png",
];

function Home() {
  const [slide, setSlide] = useState(0);
  const [carouselPhotos, setCarouselPhotos] = useState(fallbackCarouselImages);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [fliers, setFliers] = useState([]);
  const [flierSlide, setFlierSlide] = useState(0);
  const [fliersPaused, setFliersPaused] = useState(false);

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
  }, [upcomingEvents, carouselPhotos]);

  useEffect(() => {
    const loadChurchData = async () => {
      try {
        const res = await fetch("/api/cloud");
        if (!res.ok) {
          const error = await res.json().catch(() => ({}));
          throw new Error(error.error || "Failed to load church data");
        }
        const data = await res.json();

        if (data.photos?.length > 0) {
          setCarouselPhotos(data.photos);
          setSlide(0);
        }
        setUpcomingEvents(data.events || []);
        setFliers(data.fliers || []);
      } catch (err) {
        console.error(err);
      }
    };

    loadChurchData();
  }, []);

  useEffect(() => {
    if (carouselPhotos.length <= 1) return;
    const interval = setInterval(() => {
      setSlide((s) => (s + 1) % carouselPhotos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselPhotos.length]);

  useEffect(() => {
    if (fliers.length <= 1 || fliersPaused) return;
    const interval = setInterval(() => {
      setFlierSlide((s) => (s + 1) % fliers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [fliers.length, fliersPaused]);

  function formatEventDate(event) {
    const date = new Date(event.start?.dateTime || event.start?.date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  function formatEventTime(event) {
    if (!event.start?.dateTime) return "All Day";

    return new Date(event.start.dateTime).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div className="App">
      <header className="hero">
        <Navbar />
        <div className="hero-text">
          <span className="eyebrow">Bergenfield, NJ</span>
          <h1>
            St. Mary's Syriac
            <br />
            Orthodox Church
          </h1>
          <p>"Enter into His gates with thanksgiving" — Psalm 100:4</p>
        </div>
      </header>

      <section className="info-row">
        <div className="info-card reveal">
          <span className="eyebrow">Location</span>
          <p>173 N Washington Ave</p>
          <p>Bergenfield, NJ 07621</p>
        </div>
        <div className="info-card reveal">
          <span className="eyebrow">Timing</span>
          <p>8:15 AM — Morning Prayer</p>
          <p>9:00 AM — Holy Qurbana</p>
          <p>11:30 AM — Sunday School</p>
        </div>
        <div className="info-card reveal">
          <span className="eyebrow">Contact</span>
          <p><a href="mailto:stmarysbergen@gmail.com" className="email-link">stmarysbergen@gmail.com</a></p>
          <Link to="/about/#leadership" className="contact-btn">
          Call Us
        </Link>
        </div>
      </section>

      {fliers.length > 0 && (
        <section className="fliers-section reveal">
          <div
            className="fliers-carousel"
            onClick={() => setFliersPaused((p) => !p)}
          >
            <div className="carousel-track">
              {fliers.map((flier, i) => (
                <img
                  key={flier.src}
                  src={flier.src}
                  alt={flier.alt || "Church announcement flier"}
                  className={`carousel-img ${
                    fliers.length === 1 || i === flierSlide ? "active" : ""
                  }`}
                />
              ))}
            </div>
            {fliersPaused && (
              <div className="fliers-paused-indicator" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              </div>
            )}
            {fliers.length > 1 && (
              <div className="carousel-dots">
                {fliers.map((_, i) => (
                  <button
                    key={i}
                    className={`dot ${i === flierSlide ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setFlierSlide(i);
                    }}
                    aria-label={`Go to flier ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="events">
        <div className="events-heading reveal">
          <h2>Upcoming <br />Events</h2>
        </div>
        <div className="event-cards">
          {upcomingEvents.slice(0, 3).map((event) => (
          <Link
            to="/resources/calendar"
            className="event-card reveal"
            key={event.id}
          >
            <span className="event-date">{formatEventDate(event)}</span>
            <span className="event-time">{formatEventTime(event)}</span>
            <span className="event-name">
              {event.summary || "Untitled Event"}
            </span>
          </Link>
        ))}
        </div>
      </section>

      <section className="church-carousel reveal">
        <div className="carousel-track">
          {carouselPhotos.map((photo, i) => (
            <img
              key={photo.src || photo}
              src={photo.src || photo}
              alt={photo.alt || `St. Mary's Syrian Orthodox Church ${i + 1}`}
              className={`carousel-img ${i === slide ? "active" : ""}`}
            />
          ))}
        </div>
        <span className="join-us">Join Us</span>
        <div className="carousel-dots">
          {carouselPhotos.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === slide ? "active" : ""}`}
              onClick={() => setSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
