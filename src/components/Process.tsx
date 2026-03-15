"use client";

import React from "react";

interface ProcessProps {
  styles: any;
  processSectionRef: React.RefObject<HTMLElement | null>;
  processCardsRef: React.RefObject<HTMLDivElement | null>;
}

export default function Process({
  styles,
  processSectionRef,
  processCardsRef
}: ProcessProps) {
  return (
    <section ref={processSectionRef} className={styles.processSection}>
      <div className={styles.processHeader}>
        <div className={styles.processLabelRow}>
          <span className={styles.processLine} />
          <span className={styles.processLabelText}>Process</span>
          <span className={styles.processLine} />
        </div>
        <h2 className={styles.processTitle}>A Workflow that actually delivers</h2>
      </div>

      <div ref={processCardsRef} className={styles.processGrid}>
        {/* Card 1 */}
        <div className={styles.processCard}>
          <div className={styles.processCardNum}>1</div>
          <div className={styles.processCardContent}>
            <div className={styles.processCardTitle}>Discovery</div>
            <div className={styles.processCardDesc}>
              We dive deep into your brand, your goals, and your customers to find the core problem we need to solve.
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className={styles.processCard}>
          <div className={styles.processCardNum}>2</div>
          <div className={styles.processCardContent}>
            <div className={styles.processCardTitle}>Strategy</div>
            <div className={styles.processCardDesc}>
              We build a clear roadmap of how your brand will look, speak, and act to win the market.
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className={styles.processCard}>
          <div className={styles.processCardNum}>3</div>
          <div className={styles.processCardContent}>
            <div className={styles.processCardTitle}>Build</div>
            <div className={styles.processCardDesc}>
              This is where we bring everything to life. We refine every pixel and polish every micro-interaction.
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className={styles.processCard}>
          <div className={styles.processCardNum}>4</div>
          <div className={styles.processCardContent}>
            <div className={styles.processCardTitle}>Activate</div>
            <div className={styles.processCardDesc}>
              We launch your brand across all channels creating a consistent experience that grows with you.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
