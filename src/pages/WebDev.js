import React, { useEffect, useState, useRef } from "react";
import "../styles/WebDev.css";

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

function useCount(target, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
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

const API_URL = process.env.REACT_APP_API_URL || "https://bavdev-back.onrender.com";

export default function WebDevelopment() {
  const [features, setFeatures] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [techTabs, setTechTabs] = useState({});
  const [metrics, setMetrics] = useState({});
  const [techTab, setTechTab] = useState("Frontend");
  const [lightbox, setLightbox] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const metricsRef = useRef(null);

  const heroIn = useInView(heroRef);
  const featuresIn = useInView(featuresRef);

  // Fetch all data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [
          featuresRes,
          projectsRes,
          testimonialsRes,
          pricingRes,
          faqsRes,
          techRes,
          metricsRes,
        ] = await Promise.all([
          fetch(`${API_URL}/api/web/features`),
          fetch(`${API_URL}/api/web/projects`),
          fetch(`${API_URL}/api/web/testimonials`),
          fetch(`${API_URL}/api/web/pricing`),
          fetch(`${API_URL}/api/web/faq`),
          fetch(`${API_URL}/api/web/tech`),
          fetch(`${API_URL}/api/web/metrics`),
        ]);

        const featuresData = await featuresRes.json();
        const projectsData = await projectsRes.json();
        const testimonialsData = await testimonialsRes.json();
        const pricingData = await pricingRes.json();
        const faqsData = await faqsRes.json();
        const techData = await techRes.json();
        const metricsData = await metricsRes.json();

        setFeatures(featuresData);
        setProjects(projectsData);
        setTestimonials(testimonialsData);
        setPricingPlans(pricingData);
        setFaqs(faqsData);

        // Group tech by category
        const techByCategory = techData.reduce((acc, tech) => {
          if (!acc[tech.category]) acc[tech.category] = [];
          acc[tech.category].push(tech);
          return acc;
        }, {});
        setTechTabs(techByCategory);

        setMetrics(metricsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const projectsCount = metrics.projects?.value || 0;
  const clientsCount = useCount(metrics.clients?.value || 0);
  const launchesCount = useCount(metrics.launches?.value || 0);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(() => {
      setActiveTestimonial((n) => (n + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, [testimonials]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className="wd-page">
      {/* Hero section - similar but using fetched data */}
      <section className="wd-hero" ref={heroRef}>
        <div className={`wd-hero__inner ${heroIn ? "in" : ""}`}>
          <div className="wd-hero__copy">
            <h1>
              Web Development that ships fast — <span>scales</span> and
              converts.
            </h1>
            <p className="muted">
              From lean landing pages to full-scale web platforms — we craft
              resilient, fast, maintainable web products with modern stacks.
            </p>

            <div className="wd-hero__ctas">
              <a className="btn primary" href="#contact-form">
                Get a Quote
              </a>
              <a className="btn ghost" href="#portfolio">
                View Case Studies
              </a>
            </div>

            <div className="wd-hero__badges">
              {techTabs.Frontend?.slice(0, 4).map((tech, idx) => (
                <div className="badge" key={idx}>
                  {tech.name}
                </div>
              ))}
            </div>
          </div>

          <div className="wd-hero__visual" aria-hidden="true">
            <div className="device">
              {projects[0] && (
                <img
                  src={`${API_URL}${projects[0].image}`}
                  alt="App screenshot"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features section - dynamic */}
      <section className="wd-features" ref={featuresRef}>
        <div className={`wd-features__inner ${featuresIn ? "in" : ""}`}>
          <h2>What we build</h2>
          <div className="grid features-grid">
            {features.map((f) => (
              <article className="feature-cards" key={f._id}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <a className="link" href="#contact-form">
                  Request this
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Tabs - dynamic */}
      <section className="wd-tech">
        <div className="wd-tech__inner">
          <h2>Tech Stack</h2>
          <div className="tabs">
            {Object.keys(techTabs).map((k) => (
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
            {techTabs[techTab]?.map((t) => (
              <div className="tech-pill" key={t._id}>
                <div className="tech-icon">{t.icon || "⚙️"}</div>
                <div>
                  <strong>{t.name}</strong>
                  <div className="muted">{t.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics - dynamic */}
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

      {/* Projects Portfolio - dynamic */}
      <section className="wd-portfolio" id="portfolio">
        <div className="wd-portfolio__inner">
          <div className="portfolio-header">
            <h2>Selected Case Studies</h2>
            <p className="muted">
              Work that demonstrates the technical breadth and product thinking
              we bring.
            </p>
          </div>

          <div className="grid portfolio-grid">
            {projects.map((p) => (
              <article
                key={p._id}
                className="project-card"
                onClick={() => setLightbox(p)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightbox(p)}
              >
                <div className="project-media">
                  <img src={`${API_URL}${p.image}`} alt={p.title} />
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

      {/* Lightbox - same as before but using fetched data */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div
            className="lightbox__card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.title} case study`}
          >
            <button
              className="lightbox__close"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
            <img src={`${API_URL}${lightbox.image}`} alt={lightbox.title} />
            <h3>{lightbox.title}</h3>
            <p>{lightbox.summary}</p>
            <ul>
              {lightbox.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="lightbox__actions">
              <a className="btn primary" href="#contact-form">
                Start Similar Project
              </a>
              <a className="btn ghost" href="#contact-form">
                Ask a Question
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Process section - static (can be made dynamic if needed) */}
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

      {/* Testimonials - dynamic */}
      {testimonials.length > 0 && (
        <section className="wd-testimonials">
          <div className="wd-testimonials__inner">
            <h2>What clients say</h2>
            <div className="testimonial-card">
              <p className="quote">“{testimonials[activeTestimonial].quote}”</p>
              <div className="author">
                <strong>{testimonials[activeTestimonial].name}</strong>
                <span className="muted">
                  {testimonials[activeTestimonial].title}
                </span>
              </div>
              <div className="dots">
                {testimonials.map((t, i) => (
                  <button
                    key={t._id}
                    className={`dot ${i === activeTestimonial ? "active" : ""}`}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing - dynamic */}
      <section className="wd-pricing">
        <div className="wd-pricing__inner">
          <h2>Pricing (starting)</h2>
          <div className="grid pricing-grid">
            {pricingPlans.map((plan) => (
              <div
                key={plan._id}
                className={`price-card ${plan.featured ? "featured" : ""}`}
              >
                <div className="price-header">{plan.name}</div>
                <div className="price-amount">{plan.price}</div>
                <ul>
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <a className={`btn ${plan.buttonVariant}`} href="#contact-form">
                  {plan.buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - dynamic */}
      <section className="wd-faq">
        <div className="wd-faq__inner">
          <h2>Frequently asked</h2>
          {faqs.map((faq) => (
            <details key={faq._id}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact Form Section - ADD THIS */}
      <section className="wd-contact-form" id="contact-form">
        <div className="wd-contact-form__inner">
          <h2>Start Your Project</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const data = Object.fromEntries(formData);

              try {
                const response = await fetch(`${API_URL}/api/contact/message`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(data),
                });

                if (response.ok) {
                  alert("Message sent successfully! We will contact you soon.");
                  e.target.reset();
                } else {
                  alert("Error sending message. Please try again.");
                }
              } catch (error) {
                console.error("Error:", error);
                alert("Error sending message. Please try again.");
              }
            }}
          >
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <input type="tel" name="phone" placeholder="Phone Number" />
            <select name="projectType" required>
              <option value="web">Web Development</option>
              <option value="app">App Development</option>
              <option value="both">Both</option>
            </select>
            <input type="text" name="budget" placeholder="Budget Range" />
            <textarea
              name="message"
              placeholder="Tell us about your project"
              rows="5"
              required
            ></textarea>
            <button type="submit" className="btn primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
