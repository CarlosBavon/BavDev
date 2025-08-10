import React, { useState } from "react";
import "../styles/Portfolio.css";

import ECommerce from '../images/E-Commerce.png';
import PortfolioImg from '../images/Portfolio.png';
import ResApp from '../images/ResApp.jpg';
import BatteryApp from '../images/BatteryApp.jpg';

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Website",
    category: "Web Development",
    img: ECommerce,
    description: "A full-stack e-commerce store with cart, checkout, and admin dashboard.",
    link: "https://porky-delights.vercel.app"
  },
  {
    id: 2,
    title: "E-Commerce App",
    category: "App Development",
    img: ResApp,
    description: "A mobile responsive E-Commerce website.",
    link: "https://porky-delights.vercel.app"
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "Web Development",
    img: PortfolioImg,
    description: "Modern personal portfolio with animations and responsive design.",
    link: "https://portfolio-alpha-one-qfbcpm6tge.vercel.app/"
  },
  {
    id: 4,
    title: "Battery Widget App",
    category: "App Development",
    img: BatteryApp,
    description: "An app to track battery percentage, charging or not charging.",
    link: "https://battery-widget.vercel.app/"
  }
];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalProject, setModalProject] = useState(null);

  const categories = ["All", "Web Development", "App Development"];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter(p => p.category === selectedCategory);

  return (
    <div className="portfolio">
      <h1 className="portfolio__title">Projects</h1>

      {/* Category Filters */}
      <div className="portfolio__filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div className="portfolio__grid">
        {filteredProjects.map(project => (
          <div
            className="portfolio__item"
            key={project.id}
            onClick={() => setModalProject(project)}
          >
            <img src={project.img} alt={project.title} />
            <div className="portfolio__overlay">
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalProject && (
        <div className="portfolio__modal" onClick={() => setModalProject(null)}>
          <div className="portfolio__modal-content" onClick={e => e.stopPropagation()}>
            <img src={modalProject.img} alt={modalProject.title} />
            <h2>{modalProject.title}</h2>
            <p>{modalProject.description}</p>
            <a href={modalProject.link} target="_blank" rel="noreferrer"><strong>Link:</strong> {modalProject.title}</a>
            <div>
                <button onClick={() => setModalProject(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
