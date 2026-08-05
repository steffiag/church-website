import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactInquiries() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    fax: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || "Failed to send message");
      }

      setSubmitted(true);
      setForm({ name: "", email: "", message: "", fax: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
                Thank you! We'll be in touch soon.
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

                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="fax">Fax</label>
                  <input
                    id="fax"
                    name="fax"
                    type="text"
                    value={form.fax}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    data-1p-ignore="true"
                    data-lpignore="true"
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
