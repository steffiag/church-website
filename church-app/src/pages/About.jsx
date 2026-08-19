import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
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
          <span className="eyebrow">Our Story</span>
          <h1>About St. Mary's</h1>
        </div>
      </header>

      <section id = "mission" className="about-section reveal">
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
            <img id = "st-mary" src="/mothermarypic.png" />
          </div>
        </div>
      </section>

      <section id = "history" className="about-section about-section-alt reveal">
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

      <section id = "patriarch" className="about-section reveal">
        <div className="about-split">
          <div className="about-text">
            <h2>Patriarch</h2>
            <div className="leadership-card">
              <div className="leadership-info">
                <h3>His Holiness Patriarch Moran Mor Ignatius Aphrem II</h3>
                <span className="leadership-title"></span>
                <div className="about-body">
                  <p>His Holiness Moran Mor Ignatius Aphrem II, the 122nd successor to St. Peter in the Apostolic See of Antioch, was born in Kamishly, Syria on May 3, 1965. On Sunday, January 28, 1996, He was consecrated as Metropolitan and Patriarchal Vicar to the Archdiocese of the Syriac Orthodox Church for the Eastern United States, by His Holiness Patriarch Zakka I Iwas, at St. Mary ‘s Syriac Orthodox Church in Kamishly. 
                    <br></br>Throughout the years, he has visited, all the parishes, including ours, and formed a new Archdiocese Advisory Council to assist with the administration of the Archdiocese and its various programs; working closely with the parish boards and clergy to see that the spiritual and church needs of the faithful are fulfilled.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image-slot">
            <img src="/patriarch.png" />
          </div>
        </div>
      </section>

      <section id = "catholicos" className="about-section about-section-alt reveal">
        <div className="about-split">
          <div className="about-image-slot">
            <img src="/catholicos.png" />
          </div>
          <div className="about-text">
            <h2>Catholicos</h2>
            <div className="leadership-card">
              <div className="leadership-info">
                <h3>His Beatitude Aboon Mor Baselios Joseph</h3>
                <span className="leadership-title"></span>
                <div className="about-body">
                  <p>
                    His Beatitude Aboon Mor Baselios Joseph is the Catholicos of the Malankara Archdiocese of the Syrian Orthodox Church in India. He has devoted his life to the Church, and has served various roles including monk, priest, and bishop before becoming Catholicos. He also serves as the Metropolitan of the Kochi Diocese and Angamali Diocese. He was elevated as Catholicos of India by Ignatius Aphrem II on 25 March 2025, at St. Mary's Cathedral, Atchaneh, Lebanon with the name Baselios Joseph. He was enthroned on 30 March 2025, at Mar Athanasius Cathedral in Puthencruz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id = "archbishop" className="about-section reveal">
        <div className="about-split">
          <div className="about-text">
            <h2>Archbishop</h2>
            <div className="leadership-card">
              <div className="leadership-info">
                <h3>His Eminence Mor Titus Yeldho</h3>
                <span className="leadership-title"></span>
                <div className="about-body">
                  <p>
                  His Holiness the Patriarch of Antioch and All The East, Moran Mor Ignatius Zakka I Iwas consecrated Very Rev. Ramban Yeldho Pathickal as the Archbishop and Patriarchal Vicar of the Malankara Archdiocese of the Syrian Orthodox Church in North America on January 4, 2004 at the solemn function held at the Monastery of St. Aphrem the Syrian, at Ma'arrat Seydnaya, Damascus, Syria. <br></br>Metropolitan was given the Episcopal name 'TITUS' during the consecration ceremony. At the end of the Holy ceremony, the newly consecrated Archbishop thanked His Holiness the Patriarch Moran Mor Ignatius Zakka I Iwas and all those who were present. He pledged his allegiance to the Holy Syriac Orthodox Church and promised to be faithful in imparting the teachings of the Church to the devoted.
                </p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image-slot">
            <img src="/archbishop.jpg" />
          </div>
        </div>
      </section>

      <section id = "vicar" className="about-section about-section-alt reveal">
        <div className="about-split">
          <div className="about-image-slot">
            <img id = "achen" src="/achen.jpg" />
          </div>
          <div className="about-text">
            <h2>Vicar</h2>
            <div className="leadership-card">
              <div className="leadership-info">
                <h3>Rev. Fr. Joy John</h3>
                <span className="leadership-title"></span>
                <div className="about-body">
                  <p>
                  Rev. Fr. Joy John has served as Vicar of St. Mary's Syrian
                  Orthodox Church, continuing the parish's tradition of faith
                  and community leadership.
                  He has been an active pillar within our Church community. He has sought to engage all parish members, including 
                  the youth, by holding both English and Malayalam Holy Qurbanas. 
                  
                  He also is an active guide within various spiritual groups such as the St. Mary's Women League and Youth Association. 
                  
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
          <section id="leadership" className="about-section about-section reveal">
        <div className="leadership-table-wrap">
          <h2>Management Committee</h2>
          <div className="committee-list">
          <h3>Executive Officers</h3>
            <table className="leadership-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Position">Vicar/President</td>
                <td data-label="Name">Rev. Fr. Joy John</td>
                <td data-label="Contact">+1 (609)-306-0180</td>
              </tr>
              <tr>
                <td data-label="Position">Vice President</td>
                <td data-label="Name">Mr. George M George</td>
                <td data-label="Contact">+1 (201)-803-9740</td>
              </tr>
              <tr>
                <td data-label="Position">Secretary</td>
                <td data-label="Name">Mr. Issac Kurian</td>
                <td data-label="Contact">+1 (551)-200-1225</td>
              </tr>
              <tr>
                <td data-label="Position">Treasurer</td>
                <td data-label="Name">Mr. Eldhose Rajan</td>
                <td data-label="Contact">+1 (812)-369-2028</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className="committee-list">
            <h3>Board Members</h3>
            <table className="leadership-table committee-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Position">Joint Secretary</td>
                  <td data-label="Name">Mr. Dipu Mathew</td>
                </tr>
                <tr>
                  <td data-label="Position">Joint Treasurer</td>
                  <td data-label="Name">Mr. Dhayan Kurian</td>
                </tr>
                <tr>
                  <td data-label="Position">Auditor</td>
                  <td data-label="Name">Mr. Rajan Palamattam</td>
                </tr>
               <tr>
                <td data-label="Position">Committee Members</td>
                <td data-label="Name">
                  <span className="member-list">
                    <span className="member-name">Mrs. Sony Abraham</span>
                    <span className="member-name">Mrs. Ammini Mathew</span>
                    <span className="member-name">Mr. Cherian Mathew</span>
                    <span className="member-name">Mr. Joy Varghese</span>
                    <span className="member-name">Mr. Thomas Issac</span>
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div className="committee-list">
            <h3>Program Coordinators</h3>
            <table className="leadership-table committee-table">
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody> 
                <tr>
                  <td data-label="Position">Sunday School Headmaster</td>
                  <td data-label="Name">Mr. Justin Mathew</td>
                </tr>
                <tr>
                  <td data-label="Position">Picnic Coordinator</td>
                  <td data-label="Name">Mr. Eldho Hobby</td>
                </tr>
                <tr>
                  <td data-label="Position">Caroling Coordinator</td>
                  <td data-label="Name">Mr. Sajan Samuel</td>
                </tr>
                <tr>
                <td data-label="Position">Family Night Coordinators</td>
                  <td data-label="Name">
                    <span className="member-list">
                      <span className="member-name">Mrs. Sumi Poulose</span>
                      <span className="member-name">Mrs. Reeja Chackochan</span>
                      <span className="member-name">Mrs. Roshni Paul</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td data-label="Position">Prayer Meeting Coordinator</td>
                  <td data-label="Name">Mr. Regi Markose</td>
                </tr>
              </tbody>
            </table>
          </div>

          
          </div>
        </section>

      <Footer />
    </div>
  );
}

export default About;
