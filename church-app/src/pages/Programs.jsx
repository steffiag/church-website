import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const programs = [
  {
    title: "Sunday School",
    time: "Every Sunday",
    description:
      "Religious education held for kids up to 10th grade, held after Holy Qurbana each week",
  },
  {
    title: "Youth Group",
    time: "Meets Monthly",
    description:
      "A community for youth to discuss faith and ways to become more active in the church through fundraising and events",
  },
];

function Programs() {
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
          <span className="eyebrow">Get Involved</span>
          <h1>Ministries & Programs</h1>
        </div>
      </header>

      <section className="programs-section">
        <div className="programs-grid">
          {programs.map((program, i) => (
            <div className="program-card reveal" key={program.title}>
              <span className="program-time">{program.time}</span>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Programs;
