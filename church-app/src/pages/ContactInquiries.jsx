import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactInquiries() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs
    .send(
      "service_qvhii7q",
      "template_7rdv8lr",
      {
        name: form.name,
        email: form.email,
        message: form.message,
      },
      "jDTWJJw-wZfl7_x8t"
    )
    .then(() => {
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        message: "",
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send message.");
    });
};

  return (
    <div className="App">
      <header className="page-hero">
        <Navbar />
        <div className="page-hero-text">
          <span className="eyebrow">Get In Touch</span>
          <h1>Send an Inquiry</h1>
        </div>
      </header>

      <section className="contact-section">
        <div className="contact-grid">
          
          <div className="contact-form-wrap reveal">
            {submitted ? (
              <p className="form-success">
                Thank you — your message has been received. We'll be in touch soon.
              </p>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="form-submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="contact-image reveal">
            <img src="/mother-mary.png" alt="Mother Mary" />
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactInquiries;