"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ShowcaseProps {
  styles: any;
  portfolioGridRef: React.RefObject<HTMLElement | null>;
  showcaseRef: React.RefObject<HTMLDivElement | null>;
  floatingLabelRef: React.RefObject<HTMLDivElement | null>;
  circleBtnRef: React.RefObject<HTMLButtonElement | null>;
}

export default function Showcase({
  styles,
  portfolioGridRef,
  showcaseRef,
  floatingLabelRef,
  circleBtnRef
}: ShowcaseProps) {
  return (
    <section ref={(el) => { if (el) portfolioGridRef.current = el; }} className={styles.showcaseSection}>
      <div ref={showcaseRef} className={styles.showcaseContainer}>

        {/* ── Background scroll columns ─────────────────── */}
        <div className={styles.showcaseBgCols}>

          {/* Left column — slower scroll */}
          <div className={styles.showcaseColLeft}>
            {[
              { src: "/project-veloura.png", alt: "Veloura" },
              { src: "/project-seeker-helper.png", alt: "Seeker to Helper" },
              { src: "/project-splitly.png", alt: "Splitly" },
              { src: "/project-pns.png", alt: "P&S" },
              { src: "/project-memoire.png", alt: "Memoire" },
              { src: "/project-veloura.png", alt: "Veloura" },
              { src: "/project-seeker-helper.png", alt: "Seeker to Helper" },
              { src: "/project-splitly.png", alt: "Splitly" },
              { src: "/project-pns.png", alt: "P&S" },
              { src: "/project-memoire.png", alt: "Memoire" },
            ].map((p, i) => (
              <div key={i} className={styles.showcaseBgCard}>
                <img src={p.src} alt={p.alt} className={styles.showcaseBgImg} />
              </div>
            ))}
          </div>

          {/* Right column — slightly faster scroll */}
          <div className={styles.showcaseColRight}>
            {[
              { src: "/project-pns.png", alt: "P&S" },
              { src: "/project-memoire.png", alt: "Memoire" },
              { src: "/project-veloura.png", alt: "Veloura" },
              { src: "/project-splitly.png", alt: "Splitly" },
              { src: "/project-seeker-helper.png", alt: "Seeker to Helper" },
              { src: "/project-pns.png", alt: "P&S" },
              { src: "/project-memoire.png", alt: "Memoire" },
              { src: "/project-veloura.png", alt: "Veloura" },
              { src: "/project-splitly.png", alt: "Splitly" },
              { src: "/project-seeker-helper.png", alt: "Seeker to Helper" },
            ].map((p, i) => (
              <div key={i} className={styles.showcaseBgCard}>
                <img src={p.src} alt={p.alt} className={styles.showcaseBgImg} />
              </div>
            ))}
          </div>

        </div>

        {/* ── Cinematic tint overlay ─────────────────────── */}
        <div className={styles.showcaseTint} aria-hidden="true" />

        {/* ── Center Hub — the only interactive element ──── */}
        <div className={styles.showcaseHub}>
          {/* Floating badge */}
          <div ref={floatingLabelRef} className={styles.showcaseHubBadge}>See Recent Work</div>
          {/* Circle navigates to /work */}
          <Link
            href="/work"
            className={styles.showcaseHubCircle}
            aria-label="See all work"
          >
            {/* Folder Icon */}
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6C3 4.9 3.9 4 5 4H10L12 6H19C20.1 6 21 6.9 21 8V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V6Z" fill="#111" />
            </svg>
            <button ref={circleBtnRef} className={styles.hubBtnProxy} aria-hidden="true" tabIndex={-1} />
          </Link>
        </div>

      </div>
    </section>
  );
}
