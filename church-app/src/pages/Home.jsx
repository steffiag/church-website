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
          <p>(201) 374-2210</p>
        </div>
      </section>

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
