"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./page.module.css";
import { BLOG_CONTENT, type Section } from "@/lib/blog-data";

// BLOG_CONTENT imported from @/lib/blog-data — shared with sitemap.ts

export default function SingleBlog() {
  const params = useParams();
  const slug = params.slug as string;

  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const post = BLOG_CONTENT[slug];
  const title = post?.title || (slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Article');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollLen = Math.ceil(scrollPx / winHeightPx * 100);
      setProgress(scrollLen);
    };

    window.addEventListener('scroll', handleScroll);

    sectionsRef.current.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger && sectionsRef.current.includes(t.vars.trigger as HTMLElement)) {
          t.kill();
        }
      });
    };
  }, [mounted]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  if (!mounted) return <div style={{ minHeight: '100vh', background: '#fff' }} />;

  return (
    <main className={styles.main}>
      <div
        className={styles.progressBar}
        style={{ transform: `scaleX(${progress / 100})` }}
      ></div>

      <div className="container">
        <div className={styles.header}>
          <div className={styles.meta}>
            <span>{post?.category || 'Design Strategy'}</span>
            <span>•</span>
            <span>{post?.date || 'Mar 2026'}</span>
            <span>•</span>
            <span>{post?.readTime || '7 min read'}</span>
          </div>

          <h1 className={styles.title}>{title}</h1>

          <div className={styles.author}>
            <img src="/founder.jpg" alt="Paras Mottan - Design Engineer" className={styles.avatar} style={{ objectFit: 'cover', borderRadius: '50%' }} />
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>Paras Mottan</span>
              <span className={styles.authorRole}>Design Engineer</span>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {post ? (
            (post.sections ?? []).map((section, i) => (
              <section key={i} ref={addToRefs}>
                {section.heading && <h2>{section.heading}</h2>}
                {section.content && <p>{section.content}</p>}
                {section.quote && <blockquote>{section.quote}</blockquote>}
                {section.image && (
                  <>
                    <div className={styles.featuredImage}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={section.image.src}
                        alt={section.image.alt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
                        loading="lazy"
                      />
                    </div>
                    {section.image.caption && (
                      <p className={styles.imageCaption}>{section.image.caption}</p>
                    )}
                  </>
                )}
              </section>
            ))
          ) : (
            <>
              <section ref={addToRefs}>
                <p>The digital storefront is unforgiving. Unlike a physical shop where a smile can salvage a long wait, the web offers no second chances.</p>
              </section>
              <section ref={addToRefs}>
                <h2>Why Modern Website Design Matters</h2>
                <p>In today's competitive landscape, a professional web presence is no longer optional. Businesses that invest in modern website design consistently outperform those that treat their online presence as an afterthought.</p>
              </section>
              <section ref={addToRefs}>
                <blockquote>"Your website isn't just a container for content. It's the first handshake you offer a potential client."</blockquote>
              </section>
            </>
          )}

          <section ref={addToRefs}>
            <div className={styles.articleFooter}>
              <div>
                <span className={styles.authorName}>Written by Paras Mottan</span>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Full-Stack Designer &amp; Developer helping brands build digital products that convert. Exploring the overlap between engineering and human-centric design.</p>
                <div className={styles.shareLinks}>
                  <a href={process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "https://x.com/paras_motttan"} target="_blank" rel="noopener noreferrer">Twitter</a>
                  <a href={process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "https://www.linkedin.com/in/paras-mottan-935070293?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <Link href="/blog">More posts</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
