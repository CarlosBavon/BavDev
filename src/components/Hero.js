import React from "react";
import "../styles/Hero.css";
import { Link } from "react-router-dom";
import { FaRocket, FaMobileAlt, FaServer } from "react-icons/fa";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="hero" id="home">
      {/* Background */}
      <div className="hero__bg">
        <div className="gradient-overlay"></div>
        <div className="floating-circles"></div>
      </div>

      <div className="hero__container">
        {/* Left Side */}
        <motion.div
          className="hero__left"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="hero__title">
            <span className="highlight">Modern Websites</span> & Powerful Apps
          </h1>
          <p className="hero__subtitle">
            We craft lightning-fast web platforms, immersive mobile apps, and secure backend systems
            — tailored to your vision.
          </p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link to="/contact" className="btn primary-btn">🚀 Get a Quote</Link>
            <Link to="/portfolio" className="btn secondary-btn">View Portfolio</Link>
          </motion.div>

          <motion.div
            className="hero__features"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="feature-card"><FaRocket className="icon" /><span>Fast & Responsive</span></div>
            <div className="feature-card"><FaMobileAlt className="icon" /><span>Cross-Platform Apps</span></div>
            <div className="feature-card"><FaServer className="icon" /><span>Secure APIs</span></div>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="hero__right"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="device-mockup">
            <motion.div
              className="screen floating"
              whileHover={{ rotateY: 10, rotateX: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="screen__card">
                <h3>Bav Dev</h3>
                <p>Beautiful UI · Smooth Performance · Real Data</p>
                <div className="tags">
                  <span>React</span>
                  <span>Node</span>
                  <span>API</span>
                  <span>Flutter</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="screen floating delay"
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="screen__card secondary">
                <h3>App Preview</h3>
                <p>Next-gen mobile UI concepts in action</p>
                <div className="tags">
                  <span>iOS</span>
                  <span>Android</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
