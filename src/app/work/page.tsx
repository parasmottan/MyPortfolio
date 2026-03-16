"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./page.module.css";

const PROJECTS = [
  { id: 1, title: "Veloura", desc: "Premium Streaming Experience", year: "2023", cat: "Web Design", bg: "#111111", image: "/project-veloura.png" },
  { id: 2, title: "Seeker to Helper", desc: "Two-Sided Support Platform", year: "2023", cat: "MVP", bg: "#f7f7f7", image: "/project-seeker-helper.png" },
  { id: 3, title: "Splitly", desc: "Smart Expense Splitting App", year: "2024", cat: "MVP", bg: "#2d1b69", image: "/project-splitly.png" },

  { id: 4, title: "P&S", desc: "Premium Beds for Modern Homes", year: "2022", cat: "Web Design", bg: "#2a1c13", image: "/project-pns.png" },
  { id: 5, title: "Memoire", desc: "Memory Preservation Platform", year: "2021", cat: "MVP", bg: "#161616", image: "/project-memoire.png" },
];

const FILTERS = ["All", "Web Design", "MVP", "Branding"];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const filteredProjects = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === activeFilter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach(t => t.kill());

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [filteredProjects]);

  return (
    <main className={styles.main}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Selected Works</h1>
            <p className={styles.subtitle}>
              A curated archive of projects that define our approach to digital craftsmanship. From branding to full-stack applications.
            </p>
          </div>

          <div className={styles.filters}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.active : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project, i) => (
            <Link
              href={`/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              key={project.id}
              className={styles.projectCard}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              style={i === 0 || i === 4 ? { gridColumn: "1 / -1", height: "120%" } : {}}
            >
              <div className={styles.imageWrap} style={{ backgroundColor: project.bg, aspectRatio: i === 0 || i === 4 ? '16/7' : '4/3', position: 'relative', overflow: 'hidden' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100%, 50vw"
                />
              </div>
              <div className={styles.meta}>
                <div>
                  <h3 className={styles.projectName}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.desc}</p>
                </div>
                <span className={styles.projectYear}>{project.year}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
