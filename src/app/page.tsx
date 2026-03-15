"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Smartphone, Activity, Zap,
  Layers, FileCode, MessageSquare,
  Terminal, ShieldCheck, Send,
  Plus, X
} from "lucide-react";
import styles from "./page.module.css";
import { SplitChars } from "@/lib/utils";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Founder from "@/components/Founder";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

// Helper removed (now in lib/utils.tsx)

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLDivElement>(null);
  const word3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const showcaseRef = useRef<HTMLDivElement>(null);
  const floatingLabelRef = useRef<HTMLDivElement>(null);
  const circleBtnRef = useRef<HTMLButtonElement>(null);
  const portfolioGridRef = useRef<HTMLElement>(null);
  const leftScreenRef = useRef<HTMLDivElement>(null);
  const rightScreenRef = useRef<HTMLDivElement>(null);

  // Services refs
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesLeftPillsRef = useRef<HTMLDivElement>(null);
  const servicesRightPillsRef = useRef<HTMLDivElement>(null);
  const servicesCenterRef = useRef<HTMLDivElement>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement>(null);

  // Case Studies refs
  const caseStudiesSectionRef = useRef<HTMLElement>(null);
  const caseStudiesCardsRef = useRef<HTMLDivElement>(null);

  // Process refs
  const processSectionRef = useRef<HTMLElement>(null);
  const processCardsRef = useRef<HTMLDivElement>(null);

  // Founder refs
  const fndrSectionRef = useRef<HTMLElement>(null);
  const fndrLeftRef = useRef<HTMLDivElement>(null);
  const fndrRightRef = useRef<HTMLDivElement>(null);

  // Pricing state
  const [pricingMode, setPricingMode] = useState<"development" | "website">("development");
  const [isFading, setIsFading] = useState(false);

  // Feature Grid refs
  const featureGridRef = useRef<HTMLDivElement>(null);
  const fgItemsRef = useRef<HTMLDivElement>(null);

  // FAQ state
  // Hydration state
  const [mounted, setMounted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const faqSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const faqData = [
    {
      q: "What\u2019s the difference between hourly work and project pricing?",
      a: "Hourly work is best for flexible development tasks, improvements, or ongoing support. Project pricing is used for clearly defined builds like full websites or applications where the scope and deliverables are fixed."
    },
    {
      q: "What types of development projects do you handle?",
      a: "I build modern, fast web experiences including landing pages, full websites, web applications, dashboards, and custom tools using technologies like React, Next.js, and modern backend stacks."
    },
    {
      q: "How many revisions can I request?",
      a: "You can request revisions until the feature or section works exactly as expected. My goal is to deliver a result that fully matches your requirements, not limit iterations."
    },
    {
      q: "Do you offer both design and development?",
      a: "Yes. I focus mainly on development, but I also build UI that follows modern design systems and strong UX principles. If a project requires deeper branding or visual design, I can integrate with existing design assets or collaborate with designers."
    },
    {
      q: "How fast is the typical turnaround?",
      a: "Most small improvements or feature requests are delivered within 24\u201372 hours depending on complexity. Larger builds like full websites or apps follow a structured timeline agreed at the start of the project."
    },
    {
      q: "Can you improve or optimize an existing website?",
      a: "Absolutely. I often work on existing codebases to improve performance, fix issues, optimize user experience, or modernize the frontend architecture."
    },
    {
      q: "Do you provide ongoing support after the project?",
      a: "Yes. Many clients continue working with me after launch for maintenance, improvements, new features, and performance optimization."
    }
  ];

  const handleFaqToggle = (index: number) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  };


  const handleToggleClick = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setPricingMode(prev => prev === "development" ? "website" : "development");
      setIsFading(false);
    }, 200);
  };

  useEffect(() => {
    if (!mounted) return;
    const clone = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      Array.from(ref.current.children as HTMLCollectionOf<HTMLElement>).forEach((child) => {
        const c = child.cloneNode(true) as HTMLElement;
        c.setAttribute("aria-hidden", "true");
        ref.current!.appendChild(c);
      });
    };
    clone(leftScreenRef);
    clone(rightScreenRef);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline();
    tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .fromTo(
        [word1Ref.current, word2Ref.current, word3Ref.current].map(el => el?.parentElement?.children[0]).filter(Boolean),
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }, "-=0.2"
      )
      .fromTo([word2Ref.current, word3Ref.current].filter(Boolean),
        { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power3.out" }, "-=1.0"
      )
      .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .fromTo(ctaRef.current?.parentElement || null, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6");

    if (word2Ref.current && word3Ref.current) {
      gsap.to([word2Ref.current, word3Ref.current], {
        y: "-=8", duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1,
        stagger: { each: 1, from: "start" }
      });
    }
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!featureGridRef.current || !fgItemsRef.current) return;
    const items = gsap.utils.toArray(fgItemsRef.current.querySelectorAll(`.${styles.fgItemWrapper}`));
    gsap.to(items, {
      scrollTrigger: {
        trigger: featureGridRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!showcaseRef.current) return;
    
    const isMobile = window.innerWidth <= 768;
    const tl = gsap.timeline({ scrollTrigger: { trigger: showcaseRef.current, start: "top 88%", toggleActions: "play none none reverse" } });
    
    if (!isMobile) {
      tl.fromTo(showcaseRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
        .fromTo(floatingLabelRef.current, { opacity: 0, rotation: -18 }, { opacity: 1, rotation: -12, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .fromTo(circleBtnRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    } else {
      tl.fromTo(floatingLabelRef.current, { opacity: 0, rotation: -18 }, { opacity: 1, rotation: -12, duration: 0.8, ease: "power2.out" })
        .fromTo(circleBtnRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    }
    
    gsap.to(floatingLabelRef.current, { y: "-=8", duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!servicesSectionRef.current) return;

    const leftPills = Array.from(servicesLeftPillsRef.current?.children || []) as HTMLElement[];
    const rightPills = Array.from(servicesRightPillsRef.current?.children || []) as HTMLElement[];

    // Initial states: pills off-screen, center hidden
    gsap.set(leftPills, { x: "-110vw", opacity: 0 });
    gsap.set(rightPills, { x: "110vw", opacity: 0 });
    gsap.set(servicesCenterRef.current, { opacity: 0, y: 16 });

    // Entry trigger (once)
    ScrollTrigger.create({
      trigger: servicesSectionRef.current,
      start: "top 72%",
      once: true,
      onEnter: () => {
        const isMobile = window.innerWidth <= 768;
        
        // Center fades in (always)
        gsap.to(servicesCenterRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });

        if (!isMobile) {
          // Left pills stagger from left
          gsap.to(leftPills, {
            x: 0, opacity: 1,
            duration: 0.8, ease: "power3.out", stagger: 0.25,
          });

          // Right pills stagger from right
          gsap.to(rightPills, {
            x: 0, opacity: 1,
            duration: 0.8, ease: "power3.out", stagger: 0.25,
            onComplete: () => startFloating([...leftPills, ...rightPills]),
          });
        } else {
          // On mobile, just instantly reveal them without x translation
          gsap.set([...leftPills, ...rightPills], { x: 0, opacity: 1 });
        }
      },
    });

    // ── Per-character scroll color animation with scrub ──────────────
    if (servicesHeadingRef.current) {
      const allChars = Array.from(
        servicesHeadingRef.current.querySelectorAll("[data-char]")
      ) as HTMLElement[];

      gsap.set(allChars, { color: "#bdbdbd" });

      // Scrub: animates forward on scroll-down, reverses on scroll-up
      gsap.to(allChars, {
        color: "#000000",

        stagger: 0.035,
        // duration is effectively controlled by scrub, but set for easing reference
        ease: "power2.out",
        scrollTrigger: {
          trigger: servicesSectionRef.current,
          start: "top 68%",
          end: "center 25%",
          scrub: 1.2,
        },
      });
    }
  }, [mounted]);

  // Floating animation helper
  function startFloating(pills: HTMLElement[]) {
    pills.forEach((pill, i) => {
      gsap.to(pill, {
        y: -6,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.45,
      });
    });
  }

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!processSectionRef.current) return;
    const cards = Array.from(processCardsRef.current?.children || []) as HTMLElement[];
    const staggerDelays = [0, 0.1, 0.2, 0.3];

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 60 });

    ScrollTrigger.create({
      trigger: processSectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: staggerDelays[i] ?? i * 0.1,
            ease: "power3.out",
          });

          // Scale the number from 0.9 → 1
          const num = card.querySelector('[class*="processCardNum"]') as HTMLElement | null;
          if (num) {
            gsap.fromTo(num,
              { scale: 0.9 },
              { scale: 1, duration: 0.5, delay: staggerDelays[i] ?? i * 0.1, ease: "power2.out" }
            );
          }
        });
      }
    });
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!caseStudiesSectionRef.current) return;
    const cards = Array.from(caseStudiesCardsRef.current?.children || []) as HTMLElement[];

    gsap.set(cards, { opacity: 0, y: 60 });

    ScrollTrigger.create({
      trigger: caseStudiesSectionRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power3.out",
          });
        });
      }
    });
  }, [mounted]);


  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!fndrSectionRef.current || !fndrLeftRef.current || !fndrRightRef.current) return;

    gsap.fromTo(fndrLeftRef.current,
      { opacity: 0, x: -80 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: fndrSectionRef.current,
          start: "top 75%",
          once: true
        }
      }
    );

    gsap.fromTo(fndrRightRef.current,
      { opacity: 0, x: 80 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: fndrSectionRef.current,
          start: "top 75%",
          once: true
        }
      }
    );
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    gsap.registerPlugin(ScrollTrigger);

    // All h2, h3, p, blockquote — skip anything inside the hero section
    const heroEl = document.querySelector(`.${styles.hero}`);
    const allText = gsap.utils.toArray<HTMLElement>("h2, h3, p, blockquote").filter(
      (el) => !heroEl?.contains(el)
    );

    // Group elements by their nearest SECTION ancestor so siblings share a stagger
    const grouped = new Map<Element, HTMLElement[]>();
    allText.forEach((el) => {
      let p: Element | null = el.parentElement;
      while (p && !["SECTION", "ARTICLE", "MAIN"].includes(p.tagName)) p = p.parentElement;
      const key = p ?? document.body;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(el);
    });

    // Initial state: blurred + invisible + slightly below
    gsap.set(allText, { opacity: 0, filter: "blur(10px)", y: 40 });

    // Track created triggers so cleanup is scoped to this effect only
    const triggers: ScrollTrigger[] = [];

    allText.forEach((el) => {
      const parent = (() => {
        let p: Element | null = el.parentElement;
        while (p && !["SECTION", "ARTICLE", "MAIN"].includes(p.tagName)) p = p.parentElement;
        return p ?? document.body;
      })();

      const siblings = grouped.get(parent) ?? [];
      const idx = siblings.indexOf(el);
      // Cap the stagger so the 5th+ element doesn't wait too long
      const staggerDelay = Math.min(idx * 0.12, 0.45);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 0.9,
            delay: staggerDelay,
            ease: "power3.out",
          });
        },
      });
      triggers.push(st);
    });

    // Only kill triggers created by THIS effect on cleanup
    return () => triggers.forEach((t) => t.kill());
  }, [mounted]);
  if (!mounted) {
    return (
      <main className={styles.main}>
        <div style={{ minHeight: '100vh', background: '#fff' }} />
      </main>
    );
  }

  return (
    <main className={styles.main}>

      <Hero 
        styles={styles}
        heroRef={heroRef}
        word1Ref={word1Ref}
        word2Ref={word2Ref}
        word3Ref={word3Ref}
        subtitleRef={subtitleRef}
        ctaRef={ctaRef}
      />

      {/* ── SHOWCASE — Cinematic Infinite Scroll ──────────────── */}
      <Showcase 
        styles={styles}
        portfolioGridRef={portfolioGridRef}
        showcaseRef={showcaseRef}
        floatingLabelRef={floatingLabelRef}
        circleBtnRef={circleBtnRef}
      />

      <Services 
        styles={styles}
        servicesSectionRef={servicesSectionRef}
        servicesLeftPillsRef={servicesLeftPillsRef}
        servicesRightPillsRef={servicesRightPillsRef}
        servicesCenterRef={servicesCenterRef}
        servicesHeadingRef={servicesHeadingRef}
      />

      <Process 
        styles={styles}
        processSectionRef={processSectionRef}
        processCardsRef={processCardsRef}
      />

      <CaseStudies 
        styles={styles}
        caseStudiesSectionRef={caseStudiesSectionRef}
        caseStudiesCardsRef={caseStudiesCardsRef}
      />

      <Founder 
        styles={styles}
        fndrSectionRef={fndrSectionRef}
        fndrLeftRef={fndrLeftRef}
        fndrRightRef={fndrRightRef}
      />

      <Pricing 
        styles={styles}
        pricingMode={pricingMode}
        handleToggleClick={handleToggleClick}
        isFading={isFading}
        featureGridRef={featureGridRef}
        fgItemsRef={fgItemsRef}
      />

      <FAQ 
        styles={styles}
        faqSectionRef={faqSectionRef}
        faqData={faqData}
        openFaqIndex={openFaqIndex}
        handleFaqToggle={handleFaqToggle}
      />

    </main>
  );
}
