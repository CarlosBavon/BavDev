import React, { useEffect, useState, useRef } from "react";
import "../styles/AppDev.css";
import MobileUI from '../images/MobileUI.png';
import TabletUI from '../images/TabletUI.png';
import TableEase from '../images/TableEase.png';
import FitPulse from '../images/FitPulse.png';

const features = [
  {
    id: 1,
    title: "Cross-platform Performance",
    desc: "Single codebase with native-grade performance using React Native or Flutter.",
  },
  {
    id: 2,
    title: "Native Integrations",
    desc: "Camera, push notifications, background tasks, geolocation and payments.",
  },
  {
    id: 3,
    title: "Scalable Architecture",
    desc: "Clean state management, modular components, and testable services.",
  },
  {
    id: 4,
    title: "App Store Optimization",
    desc: "Optimized store listing, assets and A/B testing to maximize downloads.",
  },
];

const showcases = [
  {
    id: 1,
    title: "TableEase — Restaurant Reservations",
    img: TableEase,
    bullets: ["React Native", "Realtime Availability", "Stripe"],
    summary: "Booking flow, calendar sync, push reminders and owner dashboard."
  },
  {
    id: 2,
    title: "FitPulse — Fitness Tracking",
    img: FitPulse,
    bullets: ["Flutter", "Background Tracking", "Charts"],
    summary: "Activity tracking, goals, leaderboard and wearable sync."
  },
];

const testimonials = [
  { id: 1, name: "Samira", role: "Founder", quote: "App delivered with polish — retention improved 46%." },
  { id: 2, name: "Owen", role: "Product Lead", quote: "Great at bridging product and engineering." },
];

function useInView(ref, threshold = 0.18) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

