"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CaseStudiesProps {
  styles: any;
  caseStudiesSectionRef: React.RefObject<HTMLElement | null>;
  caseStudiesCardsRef: React.RefObject<HTMLDivElement | null>;
}

export default function CaseStudies({
  styles,
  caseStudiesSectionRef,
  caseStudiesCardsRef
}: CaseStudiesProps) {
  const projects = [
    {
      slug: "veloura",
      title: "Veloura",
      image: "/project-veloura.png",
      tags: ["Web Design", "Streaming"],
    },
    {
      slug: "seeker-to-helper",
      title: "Seeker to Helper",
      image: "/project-seeker-helper.png",
      tags: ["Platform", "Role-based"],
    },
    {
      slug: "splitly",
      title: "Splitly",
      image: "/project-splitly.png",
      tags: ["Web App", "Finance"],
    },
    {
      slug: "p&s",
      title: "P&S",
      image: "/project-pns.png",
      tags: ["E-Commerce", "Furniture"],
    },
  ];

  return (
    <section ref={caseStudiesSectionRef} className={styles.caseStudiesSection}>
      <div className={styles.csHeader}>
        <div className={styles.csLabelRow}>
          <span className={styles.csLine} />
          <span className={styles.csLabelText}>Our Projects</span>
          <span className={styles.csLine} />
        </div>
        <h2 className={styles.csTitle}>Recent Case Studies</h2>
      </div>

      <div ref={caseStudiesCardsRef} className={styles.csGrid}>
        {projects.map((project, idx) => (
          <Link key={idx} href={`/work/${project.slug}`} className={styles.csCard}>
            <div className={styles.monitorWrapper}>
              <div className={styles.monitorScreen}>
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  style={{ objectFit: "cover", objectPosition: "top" }} 
                  sizes="(max-width: 960px) 100%, 50vw" 
                />
                <div className={styles.monitorReflection} />
              </div>
              <div className={styles.monitorBase} />
            </div>
            <div className={styles.csCardFooter}>
              <h3 className={styles.csProjectTitle}>{project.title}</h3>
              <div className={styles.csTags}>
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className={styles.csTag}>{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
