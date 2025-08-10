import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand Section */}
        <div className="footer__brand">
          <h2 className="footer__logo">Bav<span>Dev</span></h2>
          <p>
            Crafting beautiful websites, powerful apps, and seamless integrations for businesses worldwide.
          </p>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://x.com/bavon046" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com/bavdevstudio" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/bavon-carlos-868775367/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://github.com/CarlosBavon" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>

        {/* Links */}
        <div className="footer__links">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
          </ul>
        </div>

        <div className="footer__links">
          <h4>Services</h4>
          <ul>
            <li><a href="/services/web">Web Development</a></li>
            <li><a href="/services/app">Mobile Apps</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__contact">
          <h4>Contact</h4>
          <p>Email: <a href="mailto:hello@bavdev.com">carlosbavon46@gmail.com</a></p>
          <p>Phone: <a href="tel:+254758809229">+254 758 809 229</a></p>
          <p>Location: Nairobi, Kenya</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <p>© {year} BavDev. All rights reserved.</p>
        <p>Designed with ❤️ by Dev Bav Team</p>
      </div>
    </footer>
  );
}
