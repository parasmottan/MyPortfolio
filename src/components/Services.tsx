"use client";

import React from "react";
import { Zap, Activity, Smartphone, Layers, FileCode, MessageSquare } from "lucide-react";
import { SplitChars } from "@/lib/utils";

interface ServicesProps {
  styles: any;
  servicesSectionRef: React.RefObject<HTMLElement | null>;
  servicesLeftPillsRef: React.RefObject<HTMLDivElement | null>;
  servicesRightPillsRef: React.RefObject<HTMLDivElement | null>;
  servicesCenterRef: React.RefObject<HTMLDivElement | null>;
  servicesHeadingRef: React.RefObject<HTMLHeadingElement | null>;
}

export default function Services({
  styles,
  servicesSectionRef,
  servicesLeftPillsRef,
  servicesRightPillsRef,
  servicesCenterRef,
  servicesHeadingRef
}: ServicesProps) {
  return (
    <section ref={servicesSectionRef} className={styles.servicesSection}>

      {/* LEFT pills */}
      <div ref={servicesLeftPillsRef} className={styles.servLeftPills}>
        <div className={styles.pill}>
          <span className={styles.pillIcon} style={{ background: "#FF6030" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="5.5" height="5.5" fill="white" rx="1.2" />
              <rect x="9.5" y="1" width="5.5" height="5.5" fill="white" rx="1.2" />
              <rect x="1" y="9.5" width="5.5" height="5.5" fill="white" rx="1.2" />
              <rect x="9.5" y="9.5" width="5.5" height="5.5" fill="white" rx="1.2" />
            </svg>
          </span>
          <span className={styles.pillLabel}>Design systems</span>
        </div>

        <div className={styles.pill} style={{ marginLeft: "42px" }}>
          <span className={styles.pillIcon} style={{ background: "#1c1c1c" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="2.5" width="14" height="9" rx="2" stroke="white" strokeWidth="1.4" />
              <path d="M5.5 13.5h5M8 11.5v2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className={styles.pillLabel}>UX Design</span>
        </div>

        <div className={styles.pill} style={{ marginLeft: "80px" }}>
          <span className={styles.pillIcon} style={{ background: "#399DFF" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4" stroke="white" strokeWidth="1.5" />
              <path d="M10 10L13 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className={styles.pillLabel}>Research</span>
        </div>
      </div>

      {/* CENTER */}
      <div ref={servicesCenterRef} className={styles.servCenter}>
        <div className={styles.servSub}>
          <Zap size={14} fill="#FFD600" color="#FFD600" />
          <span>Hello!</span>
        </div>
        <h2 className={styles.servHeading} ref={servicesHeadingRef}>
          <div className={styles.servLine}>
            <SplitChars text="I create digital" />
          </div>
          <div className={styles.servLine}>
            <SplitChars text="products that" />
          </div>
          <div className={styles.servLine}>
            <SplitChars text="actually" /> <span className={styles.textOutline}>work.</span>
          </div>
        </h2>
      </div>

      {/* RIGHT pills */}
      <div ref={servicesRightPillsRef} className={styles.servRightPills}>
        <div className={styles.pill} style={{ marginLeft: "auto", marginRight: "60px" }}>
          <span className={styles.pillIcon} style={{ background: "#00C38B" }}>
            <Activity size={16} color="white" strokeWidth={2.5} />
          </span>
          <span className={styles.pillLabel}>Performance</span>
        </div>

        <div className={styles.pill} style={{ marginLeft: "auto", marginRight: "28px" }}>
          <span className={styles.pillIcon} style={{ background: "#1c1c1c" }}>
            <Smartphone size={16} color="white" />
          </span>
          <span className={styles.pillLabel}>Mobile First</span>
        </div>

        <div className={styles.pill} style={{ marginLeft: "auto" }}>
          <span className={styles.pillIcon} style={{ background: "#8A2BE2" }}>
            <Layers size={16} color="white" />
          </span>
          <span className={styles.pillLabel}>Scalability</span>
        </div>
      </div>

    </section>
  );
}
