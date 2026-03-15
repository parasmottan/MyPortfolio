"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Footer.module.css";
import { Linkedin, Twitter, Dribbble, ArrowUpRight, ArrowRight, Mail, Instagram, Sparkles, Framer, Github } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/work/")) {
    return null; // Hide the global footer on individual project case study routes
  }

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.topSection}>
          <div className={styles.availability}>
            <span className={styles.dot}></span> Available for work
          </div>
          <h2 className={styles.heading}>
            Let's <i>Connect</i>
          </h2>
          <p className={styles.subtext}>
            <span className={styles.hideOnMobile}>
              Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
            </span>
            <span className={styles.showOnMobileText}>
              Feel free to contact me if having any questions. I'm available for new projects or just for chatting.
            </span>
          </p>
          <Link href="/contact" className={styles.contactBtn}>
            <span className={styles.mobileBtnIconLeft}>
              <Sparkles size={16} color="black" fill="black" />
            </span>
            <span className={styles.btnText}>Book a Meeting</span>
            <ArrowUpRight size={18} className={styles.hideOnMobile} />
            <ArrowRight size={16} className={styles.showOnMobileIcon} />
          </Link>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.links}>
            <span className={styles.hideOnMobile}>© Paras Mottan, 2026</span>
            <span className={styles.showOnMobileCopy}>© Denqid, 2025</span>
            <Link href="/terms-and-conditions" className={styles.legalLink}>
              <span className={styles.hideOnMobile}>Terms &amp; Conditions</span>
              <span className={styles.showOnMobileLegal}>Legal Notice</span>
            </Link>
            <Link href="/privacy-policy" className={styles.legalLink}>Privacy Policy</Link>
          </div>
          <div className={styles.socials}>
            <a href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN} target="_blank" rel="noreferrer" className={styles.hideOnMobileFlex} aria-label="LinkedIn Profile"><Linkedin size={20} /></a>
            <a href={process.env.NEXT_PUBLIC_SOCIAL_TWITTER} target="_blank" rel="noreferrer" className={styles.hideOnMobileFlex} aria-label="Twitter Profile"><Twitter size={20} /></a>
            <a href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB} target="_blank" rel="noreferrer" className={styles.hideOnMobileFlex} aria-label="GitHub Profile"><Github size={20} /></a>
            
            <a href="mailto:hello@parasmottan.com" className={styles.showOnMobileFlex} aria-label="Email Me"><Mail size={16} strokeWidth={1.5} /></a>
            <a href={process.env.NEXT_PUBLIC_SOCIAL_GITHUB} target="_blank" rel="noreferrer" className={styles.showOnMobileFlex} aria-label="GitHub Profile"><Github size={16} strokeWidth={1.5} /></a>
            <a href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN} target="_blank" rel="noreferrer" className={styles.showOnMobileFlex} aria-label="LinkedIn Profile"><Linkedin size={16} strokeWidth={1.5} /></a>
            <a href={process.env.NEXT_PUBLIC_SOCIAL_TWITTER} target="_blank" rel="noreferrer" className={styles.showOnMobileFlex} aria-label="Twitter Profile"><Twitter size={16} strokeWidth={1.5} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
