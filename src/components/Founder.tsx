"use client";

import React from "react";
import Image from "next/image";

interface FounderProps {
  styles: any;
  fndrSectionRef: React.RefObject<HTMLElement | null>;
  fndrLeftRef: React.RefObject<HTMLDivElement | null>;
  fndrRightRef: React.RefObject<HTMLDivElement | null>;
}

export default function Founder({
  styles,
  fndrSectionRef,
  fndrLeftRef,
  fndrRightRef
}: FounderProps) {
  return (
    <section ref={fndrSectionRef} className={styles.fndrSection}>
      <div className={styles.fndrHeader}>
        <div className={styles.fndrLabelRow}>
          <span className={styles.fndrLine} />
          <span className={styles.fndrLabelText}>The founder</span>
          <span className={styles.fndrLine} />
        </div>
        <h2 className={styles.fndrTitle}>
          Pushing Brands <span className={styles.fndrTitleLight}>since 2023</span>
        </h2>
      </div>

      <div className={styles.fndrContent}>
        {/* Left: Image Card */}
        <div ref={fndrLeftRef} className={styles.fndrLeft}>
          <div className={styles.fndrCard}>
            <Image
              src="/founder.jpg"
              alt="Paras Mottan"
              fill
              className={styles.fndrImage}
              style={{ objectFit: "cover", objectPosition: "center" }}
              sizes="(max-width: 960px) 100%, 50vw"
            />
          </div>
          <div className={styles.fndrMeta}>
            <div>
              <h3 className={styles.fndrName}>Paras Mottan</h3>
              <p className={styles.fndrRole}>Founder & Developer</p>
            </div>
            <div className={styles.fndrSocials}>
              {/* GitHub Icon */}
              <a 
                href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB} 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialIcon}
                aria-label="GitHub Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              {/* LinkedIn Icon */}
              <a 
                href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN} 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialIcon}
                aria-label="LinkedIn Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right: Bio & Experience */}
        <div ref={fndrRightRef} className={styles.fndrRight}>
          <div className={styles.fndrBio}>
            <p>Paras is a full-stack MERN developer and creative web designer who focuses on building modern, high-performance digital experiences.</p>
            <p>He combines clean engineering with thoughtful design to create fast, scalable websites and web applications that help businesses grow online.</p>
            <p>He specializes in React, Node.js, GSAP animations, and modern UI systems, crafting websites that feel premium, smooth, and conversion-focused.</p>
          </div>

          <div className={styles.fndrExperience}>
            <div className={styles.fndrRow}>
              <span className={styles.fndrRowRole}>Founder</span>
              <span className={styles.fndrRowCompany}>Personal Studio</span>
              <span className={styles.fndrRowYear}>2024 → Now</span>
            </div>
            <div className={styles.fndrRow}>
              <span className={styles.fndrRowRole}>Full-Stack Developer</span>
              <span className={styles.fndrRowCompany}>Freelance</span>
              <span className={styles.fndrRowYear}>2023 → Now</span>
            </div>
            <div className={styles.fndrRow}>
              <span className={styles.fndrRowRole}>Frontend Engineer</span>
              <span className={styles.fndrRowCompany}>React / GSAP Projects</span>
              <span className={styles.fndrRowYear}>2023 → Now</span>
            </div>
            <div className={styles.fndrRow}>
              <span className={styles.fndrRowRole}>MERN Developer</span>
              <span className={styles.fndrRowCompany}>Independent Projects</span>
              <span className={styles.fndrRowYear}>2023 → Now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
