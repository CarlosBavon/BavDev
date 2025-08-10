import React, { useEffect, useState, useRef } from "react";
import "../styles/WebDev.css";
import BavBites from '../images/BavBites.png';
import Meetly from '../images/Meetly.png';
import Dash from '../images/Dash.png';

/* ---------------------------
  Sample data (replace images/text)
----------------------------*/
const features = [
  {
    id: 1,
    title: "Responsive & Adaptive UI",
    desc: "Pixel-perfect responsive designs that look great on every device.",
  },
  {
    id: 2,
    title: "High Performance",
    desc: "Optimized bundles, code-splitting, lazy loading and caching strategies.",
  },
  {
    id: 3,
    title: "Progressive Web Apps",
    desc: "Offline-capable, installable PWAs with push notifications and fast load times.",
  },
  {
    id: 4,
    title: "Headless CMS + APIs",
    desc: "Integrate modern headless CMS and robust REST/MongoDB APIs for content and data.",
  },
];

const tech = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind (optional)"],
  Backend: ["Node.js", "Express", "NestJS", "MongoDB", "Postgres"],
  Mobile: ["React Native", "Expo", "Flutter", "Kotlin"],
};

const projects = [
  {
    id: 1,
    title: "BavBites — E-commerce Platform",
    category: "Web",
    img: BavBites,
    summary:
      "Full-stack e-commerce with product variants, payments, inventory, and admin dashboard.",
    bullets: ["React + Next.js", "Stripe Payments", "Serverless APIs"],
  },
  {
    id: 2,
    title: "Meetly — Event Booking",
    category: "Web",
    img: Meetly,
    summary: "Booking system with real-time availability and calendar sync.",
    bullets: ["React", "Socket.io", "Postgres"],
  },
  {
    id: 3,
    title: "Dashlytics — Analytics Dashboard",
    category: "Web",
    img: Dash,
    summary: "Custom dashboards with charts, user permissions and export features.",
    bullets: ["React", "Charting", "Role-based Auth"],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Amina K.",
    title: "Founder — RetailCo",
    quote:
      "Bavon built our storefront in record time. Conversion rate jumped 38% within 6 weeks.",
  },
  {
    id: 2,
    name: "Daniel M.",
    title: "CTO — FinApp",
    quote:
      "Reliable and fast — excellent communication and technical depth. Highly recommend.",
  },
];

/* ---------------------------
  Helpers
----------------------------*/
function useInView(ref, options = { threshold: 0.15 }) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, options]);
  return inView;
}

