"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";

const PROJECT_DATA: Record<string, any> = {
  "memorie": {
    name: "Memorie",
    tagline: "A digital scrapbook for preserving your most meaningful life moments.",
    year: "2021",
    type: "Web App / MVP",
    role: "Full Stack Developer",
    timeline: "12 Weeks",
    overview: "Memorie is a memory-sharing web application where users can store and revisit meaningful life moments. Users can upload photos, voice notes, and personal memories into a digital memory board. The platform creates a nostalgic experience similar to a digital scrapbook.",
    problem: "People take thousands of photos but rarely curate them alongside the emotional stories behind them.",
    features: [
      "Image memory uploads",
      "Audio memories with custom audio player",
      "Masonry memory board layout",
      "OTP-based user authentication",
      "Dedicated memory detail pages",
      "Snap streak concept for tracking memory activity"
    ],
    tech: ["React", "Node.js", "MongoDB", "Cloudinary", "Express"],
    highlights: "The project focuses intensely on emotional storytelling and personal, secure memory preservation.",
    challenges: [
      { title: "Managing Media Uploads", desc: "Handling simultaneous large image and audio file streams efficiently." },
      { title: "Emotional UX", desc: "Designing an interface that feels intimate and personal rather than corporate." }
    ],
    outcome: "Created a private, secure emotional vault that emphasizes nostalgia over social validation.",
    images: ["/memoire-1.png", "/memoire-2.png", "/memoire-3.png"],
    liveLink: "https://memoriekeeper.vercel.app",
    nextProject: { title: "Veloura", slug: "veloura" }
  },
  "veloura": {
    name: "Veloura",
    tagline: "Real-time synchronized watch-together streaming platform.",
    year: "2023",
    type: "Web App",
    role: "Full Stack Developer",
    timeline: "10 Weeks",
    overview: "Veloura is a real-time watch-together streaming platform designed for friends or couples who want to enjoy content simultaneously. The platform allows users to create shared rooms where multiple participants can watch the same video stream together.",
    problem: "Long-distance friends and couples lack a seamless, perfectly synchronized way to watch content together without counting down to press play.",
    features: [
      "Create room functionality",
      "Join room with unique room code",
      "Synchronized playback",
      "Real-time shared viewing experience"
    ],
    tech: ["React", "WebRTC", "Node.js", "Socket.io"],
    highlights: "The explicit goal of the project was to flawlessly recreate the intimate experience of watching movies together remotely.",
    challenges: [
      { title: "Synchronizing Real-Time Streaming", desc: "Ensuring video playback, pausing, and scrubbing remain perfectly synced across varied internet latency profiles using WebSockets." }
    ],
    outcome: "Achieved sub-100ms sync accuracy rendering the distance between viewers effectively invisible.",
    images: ["/project-veloura.png", "/veloura-1.png", "/veloura-2.png"],
    liveLink: "https://eclipsera-frontend.vercel.app/",
    nextProject: { title: "Splitly", slug: "splitly" }
  },
  "splitly": {
    name: "Splitly",
    tagline: "Smart expense splitting for groups — no awkward money talks.",
    year: "2024",
    type: "Web App",
    role: "Full Stack Developer & UI/UX",
    timeline: "10 Weeks",
    overview: "Splitly is a modern web application designed to simplify shared expenses between friends, roommates, or groups. The app allows users to create groups, add expenses, automatically split costs, and track who owes whom in real time. The goal is to make group expense management simple, transparent, and intuitive.",
    problem: "Managing shared expenses during trips, shared apartments, or events is often confusing and leads to manual calculations, missed payments, and awkward conversations between friends.",
    features: [
      "Group creation for trips, roommates, events, or shared budgets",
      "Add expenses and assign who paid and who participated",
      "Automatic expense splitting with equal or percentage-based distribution",
      "Real-time balance calculation showing who owes whom",
      "Debt simplification to minimize the number of payments required",
      "Settlement system to mark expenses as paid",
      "Clean dashboard with group expenses, balances, and activity",
      "Fairness Score system to track equity over time"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB"],
    highlights: "Splitly eliminates the mental overhead of group finance with automated splitting logic and a clean, minimal interface designed for Gen-Z users.",
    challenges: [
      { title: "Debt Simplification Algorithm", desc: "Implementing an algorithm that minimizes the total number of transactions needed to settle all balances within a group — reducing O(n²) payments to near O(n)." },
      { title: "Real-Time Balance Sync", desc: "Ensuring that balance updates reflect instantly across all group members when expenses are added or settled." },
      { title: "Intuitive Split UX", desc: "Designing a split interface that feels simple for everyday use while supporting complex scenarios like percentage splits, custom amounts, and exclusions." }
    ],
    outcome: "Created a frictionless group expense platform that replaces spreadsheets and manual IOU tracking with automated, fair, and transparent financial splitting.",
    images: ["/project-splitly.png", "/splitly-1.png", "/splitly-2.png", "/splitly-3.png", "/splitly-4.png", "/splitly-5.png", "/splitly-6.png", "/splitly-7.png"],
    liveLink: "https://splitly-phi.vercel.app/",
    nextProject: { title: "P&S Premium Beds", slug: "p&s" }
  },
  "p&s": {
    name: "P&S Furniture",
    tagline: "A scalable B2B e-commerce platform for high-quality wholesale furniture.",
    year: "2023",
    type: "B2B E-commerce",
    role: "Full Stack Developer",
    timeline: "8 Weeks",
    overview: "P&S is a dedicated wholesale e-commerce platform designed for a furniture distributor to streamline bulk ordering. The platform provides retailers and interior designers with a seamless interface to browse vast catalogs, place large-scale orders, and manage shipments efficiently.",
    problem: "The client was manually processing wholesale orders via phone and spreadsheets, leading to inventory discrepancies, slow fulfillment, and a disjointed experience for their B2B buyers.",
    features: [
      "Custom B2B bulk order cart system",
      "Real-time inventory synchronization",
      "Tiered wholesale pricing based on account status",
      "Streamlined checkout for large freight shipping",
      "Retailer dashboard for invoice and order tracking"
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe Connect"],
    highlights: "The project modernized a legacy wholesale operation, creating a scalable digital storefront that handles complex freight logistics and bulk pricing natively.",
    challenges: [
      { title: "Complex Inventory Sync", desc: "Synchronizing hundreds of product variants and stock levels with existing warehouse software in real-time." },
      { title: "Dynamic B2B Pricing", desc: "Implementing discount logic based on specific buyer tiers and bulk order quantities natively in the cart." }
    ],
    outcome: "Reduced manual order processing time by 80% and provided B2B customers with a self-serve portal that significantly increased bulk order volume.",
    images: ["/project-pns.png", "/project-pns.png", "/project-pns.png"],
    liveLink: "https://www.preetandsonz.shop/",
    nextProject: { title: "Seeker to Helper", slug: "seeker-to-helper" }
  },
  "seeker-to-helper": {
    name: "Seeker to Helper",
    tagline: "A two-sided web platform designed to connect individuals seeking support with those ready to provide help through a clean, role-based experience.",
    year: "2023",
    type: "Platform / Web App",
    role: "Full Stack Developer",
    timeline: "6 Weeks",
    overview: "Seeker to Helper is a role-based platform built to connect two kinds of users: Seekers — people looking for assistance, and Helpers — people willing to offer support. The product focuses on making that connection simple, trustworthy, and intuitive through a clean onboarding process and a structured user flow.",
    problem: "Many people need support, guidance, or practical help, but there is often no simple digital platform to connect them with individuals willing to assist. Existing experiences can feel cluttered, unclear, or overly complex.",
    features: [
      "Role-based onboarding for Seekers and Helpers",
      "Separate account flows for both user types",
      "Clean registration and login experience",
      "Seekers can post requests describing their problem",
      "Helpers can browse and respond to available requests",
      "Structured platform experience for connecting needs with support",
      "Modern UI focused on accessibility and clarity"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT Auth", "Role-based Routing"],
    highlights: "Seeker to Helper solves this by creating a clear two-sided platform where users can choose their role, create an account, and move through a structured experience designed to connect needs with support in a simple and approachable way.",
    challenges: [
      { title: "Role-Based Architecture", desc: "Structuring the database and API routes to securely enforce distinct capabilities and views between Seekers and Helpers." },
      { title: "Intuitive Dual UX", desc: "Designing a single interface that feels natural for both user types without creating confusion between roles." }
    ],
    outcome: "Successfully created a robust two-sided platform making it effortless for people to connect, collaborate, and exchange support through a clean, role-driven experience.",
    images: ["/seeker-1.png", "/seeker-2.png", "/seeker-3.png"],
    liveLink: "https://s2hfrontend.vercel.app/",
    nextProject: { title: "Memoire", slug: "memoire" }
  }
};

export default function CaseStudy() {
  const params = useParams();
  const slug = decodeURIComponent(params.slug as string);

  const [mounted, setMounted] = useState(false);
  const data = PROJECT_DATA[slug] || PROJECT_DATA["memorie"];

  const heroImgRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Parallax Hero
    if (heroImgRef.current) {
      gsap.to(heroImgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroImgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Section reveals
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && (t.vars.trigger === heroImgRef.current || sectionsRef.current.includes(t.vars.trigger as HTMLElement))) {
          t.kill();
        }
      });
    };
  }, [mounted, slug]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#fff' }} />;

  return (
    <main className={styles.main}>
      <div className="container">

        {/* 1. HERO SECTION */}
        <div className={styles.hero} ref={addToRefs}>
          <span className={styles.label}>{data.type} &bull; {data.year}</span>
          <h1 className={styles.title}>{data.name}</h1>
          <p className={styles.tagline} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '16px', maxWidth: '800px' }}>
            {data.tagline}
          </p>
        </div>

        <div className={styles.heroImageWrap}>
          <div ref={heroImgRef} style={{ width: '100%', height: '120%', position: 'absolute', top: '-10%' }}>
            <Image src={data.images[0]} alt={`${data.name} Hero`} fill style={{ objectFit: 'cover' }} priority />
          </div>
        </div>

        <div className={styles.metaGrid} ref={addToRefs}>
          <div className={styles.metaCol}>
            <span>Role</span>
            <p>{data.role}</p>
          </div>
          <div className={styles.metaCol}>
            <span>Timeline</span>
            <p>{data.timeline}</p>
          </div>
          <div className={styles.metaCol}>
            <span>Platform</span>
            <p>{data.type}</p>
          </div>
          <div className={styles.metaCol}>
            <span>Year</span>
            <p>{data.year}</p>
          </div>
        </div>

        {/* 2 & 3. PROJECT OVERVIEW & PROBLEM */}
        <section className={styles.section} ref={addToRefs}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Overview & Problem</span>
            <h2 className={styles.sectionTitle}>What is {data.name}?</h2>
          </div>
          <div className={styles.sectionContent}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '24px' }}>
              <strong>Overview:</strong> {data.overview}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              <strong>The Problem:</strong> {data.problem}
            </p>
          </div>
        </section>

        {/* 4 & 5. KEY FEATURES & TECH STACK */}
        <section className={styles.section} ref={addToRefs} style={{ borderTop: '1px solid var(--border-color)', paddingTop: '80px' }}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Features & Stack</span>
            <h2 className={styles.sectionTitle}>Under the Hood.</h2>
          </div>
          <div className={styles.sectionContent}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 500 }}>Key Features</h3>
            <ul style={{ marginBottom: '40px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', listStyleType: 'disc' }}>
              {data.features.map((feature: string, idx: number) => (
                <li key={idx} style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 500 }}>Technical Stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {data.tech.map((techItem: string, idx: number) => (
                <span key={idx} style={{ padding: '8px 16px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '40px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {techItem}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 9. PROJECT GALLERY */}
        <div className={styles.imageGrid} ref={addToRefs}>
          <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden' }}>
            <Image src={data.images[1]} alt={`${data.name} UI 1`} fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '16px', overflow: 'hidden' }}>
            <Image src={data.images[2]} alt={`${data.name} UI 2`} fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* 6, 7 & 8. HIGHLIGHTS, CHALLENGES & IMPACT */}
        <section className={styles.section} ref={addToRefs}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Execution</span>
            <h2 className={styles.sectionTitle}>Challenges & Impact</h2>
          </div>
          <div className={styles.sectionContent}>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '32px', color: 'var(--text-secondary)' }}>
              <em>&quot;{data.highlights}&quot;</em>
            </p>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 500 }}>Challenges & Solutions</h3>
            <ul style={{ marginBottom: '40px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {data.challenges.map((chal: { title: string, desc: string }, idx: number) => (
                <li key={idx}><strong>{chal.title}:</strong> <span style={{ color: 'var(--text-secondary)' }}>{chal.desc}</span></li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: 500 }}>Outcome</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{data.outcome}</p>
          </div>
        </section>

        {/* 10. CALL TO ACTION */}
        <div style={{ marginTop: '80px', marginBottom: '80px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href={data.liveLink || "#"} target={data.liveLink ? "_blank" : undefined} rel={data.liveLink ? "noopener noreferrer" : undefined} className={styles.ctaBtn} style={{ padding: '16px 32px', backgroundColor: '#000', color: '#fff', borderRadius: '40px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            View Live Project <ArrowRight size={18} />
          </a>
          <a href={data.sourceLink || process.env.NEXT_PUBLIC_SOCIAL_GITHUB || "https://github.com/parasmottan"} target="_blank" rel="noopener noreferrer" className={styles.ctaBtnOutline} style={{ padding: '16px 32px', border: '1px solid #e0e0e0', color: '#000', borderRadius: '40px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            View Source Code <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Next Project Footer Area */}
      <div style={{ backgroundColor: '#111', color: '#fff', padding: '120px 0', textAlign: 'center', marginTop: '80px', borderRadius: '24px 24px 0 0' }}>
        <div className="container">
          <span style={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Next Project</span>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontFamily: 'var(--font-serif)', margin: '24px 0 40px 0' }}>{data.nextProject.title}</h2>
          <Link href={`/work/${data.nextProject.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #fff', paddingBottom: '4px' }}>
            View Case Study <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
