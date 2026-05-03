import React, { useEffect, useState, useRef } from "react";
import "../styles/AppDev.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

function useInView(ref, threshold = 0.18) {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function AppDevelopment() {
  const [features, setFeatures] = useState([]);
  const [showcases, setShowcases] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [platform, setPlatform] = useState("Cross-platform");
  const [platformStack, setPlatformStack] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const [activeTest, setActiveTest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(0);

  const heroRef = useRef(null);
  const featRef = useRef(null);
  const heroIn = useInView(heroRef);
  const featIn = useInView(featRef);

  // Fetch all data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          featuresRes,
          showcasesRes,
          testimonialsRes,
          pricingRes,
          faqsRes,
          metricsRes,
          platformStackRes,
        ] = await Promise.all([
          fetch(`${API_URL}/api/app/features`),
          fetch(`${API_URL}/api/app/showcases`),
          fetch(`${API_URL}/api/app/testimonials`),
          fetch(`${API_URL}/api/app/pricing`),
          fetch(`${API_URL}/api/app/faq`),
          fetch(`${API_URL}/api/app/metrics`),
          fetch(`${API_URL}/api/app/platform/Cross-platform`),
        ]);

        const featuresData = await featuresRes.json();
        const showcasesData = await showcasesRes.json();
        const testimonialsData = await testimonialsRes.json();
        const pricingData = await pricingRes.json();
        const faqsData = await faqsRes.json();
        const metricsData = await metricsRes.json();
        const platformStackData = await platformStackRes.json();

        setFeatures(featuresData);
        setShowcases(showcasesData);
        setTestimonials(testimonialsData);
        setPricingPlans(pricingData);
        setFaqs(faqsData);
        setMetrics(metricsData);
        setPlatformStack(platformStackData);
      } catch (error) {
        console.error("Error fetching app data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch platform-specific stack when tab changes
  useEffect(() => {
    const fetchPlatformStack = async () => {
      try {
        const res = await fetch(`${API_URL}/api/app/platform/${platform}`);
        const data = await res.json();
        setPlatformStack(data);
      } catch (error) {
        console.error("Error fetching platform stack:", error);
      }
    };
    fetchPlatformStack();
  }, [platform]);

  // Animate users count when hero comes into view
  useEffect(() => {
    if (!heroIn || !metrics.users?.value) return;
    const end = metrics.users.value;
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const ticks = Math.ceil(duration / stepTime);
    const inc = Math.ceil(end / ticks);
    const id = setInterval(() => {
      start += inc;
      if (start >= end) {
        start = end;
        clearInterval(id);
      }
      setUsers(start);
    }, stepTime);
    return () => clearInterval(id);
  }, [heroIn, metrics.users?.value]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length === 0) return;
    const t = setInterval(
      () => setActiveTest((s) => (s + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(t);
  }, [testimonials]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <main className="ad-page">
      {/* HERO */}
      <section className={`ad-hero ${heroIn ? "in" : ""}`} ref={heroRef}>
        <div className="ad-hero__wrap">
          <div className="ad-hero__text">
            <h1>
              App Development that delights users — <span>launch fast</span>,
              scale reliably.
            </h1>
            <p className="muted">
              Native features, seamless performance, and product-first mobile
              experiences for iOS & Android.
            </p>

            <div className="ad-hero__ctas">
              <a href="#contact-form" className="btn primary">
                Start Your App
              </a>
              <a href="#showcase" className="btn ghost">
                See Work
              </a>
            </div>

            <div className="ad-hero__stats">
              <div className="stat">
                <div className="num">{users.toLocaleString()}</div>
                <div className="label">Active users (sample)</div>
              </div>
              <div className="stat">
                <div className="num">
                  {metrics.rating?.value || 4.8}
                  {metrics.rating?.suffix || "★"}
                </div>
                <div className="label">Avg Store Rating</div>
              </div>
              <div className="stat">
                <div className="num">
                  {metrics.crashFree?.value || 99}
                  {metrics.crashFree?.suffix || "%"}
                </div>
                <div className="label">Crash-free sessions</div>
              </div>
            </div>
          </div>

          <div className="ad-hero__visual" aria-hidden="true">
            <div className="phone-mockup">
              {showcases[0] && (
                <img src={`${API_URL}${showcases[0].image}`} alt="mobile ui" />
              )}
            </div>
            <div className="tablet-mockup">
              {showcases[1] && (
                <img src={`${API_URL}${showcases[1].image}`} alt="tablet ui" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`ad-features ${featIn ? "in" : ""}`} ref={featRef}>
        <div className="container">
          <h2>What we build for mobile</h2>
          <p className="muted">
            From consumer apps to mission-critical enterprise tooling — we
            design for retention and growth.
          </p>

          <div className="features-grid">
            {features.map((f) => (
              <article className="feature" key={f._id}>
                <div className="ic">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <a className="link" href="#contact-form">
                  Request
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM TABS */}
      <section className="ad-platform">
        <div className="container">
          <h2>Platform & tools</h2>
          <div className="platform-tabs">
            {["Cross-platform", "iOS Native", "Android Native"].map((p) => (
              <button
                key={p}
                className={`plat ${platform === p ? "active" : ""}`}
                onClick={() => setPlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="platform-content">
            <div className="plat-grid">
              <div>
                <strong>Recommended stack</strong>
                <p className="muted">{platformStack.recommended}</p>
              </div>
              <div>
                <strong>CI / CD</strong>
                <p className="muted">{platformStack.cicd}</p>
              </div>
              <div>
                <strong>Testing</strong>
                <p className="muted">{platformStack.testing}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE / CASE STUDIES */}
      <section className="ad-showcase" id="showcase">
        <div className="container">
          <h2>Selected app work</h2>
          <div className="showcase-grid">
            {showcases.map((s) => (
              <article
                className="case"
                key={s._id}
                onClick={() => setLightbox(s)}
                tabIndex={0}
                role="button"
              >
                <div className="case-media">
                  <img src={`${API_URL}${s.image}`} alt={s.title} />
                </div>
                <div className="case-body">
                  <h3>{s.title}</h3>
                  <p className="muted">{s.summary}</p>
                  <div className="tags">
                    {s.bullets.map((b, i) => (
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

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="ad-lightbox" onClick={() => setLightbox(null)}>
          <div
            className="ad-lightbox__card"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close" onClick={() => setLightbox(null)}>
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
            <div className="actions">
              <a className="btn primary" href="#contact-form">
                Start Similar App
              </a>
              <a className="btn ghost" href="#contact-form">
                Ask about architecture
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CI/CD + Quality (static section) */}
      <section className="ad-quality">
        <div className="container">
          <h2>Quality, CI/CD & Monitoring</h2>
          <div className="quality-grid">
            <div className="q">
              <h3>Automated Pipelines</h3>
              <p className="muted">
                GitHub Actions / Bitrise for builds, tests & distribution.
              </p>
            </div>
            <div className="q">
              <h3>Observability</h3>
              <p className="muted">
                Sentry, Crashlytics and performance monitoring integrated.
              </p>
            </div>
            <div className="q">
              <h3>Release Strategy</h3>
              <p className="muted">
                Phased rollouts, feature flags & canary releases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="ad-testimonials">
          <div className="container">
            <h2>Clients</h2>
            <div className="test-cards">
              <div className="test-card">
                <p className="quote">“{testimonials[activeTest].quote}”</p>
                <div className="author">
                  <strong>{testimonials[activeTest].name}</strong>
                  <span className="muted">
                    {" "}
                    — {testimonials[activeTest].title}
                  </span>
                </div>
              </div>
              <div className="dots">
                {testimonials.map((t, i) => (
                  <button
                    key={t._id}
                    className={`dot ${i === activeTest ? "active" : ""}`}
                    onClick={() => setActiveTest(i)}
                    aria-label={`testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PRICING */}
      <section className="ad-pricing">
        <div className="container">
          <h2>Packages</h2>
          <div className="pricing-grid">
            {pricingPlans.map((pack) => (
              <div
                key={pack._id}
                className={`pack ${pack.featured ? "featured" : ""}`}
              >
                <h3>{pack.name}</h3>
                <div className="price">{pack.price}</div>
                <ul>
                  {pack.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${pack.buttonVariant || "primary"}`}
                  href="#contact-form"
                >
                  {pack.buttonText || "Get Started"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ad-faq">
        <div className="container">
          <h2>FAQ</h2>
          {faqs.map((faq) => (
            <details key={faq._id}>
              <summary>{faq.question}</summary>
              <p className="muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CONTACT FORM - ADD THIS */}
      <section className="ad-contact-form" id="contact-form">
        <div className="container">
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
              <option value="app">App Development</option>
              <option value="web">Web Development</option>
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
