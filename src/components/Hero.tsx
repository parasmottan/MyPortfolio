"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  styles: any;
  heroRef: React.RefObject<HTMLDivElement | null>;
  word1Ref: React.RefObject<HTMLSpanElement | null>;
  word2Ref: React.RefObject<HTMLDivElement | null>;
  word3Ref: React.RefObject<HTMLDivElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  ctaRef: React.RefObject<HTMLAnchorElement | null>;
}

export default function Hero({
  styles,
  heroRef,
  word1Ref,
  word2Ref,
  word3Ref,
  subtitleRef,
  ctaRef
}: HeroProps) {
  return (
    <section className={styles.hero} ref={heroRef} style={{ minHeight: "100vh", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <div className={styles.availabilityBadge}>
          <div className={styles.availabilityDot}></div>
          Available to work
        </div>

        <h1 className={styles.heroTitle}>
          <div className={styles.heroTitleRow}>
            <span ref={word1Ref} className={styles.heroWordMain}>Brands</span>
            <div ref={word2Ref} className={`${styles.floatingCard} ${styles.heroImageCard}`}>
              <div className={styles.heroBox1Inner}>
                {[
                  "/project-veloura.png",
                  "/project-seeker-helper.png",
                  "/project-splitly.png",
                  "/project-pns.png",
                  "/project-memoire.png",
                  "/project-veloura.png",
                  "/project-seeker-helper.png",
                  "/project-splitly.png",
                  "/project-pns.png",
                  "/project-memoire.png"
                ].map((src, idx) => (
                  <div key={idx} className={styles.heroBox1ImgWrapper}>
                    <Image src={src} alt={`Project ${idx}`} fill className={styles.heroBoxImg} sizes="200px" />
                  </div>
                ))}
              </div>
            </div>
            <span className={styles.heroWordMuted}>Grow</span>
          </div>
          <div className={styles.heroTitleRow}>
            <span className={`${styles.heroWordMuted} ${styles.heroWordFast}`}>Fast</span>
            <div ref={word3Ref} className={`${styles.floatingCard} ${styles.heroToolCard}`}>
              <div className={styles.heroBox2Inner}>
                {(() => {
                  const tools = [
                    { name: "Figma", icon: <svg width="18" height="18" viewBox="0 0 38 57" fill="none"><path d="M19 28.5A9.5 9.5 0 1 1 38 28.5A9.5 9.5 0 1 1 19 28.5z" fill="#1ABCFE" /><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19V57C13.75 57 9.5 52.75 9.5 47.5z" fill="#0ACF83" /><path d="M19 0H9.5A9.5 9.5 0 0 0 0 9.5A9.5 9.5 0 0 0 9.5 19H19V0z" fill="#F24E1E" /><path d="M19 19H9.5A9.5 9.5 0 0 0 0 28.5A9.5 9.5 0 0 0 9.5 38H19V19z" fill="#A259FF" /><path d="M38 9.5A9.5 9.5 0 0 1 28.5 19H19V0H28.5A9.5 9.5 0 0 1 38 9.5z" fill="#F86D24" /></svg> },
                    { name: "Webflow", icon: <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><path d="M22.8 10L19.5 22L16 12L12.5 22L9.2 10H5L10.5 26.5H14.5L16 20.5L17.5 26.5H21.5L27 10H22.8Z" fill="#4353FF" /></svg> },
                    { name: "Framer", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 12V4H20V12H12L4 20V12Z" fill="#00AAF5" /><path d="M20 12V20H12L20 12Z" fill="#0075FF" /></svg> },
                    { name: "React", icon: <svg width="18" height="18" viewBox="-11.5 -10.2 23 20.4" fill="none"><circle cx="0" cy="0" r="2.05" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg> },
                    { name: "Next.js", icon: <svg width="18" height="18" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" /><path d="M23 24.5L12 9.5H9.5V23H11.5V12.5L21.5 26.5L23 24.5ZM21.5 9.5H19.5V17.5H21.5V9.5Z" fill="black" /></svg> },
                    { name: "GSAP", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#88CE02" /><path d="M16 12H12V16H16C17.1 16 18 15.1 18 14V10L16 12Z" fill="white" /></svg> },
                    { name: "Three.js", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 20H22L12 2Z" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="2" fill="white" /></svg> },
                    { name: "Tailwind", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12.001 5.418c-3.593-.058-6.147 1.34-7.663 4.194 1.258-1.574 2.879-2.112 4.863-1.614 1.32.33 2.261 1.284 3.3 2.342 1.63 1.66 3.498 3.565 7.498 3.565 3.592.058 6.146-1.34 7.662-4.194-1.258 1.575-2.88 2.113-4.863 1.615-1.32-.33-2.262-1.283-3.3-2.341-1.631-1.66-3.498-3.566-7.497-3.567z" fill="#06B6D4" /></svg> },
                    { name: "Node.js", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#339933" /></svg> },
                    { name: "JavaScript", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#F7DF1E"><rect width="24" height="24" rx="2" /><path d="M16 18.5C15 19.5 13.5 20 12 20C10 20 8.5 19.3 7.8 18L9.5 16.8C10 17.5 10.8 18 11.8 18C12.8 18 13.5 17.5 13.5 16.8C13.5 15.5 10 15.5 10 13.5C10 11.5 11.5 10.5 13.5 10.5C15 10.5 16.2 11 17 12L15.3 13.2C14.8 12.5 14 12.2 13.2 12.2C12.5 12.2 12 12.5 12 13C12 14.5 15.5 14.2 15.5 16.5C15.5 17.8 16.8 18.5 16 18.5ZM7.5 19.5H5.5V11H7.5V19.5Z" fill="black" /></svg> }
                  ];
                  const doubleTools = [...tools, ...tools];
                  return doubleTools.map((t, idx) => (
                    <div key={idx} className={styles.toolItem}>
                      {t.icon}
                      <span>{t.name}</span>
                    </div>
                  ));
                })()}
              </div>
            </div>
            <span className={styles.heroWordMain}>With us</span>
          </div>
        </h1>

        <p className={styles.heroSubtitle} ref={subtitleRef}>
          We don&apos;t just make brands pretty — we craft smart design that fuels real business growth.
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={styles.heroCtaWrapper}>
            <Link href="/contact" ref={ctaRef} className={styles.heroCtaMain}>
              <div className={styles.heroCtaIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={styles.heroCtaSparkle}>
                  <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
                </svg>
              </div>
              <span>Book a Meeting</span>
              <div className={styles.heroCtaArrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