/* Simple counter hook */
function useCount(target, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

/* ---------------------------
  Main Page
----------------------------*/
export default function WebDevelopment() {
  const [techTab, setTechTab] = useState("Frontend");
  const [lightbox, setLightbox] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const metricsRef = useRef(null);

  const heroIn = useInView(heroRef);
  const featuresIn = useInView(featuresRef);

  const projectsCount = projects.length;
  const clientsCount = useCount(27); // pretend numbers
  const launchesCount = useCount(54);

  /* simple testimonial rotation */
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial((n) => (n + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="wd-page">
      {/* Hero */}
      <section className="wd-hero" ref={heroRef}>
        <div className={`wd-hero__inner ${heroIn ? "in" : ""}`}>
          <div className="wd-hero__copy">
            <h1>
              Web Development that ships fast — <span>scales</span> and converts.
            </h1>
            <p className="muted">
              From lean landing pages to full-scale web platforms — we craft resilient, fast,
              maintainable web products with modern stacks.
            </p>

            <div className="wd-hero__ctas">
              <a className="btn primary" href="#contact">
                Get a Quote
              </a>
              <a className="btn ghost" href="#portfolio">
                View Case Studies
              </a>
            </div>

            <div className="wd-hero__badges">
              <div className="badge">React</div>
              <div className="badge">Next.js</div>
              <div className="badge">Node</div>
              <div className="badge">PWAs</div>
            </div>
          </div>

          <div className="wd-hero__visual" aria-hidden="true">
            {/* Device mock + small UI screenshot */}
            <div className="device">
              <img
                src={BavBites}
                alt="App screenshot"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="wd-features" ref={featuresRef}>
        <div className={`wd-features__inner ${featuresIn ? "in" : ""}`}>
          <h2>What we build</h2>
          <div className="grid features-grid">
            {features.map((f) => (
              <article className="feature-cards" key={f.id}>
                <div className="feature-icon">🚀</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <a className="link" href="#contact">
                  Request this
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Tabs */}
      <section className="wd-tech">
        <div className="wd-tech__inner">
          <h2>Tech Stack</h2>
          <div className="tabs">
            {Object.keys(tech).map((k) => (
              <button
                key={k}
                className={`tab ${techTab === k ? "active" : ""}`}
                onClick={() => setTechTab(k)}
                aria-pressed={techTab === k}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="tech-list">
            {tech[techTab].map((t) => (
              <div className="tech-pill" key={t}>
                <div className="tech-icon">⚙️</div>
                <div>
                  <strong>{t}</strong>
                  <div className="muted">Proven in production</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="wd-metrics" ref={metricsRef}>
        <div className="wd-metrics__inner">
          <div className="metric">
            <div className="num">{projectsCount}+</div>
            <div className="label">Projects</div>
          </div>
          <div className="metric">
            <div className="num">{clientsCount}</div>
            <div className="label">Clients</div>
          </div>
          <div className="metric">
            <div className="num">{launchesCount}+</div>
            <div className="label">Launches</div>
          </div>
        </div>
      </section>

      {/* Case Studies / Portfolio */}
      <section className="wd-portfolio" id="portfolio">
        <div className="wd-portfolio__inner">
          <div className="portfolio-header">
            <h2>Selected Case Studies</h2>
            <p className="muted">
              Work that demonstrates the technical breadth and product thinking we bring.
            </p>
          </div>

          <div className="grid portfolio-grid">
            {projects.map((p) => (
              <article
                key={p.id}
                className="project-card"
                onClick={() => setLightbox(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightbox(p)}
              >
                <div className="project-media">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="project-body">
                  <h3>{p.title}</h3>
                  <p className="muted">{p.summary}</p>
                  <div className="project-tags">
                    {p.bullets.map((b, i) => (
                      <span key={i} className="tag">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div
            className="lightbox__card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.title} case study`}
          >
            <button className="lightbox__close" onClick={() => setLightbox(null)}>
              ✕
            </button>
            <img src={lightbox.img} alt={lightbox.title} />
            <h3>{lightbox.title}</h3>
            <p>{lightbox.summary}</p>
            <ul>
              {lightbox.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="lightbox__actions">
              <a className="btn primary" href="#contact">
                Start Similar Project
              </a>
              <a className="btn ghost" href="/contact">
                Ask a Question
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Process */}
      <section className="wd-process">
        <div className="wd-process__inner">
          <h2>Our Process</h2>
          <ol className="process-steps">
            <li>
              <strong>Discover</strong>
              <span>Research, stakeholders, success metrics.</span>
            </li>
            <li>
              <strong>Design</strong>
              <span>Wireframes & UI prototypes for validation.</span>
            </li>
            <li>
              <strong>Build</strong>
              <span>Iterative sprints, tests, and CI/CD pipelines.</span>
            </li>
            <li>
              <strong>Launch</strong>
              <span>Performance tuning, monitoring, and iteration.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="wd-testimonials">
        <div className="wd-testimonials__inner">
          <h2>What clients say</h2>
          <div className="testimonial-card">
            <p className="quote">“{testimonials[activeTestimonial].quote}”</p>
            <div className="author">
              <strong>{testimonials[activeTestimonial].name}</strong>
              <span className="muted">{testimonials[activeTestimonial].title}</span>
            </div>
            <div className="dots">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  className={`dot ${i === activeTestimonial ? "active" : ""}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="wd-pricing">
        <div className="wd-pricing__inner">
          <h2>Pricing (starting)</h2>
          <div className="grid pricing-grid">
            <div className="price-card">
              <div className="price-header">Starter</div>
              <div className="price-amount">KES 50k</div>
              <ul>
                <li>Landing page</li>
                <li>Responsive</li>
                <li>Basic SEO</li>
              </ul>
              <a className="btn primary" href="#contact">
                Get Starter
              </a>
            </div>

            <div className="price-card featured">
              <div className="price-header">Business</div>
              <div className="price-amount">KES 100k</div>
              <ul>
                <li>Custom web app</li>
                <li>Auth & DB</li>
                <li>3 months support</li>
              </ul>
              <a className="btn primary" href="#contact">
                Get Business
              </a>
            </div>

            <div className="price-card">
              <div className="price-header">Enterprise</div>
              <div className="price-amount">Custom</div>
              <ul>
                <li>Scalable architecture</li>
                <li>Integrations</li>
                <li>Dedicated team</li>
              </ul>
              <a className="btn ghost" href="#contact">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="wd-faq">
        <div className="wd-faq__inner">
          <h2>Frequently asked</h2>
          <details>
            <summary>How long does a typical project take?</summary>
            <p>Depends on scope — landing pages (1–2 weeks), mid-size apps (6–12 weeks).</p>
          </details>

          <details>
            <summary>Do you offer maintenance?</summary>
            <p>Yes — we have monthly support packages and SLA options.</p>
          </details>

          <details>
            <summary>Which payment methods do you accept?</summary>
            <p>Bank transfer, M-Pesa, PayPal (for international clients), Card Payments.</p>
          </details>
        </div>
      </section>

      {/* Sticky Contact CTA */}
      <aside className="wd-contact-cta" id="contact">
        <div className="cta-inner">
          <div>
            <strong>Ready to build?</strong>
            <div className="muted">Tell us about your idea — we’ll handle the rest.</div>
          </div>
          <a className="btn primary" href="#contact-form">
            Start Project
          </a>
        </div>
      </aside>
    </main>
  );
}

