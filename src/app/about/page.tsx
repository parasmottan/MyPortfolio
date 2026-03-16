"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import styles from "./page.module.css";

const TIMELINE = [
  { year: "2024 — Present", role: "Founder & Web Experience Designer", company: "Paras Mottan Studio", desc: "Running a boutique web design studio focused on creating premium websites for brands, creators, and businesses. Specializing in modern UI, animations, and high-end web experiences." },
  { year: "2023 — Present", role: "Freelance Web Designer & Developer", company: "Independent", desc: "Designing and developing modern websites for international clients. Focus on high-performance websites, engaging user experiences, and conversion-focused design." },
  { year: "2022 — 2023", role: "Frontend Developer & UI Designer", company: "Freelance", desc: "Worked on modern web interfaces using JavaScript frameworks, responsive design systems, and performance-focused development practices." }
];

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Portrait Float
    if (portraitRef.current) {
      gsap.to(portraitRef.current, {
        y: -30,
        ease: "sine.inOut",
        duration: 4,
        yoyo: true,
        repeat: -1
      });
    }

    // Timeline Stagger
    ScrollTrigger.create({
      trigger: timelineRefs.current[0],
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(timelineRefs.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
    });

    // Section reveals
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <main className={styles.main}>
      <div className="container">

        <div className={styles.hero} ref={addToRefs}>
          <div className={styles.heroLeft}>
            <span className={styles.label}>The Designer & Developer</span>
            <h1 className={styles.title}>Blending<br />Design with<br />Engineering</h1>
            <p className={styles.subtitle}>
              Based in India, I bridge the gap between creative vision and technical execution, building digital products that feel as good as they look.
            </p>
            <a href="#" className={styles.downloadBtn}>
              <ArrowDown size={18} /> Scroll to explore
            </a>
          </div>
          <div className={styles.portraitWrap} ref={portraitRef} style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px' }}>
            <Image
              src="/founder.jpg"
              alt="Paras Mottan"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 960px) 100%, 50vw"
            />
          </div>
        </div>

        <section className={styles.philosophy} ref={addToRefs}>
          <div>
            <span className={styles.label}>My Philosophy</span>
          </div>
          <div>
            <p className={styles.philosophyText}>
              I believe that great digital products are born at the intersection of logic and emotion. As a Full-Stack Designer, I don't just hand off designs—I build them. This holistic approach eliminates the friction between "what it looks like" and "how it works," resulting in faster, more cohesive, and pixel-perfect experiences.
            </p>
          </div>
        </section>

        <section className={styles.journey}>
          <div ref={addToRefs}>
            <h2 className={styles.title} style={{ fontSize: '3rem', marginBottom: '16px' }}>Journey</h2>
            <p className={styles.subtitle} style={{ fontSize: '0.95rem' }}>
              A timeline of my journey as a web designer and developer, building high-end digital experiences and helping brands establish a strong presence online.
            </p>
            <a href="#" style={{ fontSize: '0.85rem', fontWeight: 500, textDecoration: 'underline' }}>Download Resume</a>
          </div>

          <div className={styles.timeline}>
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className={styles.timelineItem}
                ref={el => { timelineRefs.current[i] = el; }}
              >
                <span className={styles.timelineYear}>{item.year}</span>
                <h3 className={styles.timelineRole}>{item.role}</h3>
                <p className={styles.timelineCompany}>{item.company}</p>
                <p className={styles.timelineDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.tools} ref={addToRefs}>
          <span className={styles.label}>The Stack</span>
          <h2 className={styles.toolsTitle}>Built with the Best</h2>
          <div className={styles.toolsGrid}>
            {[
              { name: "Figma", icon: <svg width="48" height="48" viewBox="0 0 38 57" fill="none"><path d="M19 28.5A9.5 9.5 0 1 1 38 28.5A9.5 9.5 0 1 1 19 28.5z" fill="#1ABCFE" /><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19V57C13.75 57 9.5 52.75 9.5 47.5z" fill="#0ACF83" /><path d="M19 0H9.5A9.5 9.5 0 0 0 0 9.5A9.5 9.5 0 0 0 9.5 19H19V0z" fill="#F24E1E" /><path d="M19 19H9.5A9.5 9.5 0 0 0 0 28.5A9.5 9.5 0 0 0 9.5 38H19V19z" fill="#A259FF" /><path d="M38 9.5A9.5 9.5 0 0 1 28.5 19H19V0H28.5A9.5 9.5 0 0 1 38 9.5z" fill="#F86D24" /></svg> },
              { name: "Webflow", icon: <svg width="48" height="48" viewBox="0 0 32 32" fill="none"><path d="M22.8 10L19.5 22L16 12L12.5 22L9.2 10H5L10.5 26.5H14.5L16 20.5L17.5 26.5H21.5L27 10H22.8Z" fill="#4353FF" /></svg> },
              { name: "Framer", icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M4 12V4H20V12H12L4 20V12Z" fill="#00AAF5" /><path d="M20 12V20H12L20 12Z" fill="#0075FF" /></svg> },
              { name: "React", icon: <svg width="48" height="48" viewBox="-11.5 -10.2 23 20.4" fill="none"><circle cx="0" cy="0" r="2.05" fill="#61DAFB" /><g stroke="#61DAFB" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2" /><ellipse rx="11" ry="4.2" transform="rotate(60)" /><ellipse rx="11" ry="4.2" transform="rotate(120)" /></g></svg> },
              { name: "Next.js", icon: <svg width="48" height="48" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="white" /><path d="M23 24.5L12 9.5H9.5V23H11.5V12.5L21.5 26.5L23 24.5ZM21.5 9.5H19.5V17.5H21.5V9.5Z" fill="black" /></svg> },
              { name: "GSAP", icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#88CE02" /><path d="M16 12H12V16H16C17.1 16 18 15.1 18 14V10L16 12Z" fill="white" /></svg> },
              { name: "Three.js", icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 20H22L12 2Z" stroke="black" strokeWidth="2" /><circle cx="12" cy="12" r="2" fill="black" /></svg> },
              { name: "Tailwind CSS", icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12.001 5.418c-3.593-.058-6.147 1.34-7.663 4.194 1.258-1.574 2.879-2.112 4.863-1.614 1.32.33 2.261 1.284 3.3 2.342 1.63 1.66 3.498 3.565 7.498 3.565 3.592.058 6.146-1.34 7.662-4.194-1.258 1.575-2.88 2.113-4.863 1.615-1.32-.33-2.262-1.283-3.3-2.341-1.631-1.66-3.498-3.566-7.497-3.567z" fill="#06B6D4" /></svg> },
              { name: "Node.js", icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#339933" /></svg> },
              { name: "JavaScript", icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="#F7DF1E"><rect width="24" height="24" rx="2" /><path d="M16 18.5C15 19.5 13.5 20 12 20C10 20 8.5 19.3 7.8 18L9.5 16.8C10 17.5 10.8 18 11.8 18C12.8 18 13.5 17.5 13.5 16.8C13.5 15.5 10 15.5 10 13.5C10 11.5 11.5 10.5 13.5 10.5C15 10.5 16.2 11 17 12L15.3 13.2C14.8 12.5 14 12.2 13.2 12.2C12.5 12.2 12 12.5 12 13C12 14.5 15.5 14.2 15.5 16.5C15.5 17.8 16.8 18.5 16 18.5ZM7.5 19.5H5.5V11H7.5V19.5Z" fill="black" /></svg> }
            ].map((tool, i) => (
              <div key={i} className={styles.toolIcon}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {tool.icon}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
