import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
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
          <span className="eyebrow">Our Story</span>
          <h1>About St. Mary's</h1>
        </div>
      </header>

      <section className="about-section reveal">
        <div className="about-split">
          <div className="about-text">
            <h2>Our Mission</h2>
            <div className="about-body">
              <p>
                St. Mary's Syrian Orthodox Church in Bergenfield, New Jersey
                is part of the Malankara Archdiocese in North America, under
                the ecclesiastical jurisdiction of His Holiness the Patriarch
                of Antioch and All the East, Moran Mor Ignatius Aphrem II, the
                Supreme Head of the Universal Syrian Orthodox Church.
              </p>
              <p>
                We uphold the Syrian Orthodox tradition and use
                Syriac-Aramaic — the language spoken by Christ — as the root
                of our liturgy. Here, we declare our mission to live and
                spread the peace, love, and hope of our Lord and God, Jesus
                Christ. We are passionately committed to the world and to the
                faithful of the church, to enrich their spiritual and
                religious experience.
              </p>
            </div>
          </div>
          <div className="about-image-slot">
            <img src="/Christ.png" />
          </div>
        </div>
      </section>

      <section className="about-section about-section-alt reveal">
        <div className="about-split">
          <div className="about-image-slot">
            <img src="/church-ppl.jpg" />
          </div>
          <div className="about-text">
            <h2>Our History</h2>
            <div className="about-body">
              <p>
                On May 17, 2008, H.E. Mor Titus Yeldho, Archbishop and
                Patriarchal Vicar of the Malankara Archdiocese in North
                America, celebrated the first Holy Eucharist in the presence
                of H.E. Mor Karim Koorilos, Archbishop of Eastern America,
                along with clergy and laity of the Tri-State Malayalee
                community, at St. Mark's Cathedral in Teaneck, NJ — marking
                the birth of this congregation.
              </p>
              <p>
                We thank the unequaled leadership of Rev. Fr. Dr. A.P.
                George, Very Rev. Geevarghese Puthoorkudilil, Rev. Fr. Joseph
                Varghese, Rev. Fr. Dr. Paul T. Parambath, Rev. Fr.
                Eldhose K.P., and Rev. Fr. Geevarghese Jacob who empowered
                this small herd of faithful to grow in faith and communion.
              </p>
              <p>
                On January 31, 2012, we purchased the beautiful church and
                property located at 173 North Washington Ave, Bergenfield,
                NJ, from St. Matthew's Evangelical Lutheran Church — a home
                for our growing parish that continues to be our spiritual
                home today.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section reveal">
        <div className="about-split">
          <div className="about-text">
            <h2>Current Leadership</h2>
            <div className="leadership-card">
              <div className="leadership-info">
                <h3>Rev. Fr. Joy John</h3>
                <span className="leadership-title">Vicar</span>
                <p>
                  Rev. Fr. Joy John has served as Vicar of St. Mary's Syrian
                  Orthodox Church, continuing the parish's tradition of faith
                  and community leadership.
                </p>
              </div>
            </div>
          </div>
          <div className="about-image-slot">
            <img src="/vicar.jpg" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;