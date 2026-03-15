"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Activity, Zap, Layers, FileCode, MessageSquare, Terminal, ShieldCheck, Send } from "lucide-react";

interface PricingProps {
  styles: any;
  pricingMode: "development" | "website";
  handleToggleClick: () => void;
  isFading: boolean;
  featureGridRef: React.RefObject<HTMLDivElement | null>;
  fgItemsRef: React.RefObject<HTMLDivElement | null>;
}

export default function Pricing({
  styles,
  pricingMode,
  handleToggleClick,
  isFading,
  featureGridRef,
  fgItemsRef
}: PricingProps) {
  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingHeader}>
        <div className={styles.pricingLabelRow}>
          <span className={styles.pricingLine} />
          <span className={styles.pricingLabelText}>Pricing</span>
          <span className={styles.pricingLine} />
        </div>
        <h2 className={styles.pricingTitle}>Fixed Price, Zero Limits</h2>
      </div>

      <div className={styles.pricingContainer}>
        {/* PRICING TOP ROW */}
        <div className={styles.pricingTopRow}>
          {/* LEFT COLUMN */}
          <div className={styles.pricingLeft}>
            <div className={styles.toggleWrapper}>
              <span
                className={`${styles.toggleLabel} ${pricingMode === "development" ? styles.toggleActive : styles.toggleInactive}`}
                onClick={() => {
                  if (pricingMode !== "development") handleToggleClick();
                }}
              >
                Development
              </span>
              <div className={styles.toggleTrack} onClick={handleToggleClick}>
                <div className={`${styles.toggleKnob} ${pricingMode === "website" ? styles.toggleKnobToggled : ""}`} />
              </div>
              <span
                className={`${styles.toggleLabel} ${pricingMode === "website" ? styles.toggleActive : styles.toggleInactive}`}
                onClick={() => {
                  if (pricingMode !== "website") handleToggleClick();
                }}
              >
                Full Website
              </span>
            </div>

            <div className={`${styles.fadeContainer} ${isFading ? styles.fadeExiting : styles.fadeEntering}`}>
              <div className={styles.priceBlock}>
                {pricingMode === "development" ? (
                  <h3 className={styles.priceHeading}>
                    ₹2,500 <span className={styles.priceSub}>per Hour</span>
                  </h3>
                ) : (
                  <h3 className={styles.priceHeading}>
                    <span className={styles.priceSub}>from</span> ₹55,000
                  </h3>
                )}
              </div>
            </div>

            <div className={styles.statusContainer}>
              <div className={styles.statusRow}>
                <span className={styles.statusDot} />
                <span className={styles.statusText}>Available to work</span>
              </div>
              <Link href="/contact" className={styles.btnCta}>
                Book a Meeting
                <ArrowRight className={styles.btnArrow} />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className={`${styles.pricingRight} ${styles.fadeContainer} ${isFading ? styles.fadeExiting : styles.fadeEntering}`}>
            <h3 className={styles.featuresTitle}>What's included</h3>

            <ul className={styles.featuresList}>
              {pricingMode === "development" ? (
                <>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Direct client communication</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Fast development turnaround</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Clean scalable code</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Performance optimized builds</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Flexible project scope</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Ongoing support</li>
                </>
              ) : (
                <>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Complete website design</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Custom UI/UX design</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Responsive mobile layout</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> SEO optimized structure</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Performance optimized</li>
                  <li className={styles.featureItem}><span className={styles.featureIcon}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></span> Deployment support</li>
                </>
              )}
            </ul>

            <div className={styles.testimonialBlock}>
              <span className={styles.testimonialQuoteIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </span>

              {pricingMode === "development" ? (
                <>
                  <p className={styles.testimonialText}>
                    Paras built a modern web application for our business that exceeded expectations. The experience was smooth, communication was great, and the final product was extremely fast and well designed.
                  </p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>R</div>
                    <div className={styles.testimonialNames}>
                      <span className={styles.testimonialName}>Rahul Mehta</span>
                      <span className={styles.testimonialCompany}>FitPulse Gym</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className={styles.testimonialText}>
                    Working with Paras on our website redesign was a great experience. He delivered a modern, fast, and professional website that helped improve our online presence significantly.
                  </p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>A</div>
                    <div className={styles.testimonialNames}>
                      <span className={styles.testimonialName}>Ankit Sharma</span>
                      <span className={styles.testimonialCompany}>Salon Studio</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURE GRID BELOW PRICING CARD ─────────────────────── */}
      <div ref={featureGridRef} className={styles.featureGridWrapper}>
        <div ref={fgItemsRef} className={styles.featureGridInner}>
          {/* Column 1 */}
          <div className={styles.fgColumn}>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><Smartphone /></span>
                <span className={styles.fgText}>Senior-level development</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><Activity /></span>
                <span className={styles.fgText}>Clear development process</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><Zap /></span>
                <span className={styles.fgText}>Fast delivery</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
          </div>

          {/* Column 2 */}
          <div className={styles.fgColumn}>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><Layers /></span>
                <span className={styles.fgText}>Scalable architecture</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><FileCode /></span>
                <span className={styles.fgText}>Clean maintainable code</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><MessageSquare /></span>
                <span className={styles.fgText}>Thoughtful technical feedback</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
          </div>

          {/* Column 3 */}
          <div className={styles.fgColumn}>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><Terminal /></span>
                <span className={styles.fgText}>Developer friendly builds</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><ShieldCheck /></span>
                <span className={styles.fgText}>Reliable long-term support</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
            <div className={styles.fgItemWrapper}>
              <div className={styles.fgItem}>
                <span className={styles.fgIcon}><Send /></span>
                <span className={styles.fgText}>Smooth project handoff</span>
              </div>
              <div className={styles.fgDivider} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
