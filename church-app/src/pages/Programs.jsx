import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const programs = [
  {
    title: "Sunday School",
    description:
      "Since the establishment of the Church in 2008, our Sunday School Association has been an integral part of the spiritual organizations within our parish. With the blessings and spiritual support of the Vicar, the Sunday School program has grown tremendously in the last few years. We have Primary to 10th Grade with approximately 40 students and 15 teachers. As the new generation evolves in the U.S., it is the responsibility of the teachers to provide the spiritual education based on the traditions and teachings of the Syrian Orthodox Church. The future of the Church is dependent on educating our young children. Therefore, the commitment of the Sunday School teachers and the cooperation from the parents and students makes the process gratifying and purposeful. We urge you to come visit our parish and Sunday School.",
  },
  {
    title: "Youth Association",
    description:
      "Our youth group is an increasingly prominent organization within our church that includes highschoolers and college students. We meet regularly to help the youth of our church strengthen their relationship with God and become more active within the church. We organize monthly meetings that include spiritual discussions, upcoming events, charity work, and fundraisers. Through these meetings, the youth are able to learn how to live a righteous life while also becoming more close with like-minded individuals. ", 
  },
  {
    title: "Women's League",
    description:
      "The women's league meetings are held on every Sunday after the Holy Qurbana. During these meetings, the women actively participate in a variety of activities including Bible studies, prayers, songs, and praying for the sick. The primary goal of the Samajam is the spiritual development of the women in our church. The above activities are only a part of the process to reach spiritual fulfillment in our daily life. The St. Mary's Women's League continues to build in their faith and their relationship with God. The league welcomes all women to participate in the life of the Samajam.",
  },
  {
    title: "St. Paul's Fellowship",
    description:
      "St. Paul’s Fellowship is a spiritual organization under the Malankara Archdiocese of the Syrian Orthodox Church in North America. The Supreme Patron of the Fellowship is His Holiness Moran Mor Ignatius Zakka I Iwas, Supreme Head of the Universal Syrian Orthodox Church and the President & Patron is His Eminence Archbishop Mor Titus Yeldho.",
  },
{
    title: "Senior Citizen Club",
    description:
      "Our Seniors Club is a place where the senior members of our church can come together for fellowship, prayer, and meaningful activities. It provides an opportunity to build friendships, encourage one another, and stay connected with the church family through regular gatherings and programs.",
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
