"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus, X } from "lucide-react";

interface FAQProps {
  styles: any;
  faqSectionRef: React.RefObject<HTMLElement | null>;
  faqData: { q: string; a: string }[];
  openFaqIndex: number | null;
  handleFaqToggle: (index: number) => void;
}

export default function FAQ({
  styles,
  faqSectionRef,
  faqData,
  openFaqIndex,
  handleFaqToggle
}: FAQProps) {
  return (
    <section ref={faqSectionRef} className={styles.faqSection}>
      <div className={styles.faqHeader}>
        <div className={styles.faqLabelRow}>
          <span className={styles.faqLine} />
          <span className={styles.faqLabelText}>FAQ</span>
          <span className={styles.faqLine} />
        </div>
        <h2 className={styles.faqTitle}>Your Questions, Answered</h2>
      </div>

      <div className={styles.faqContent}>
        {/* LEFT: Contact Card */}
        <div className={styles.faqContactCard}>
          <div className={styles.faqContactInner}>
            <div className={styles.faqContactTop}>
              <Image
                src="/founder.jpg"
                alt="Paras Mottan"
                width={56}
                height={56}
                className={styles.faqAvatar}
              />
              <div className={styles.faqContactText}>
                <span className={styles.faqContactHeading}>Have more questions?</span>
                <span className={styles.faqContactSub}>Book a free discovery call</span>
              </div>
            </div>
            <Link href="/contact" className={styles.faqCtaBtn}>
              <span className={styles.faqCtaIcon}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
              </span>
              Book a Meeting
              <ArrowRight size={16} />
            </Link>
            <p className={styles.faqEmailText}>
              Or, email me at <strong>parassmottan@gmail.com</strong>
            </p>
          </div>
        </div>

        {/* RIGHT: Accordion */}
        <div className={styles.faqAccordion}>
          {faqData.map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => handleFaqToggle(i)}
                aria-expanded={openFaqIndex === i}
              >
                <span className={styles.faqQuestionText}>{item.q}</span>
                <span className={`${styles.faqToggleIcon} ${openFaqIndex === i ? styles.faqToggleOpen : ''}`}>
                  {openFaqIndex === i ? <X size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div
                className={`${styles.faqAnswer} ${openFaqIndex === i ? styles.faqAnswerOpen : ''}`}
                aria-hidden={openFaqIndex !== i}
              >
                <p className={styles.faqAnswerText}>{item.a}</p>
              </div>
              <div className={styles.faqDivider} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
