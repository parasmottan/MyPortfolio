"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail } from "lucide-react";
import styles from "./page.module.css";

const POSTS = [
  { id: 1, title: "How a Well-Designed Website Turns Visitors Into Customers", desc: "Great design isn't just about aesthetics. It's about guiding your visitors toward a decision. Here's what separates a website that converts from one that just exists.", date: "MAR 10, 2026", cat: "CONVERSION", image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80", slug: "how-a-well-designed-website-turns-visitors-into-customers" },
  { id: 2, title: "The Psychology Behind High-Converting Website Design", desc: "Why do some websites feel instantly trustworthy while others make you click away? The answer lies in the subtle science of human psychology applied to design.", date: "FEB 25, 2026", cat: "UI/UX DESIGN", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80", slug: "the-psychology-behind-high-converting-website-design" },
  { id: 3, title: "Why Speed and Performance Matter More Than Ever", desc: "A one-second delay in page load time can reduce conversions by 7%. In 2026, website performance isn't a technical luxury—it's a business imperative.", date: "FEB 10, 2026", cat: "PERFORMANCE", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80", slug: "why-speed-and-performance-matter-more-than-ever" },
  { id: 4, title: "The Role of UI/UX in Building Trust With Online Customers", desc: "Trust is the currency of the internet. Before a customer buys, they evaluate. What they see, feel, and experience on your website is the deciding factor.", date: "JAN 28, 2026", cat: "UI/UX DESIGN", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", slug: "the-role-of-ui-ux-in-building-trust-with-online-customers" },
  { id: 5, title: "How Small Businesses Can Grow Faster With a Professional Website", desc: "A professional website isn't a luxury for big companies. It's the most powerful tool a small business has to compete, grow, and earn trust in today's market.", date: "JAN 15, 2026", cat: "BUSINESS", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", slug: "how-small-businesses-can-grow-faster-with-a-professional-website" },
  { id: 6, title: "The Hidden Cost of an Outdated Website", desc: "If your website was last updated two or three years ago, it may be costing you more than you realize—in traffic, sales, and reputation.", date: "DEC 20, 2025", cat: "STRATEGY", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", slug: "the-hidden-cost-of-an-outdated-website" },
  { id: 7, title: "Website Design Trends Defining Modern Digital Experiences", desc: "From bold typography to immersive micro-interactions, here are the design movements shaping the most successful websites in 2026 and beyond.", date: "DEC 5, 2025", cat: "DESIGN TRENDS", image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&q=80", slug: "website-design-trends-defining-modern-digital-experiences" },
];

export default function Blog() {
  const featuredRef = useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = useState(false);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (featuredRef.current) {
      gsap.to(featuredRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      });
    }

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.to(
        card,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && (t.vars.trigger === featuredRef.current || cardsRef.current.includes(t.vars.trigger as HTMLAnchorElement))) {
          t.kill();
        }
      });
    };
  }, [mounted]);

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#fff' }} />;

  return (
    <main className={styles.main}>
      <div className="container">

        <div className={styles.header}>
          <div className={styles.tagline}>
            <span className={styles.dot}></span> WRITING & THOUGHTS
          </div>
          <h1 className={styles.title}>
            Insights <span>&</span><br />Perspectives
          </h1>
          <p className={styles.subtitle}>
            Thoughts on design, development, and building digital products that stand the test of time. Exploring the intersection of aesthetics and functionality.
          </p>
        </div>

        <Link href="/blog/how-a-well-designed-website-turns-visitors-into-customers" className={styles.featuredPost} ref={featuredRef}>
          <div className={styles.featuredBg}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#2f4f4f' }}></div>
          </div>
          <div className={styles.featuredOverlay}></div>
          <div className={styles.featuredContent}>
            <div className={styles.postMeta}>
              <span>Design Strategy</span>
              <span>•</span>
              <span>Oct 24, 2023</span>
              <span>•</span>
              <span>8 min read</span>
            </div>
            <h2 className={styles.featuredTitle}>Why Visual Hierarchy Matters More Than You Think</h2>
            <p className={styles.featuredDesc}>
              Breaking down the psychological principles behind effective UI design and how controlling the user's eye can lead to significantly better conversion rates.
            </p>
          </div>
        </Link>

        <div className={styles.grid}>
          {POSTS.map((post, i) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className={styles.postCard}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
            >
              <div className={styles.imageWrap}>
                {post.image ? (
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100%, 50vw" />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e2e2' }}></div>
                )}
              </div>
              <div className={styles.postCardMeta}>
                <span>{post.cat}</span>
                <span>{post.date}</span>
              </div>
              <div>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postDesc}>{post.desc}</p>
                <div className={styles.readArticle}>Read article <ArrowRight size={16} /></div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.newsletter}>
          <div className={styles.newsIcon}><Mail size={32} color="var(--text-secondary)" /></div>
          <h2 className={styles.newsTitle}>Stay in the loop</h2>
          <p className={styles.newsDesc}>Join 2,000+ designers and developers. Get the latest insights on design, tech, and business delivered to your inbox once a month. No spam.</p>
          <form className={styles.newsForm} onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="email@address.com" className={styles.newsInput} required />
            <button type="submit" className={styles.newsBtn}>Subscribe</button>
          </form>
        </div>

      </div>
    </main>
  );
}
