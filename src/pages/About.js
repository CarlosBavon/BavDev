import React from "react";
import "../styles/About.css";
import Bavon from '../images/Bavon.png';

export default function About() {
  return (
    <section className="about">
      <div className="about__hero">
        <h1>About <span>Me</span></h1>
        <p className="about__tagline">Crafting code with creativity & precision</p>
      </div>

      <div className="about__content">
        <div className="about__image">
          <img src={Bavon} alt="Bavon" />
        </div>

        <div className="about__text">
          <h2>Who am I?</h2>
          <p>
            I’m Bavon, a passionate Web & App Developer who transforms ideas into digital realities.
            With a strong eye for design and a love for functionality, I craft solutions that blend
            beauty and performance.
          </p>

          <h2>Skills & Tech Stack</h2>
          <ul className="skills">
            <li>React.js / CRA</li>
            <li>React Native</li>
            <li>Node.js & Express</li>
            <li>UI/UX & Responsive Design</li>
            <li>API Development</li>
          </ul>

          <h2>My Approach</h2>
          <p>
            Every project I work on is guided by clarity, quality, and care.  
            Whether it’s a sleek portfolio or a complex web platform, my goal
            is to deliver something that makes an impact.
          </p>
        </div>
      </div>
    </section>
  );
}
