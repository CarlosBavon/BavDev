import React, { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This can be connected to an API)");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact">
      <h1>Contact <span>Me</span></h1>
      <p className="contact__tagline">
        Let’s discuss your next big project and bring it to life!
      </p>

      <div className="contact__wrapper">
        {/* Contact Info */}
        <div className="contact__info">
          <h2>Get in Touch</h2>
          <p>Email: <a href="mailto:carlosbavon46@gmail.com">carlosbavon46@gmail.com</a></p>
          <p>Phone: +254 758 809 229</p>
          <p>Location: Nairobi, Kenya</p>

          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.1883128048!2d36.8219464!3d-1.2920659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6fbc6a4d5%3A0x9e23a98ec6a2c144!2sNairobi!5e0!3m2!1sen!2ske!4v1691838345678!5m2!1sen!2ske"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form className="contact__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="contact-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
}
