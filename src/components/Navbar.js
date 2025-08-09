import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from '../images/LOGO.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`nav ${scrolled ? "nav--scrolled" : ""} ${
        showNavbar ? "nav--show" : "nav--hide"
      }`}
    >
      <div className="nav__inner">
        <div className="nav__brand">
          <Link to="/" className="nav__logo">
            <img src={Logo} alt="BavDev Logo" />
          </Link>
        </div>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {/* Services with dropdown */}
          <div
            className="nav__dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <span className="nav__link">
              <Link to="/services" onClick={() => setOpen(false)}>Services ▾</Link>
            </span>
            {servicesOpen && (
              <div className="dropdown__menu">
                <NavLink to="/services/web" onClick={() => setOpen(false)}>
                  Web Development
                </NavLink>
                <NavLink to="/services/app" onClick={() => setOpen(false)}>
                  App Development
                </NavLink>
              </div>
            )}
          </div>
          <NavLink to="/portfolio" onClick={() => setOpen(false)}>
            Portfolio
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="btn btn--ghost"
            onClick={() => setOpen(false)}
          >
            Contact
          </NavLink>
        </nav>

        <button
          className={`nav__toggle ${open ? "is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
