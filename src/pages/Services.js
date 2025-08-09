import React from "react";
import "../styles/Services.css";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      desc: "Custom, responsive websites and web apps built with modern technologies like React, Node.js, and Next.js.",
      features: [
        "Responsive & mobile-friendly",
        "E-commerce integration",
        "SEO optimization",
      ],
      icon: "🌐",
      href: "/services/web",
    },
    {
      title: "App Development",
      desc: "Cross-platform mobile apps for iOS & Android with React Native or Flutter, tailored to your needs.",
      features: [
        "iOS & Android support",
        "API integration",
        "Smooth performance",
      ],
      icon: "📱",
      href: "/services/app",
    },
  ];

  return (
    <section className="services" id="services">
      <div className="services__container">
        <h2 className="services__title">Our Services</h2>
        <p className="services__subtitle">
          We deliver high-quality, scalable solutions for businesses of all sizes.
        </p>

        <div className="services__grid">
          {services.map((service, index) => (
            <a href={service.href}>
              <div key={index} className="service-card">
                <div className="service-card__icon">{service.icon}</div>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>
                <ul className="service-card__features">
                  {service.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </a>

          ))}
        </div>
      </div>
    </section>
  );
}
