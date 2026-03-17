"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail } from "lucide-react";
import styles from "./page.module.css";
import { POSTS } from "@/lib/blog-data";

// POSTS imported from @/lib/blog-data — shared with sitemap.ts

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