export default function AppDevelopment() {
  const heroRef = useRef(null);
  const featRef = useRef(null);
  const portfolioRef = useRef(null);
  const heroIn = useInView(heroRef);
  const featIn = useInView(featRef);
  const portfolioIn = useInView(portfolioRef);

  const [platform, setPlatform] = useState("Cross-platform");
  const [lightbox, setLightbox] = useState(null);
  const [activeTest, setActiveTest] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTest(s => (s + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  /* simple animated numbers */
  const [users, setUsers] = useState(0);
  useEffect(() => {
    let id;
    if (heroIn) {
      let start = 0, end = 120000, duration = 1200, stepTime = 16;
      const ticks = Math.ceil(duration / stepTime);
      const inc = Math.ceil((end - start) / ticks);
      id = setInterval(() => {
        start += inc;
        if (start >= end) {
          start = end;
          clearInterval(id);
        }
        setUsers(start);
      }, stepTime);
    }
    return () => clearInterval(id);
  }, [heroIn]);

  return (
    <main className="ad-page">
      {/* HERO */}
      <section className={`ad-hero ${heroIn ? "in" : ""}`} ref={heroRef}>
        <div className="ad-hero__wrap">
          <div className="ad-hero__text">
            <h1>App Development that delights users — <span>launch fast</span>, scale reliably.</h1>
            <p className="muted">Native features, seamless performance, and product-first mobile experiences for iOS & Android.</p>

            <div className="ad-hero__ctas">
              <a href="#contact" className="btn primary">Start Your App</a>
              <a href="#showcase" className="btn ghost">See Work</a>
            </div>

            <div className="ad-hero__stats">
              <div className="stat">
                <div className="num">{users.toLocaleString()}</div>
                <div className="label">Active users (sample)</div>
              </div>
              <div className="stat">
                <div className="num">4.8★</div>
                <div className="label">Avg Store Rating</div>
              </div>
              <div className="stat">
                <div className="num">99%</div>
                <div className="label">Crash-free sessions</div>
              </div>
            </div>
          </div>

          <div className="ad-hero__visual" aria-hidden="true">
            <div className="phone-mockup">
              <img src={MobileUI} alt="mobile ui" />
            </div>
            <div className="tablet-mockup">
              <img src={TabletUI} alt="tablet ui" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`ad-features ${featIn ? "in" : ""}`} ref={featRef}>
        <div className="container">
          <h2>What we build for mobile</h2>
          <p className="muted">From consumer apps to mission-critical enterprise tooling — we design for retention and growth.</p>

          <div className="features-grid">
            {features.map(f => (
              <article className="feature" key={f.id}>
                <div className="ic">📱</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <a className="link" href="#contact">Request</a>
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
            {["Cross-platform","iOS Native","Android Native"].map(p => (
              <button key={p} className={`plat ${platform === p ? "active" : ""}`} onClick={() => setPlatform(p)}>{p}</button>
            ))}
          </div>

          <div className="platform-content">
            {platform === "Cross-platform" && (
              <div className="plat-grid">
                <div><strong>Recommended stack</strong><p className="muted">React Native / Expo, TypeScript, Redux/MobX, Jest</p></div>
                <div><strong>CI / CD</strong><p className="muted">Fastlane, GitHub Actions, TestFlight / Play Console</p></div>
                <div><strong>Testing</strong><p className="muted">Unit, E2E (Detox), UI tests</p></div>
              </div>
            )}
            {platform === "iOS Native" && (
              <div className="plat-grid">
                <div><strong>Recommended stack</strong><p className="muted">Swift, Combine, SwiftUI</p></div>
                <div><strong>CI / CD</strong><p className="muted">Bitrise, Fastlane</p></div>
                <div><strong>Testing</strong><p className="muted">XCTest, Snapshot tests</p></div>
              </div>
            )}
            {platform === "Android Native" && (
              <div className="plat-grid">
                <div><strong>Recommended stack</strong><p className="muted">Kotlin, Coroutines, Jetpack Compose</p></div>
                <div><strong>CI / CD</strong><p className="muted">CircleCI, Gradle Play Publisher</p></div>
                <div><strong>Testing</strong><p className="muted">Espresso, Robolectric</p></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SHOWCASE / CASE STUDIES */}
      <section className="ad-showcase" id="showcase" ref={portfolioRef}>
        <div className="container">
          <h2>Selected app work</h2>
          <div className="showcase-grid">
            {showcases.map(s => (
              <article className="case" key={s.id} onClick={() => setLightbox(s)} tabIndex={0} role="button">
                <div className="case-media">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="case-body">
                  <h3>{s.title}</h3>
                  <p className="muted">{s.summary}</p>
                  <div className="tags">
                    {s.bullets.map((b,i) => <span key={i} className="tag">{b}</span>)}
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
          <div className="ad-lightbox__card" onClick={(e)=>e.stopPropagation()}>
            <button className="close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.img} alt={lightbox.title} />
            <h3>{lightbox.title}</h3>
            <p>{lightbox.summary}</p>
            <ul>
              {lightbox.bullets.map((b,i)=>(<li key={i}>{b}</li>))}
            </ul>
            <div className="actions">
              <a className="btn primary" href="#contact">Start Similar App</a>
              <a className="btn ghost" href="#contact">Ask about architecture</a>
            </div>
          </div>
        </div>
      )}

      {/* CI/CD + Quality */}
      <section className="ad-quality">
        <div className="container">
          <h2>Quality, CI/CD & Monitoring</h2>
          <div className="quality-grid">
            <div className="q">
              <h3>Automated Pipelines</h3>
              <p className="muted">GitHub Actions / Bitrise for builds, tests & distribution.</p>
            </div>
            <div className="q">
              <h3>Observability</h3>
              <p className="muted">Sentry, Crashlytics and performance monitoring integrated.</p>
            </div>
            <div className="q">
              <h3>Release Strategy</h3>
              <p className="muted">Phased rollouts, feature flags & canary releases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="ad-testimonials">
        <div className="container">
          <h2>Clients</h2>
          <div className="test-cards">
            <div className="test-card">
              <p className="quote">“{testimonials[activeTest].quote}”</p>
              <div className="author"><strong>{testimonials[activeTest].name}</strong><span className="muted"> — {testimonials[activeTest].role}</span></div>
            </div>
            <div className="dots">
              {testimonials.map((t,i)=>(
                <button key={t.id} className={`dot ${i===activeTest?'active':''}`} onClick={()=>setActiveTest(i)} aria-label={`testimonial ${i+1}`}></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="ad-pricing">
        <div className="container">
          <h2>Packages</h2>
          <div className="pricing-grid">
            <div className="pack">
              <h3>Prototype</h3>
              <div className="price">KES 40k</div>
              <ul><li>Clickable prototype</li><li>1 platform</li><li>2-week turnaround</li></ul>
              <a className="btn primary" href="#contact">Start Prototype</a>
            </div>
            <div className="pack featured">
              <h3>Product</h3>
              <div className="price">KES 150k</div>
              <ul><li>Cross-platform app</li><li>Backend & Auth</li><li>3 months support</li></ul>
              <a className="btn primary" href="#contact">Start Product</a>
            </div>
            <div className="pack">
              <h3>Scale</h3>
              <div className="price">Custom</div>
              <ul><li>Dedicated team</li><li>SLAs</li><li>Enterprise integrations</li></ul>
              <a className="btn ghost" href="#contact">Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ad-faq">
        <div className="container">
          <h2>FAQ</h2>
          <details><summary>How long does app development take?</summary><p className="muted">Typical MVP 6–10 weeks depending on scope.</p></details>
          <details><summary>Do you publish to app stores?</summary><p className="muted">Yes — we handle builds, assets and submission support.</p></details>
          <details><summary>Do you provide support?</summary><p className="muted">Monthly maintenance & monitoring packages available.</p></details>
        </div>
      </section>

      {/* STICKY CTA */}
      <aside className="ad-cta" id="contact">
        <div className="container cta-wrap">
          <div>
            <strong>Ready to build your app?</strong>
            <p className="muted">Book a discovery call and get a project blueprint.</p>
          </div>
          <a className="btn primary" href="#contact">Book Call</a>
        </div>
      </aside>
    </main>
  );
}
