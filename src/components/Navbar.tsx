"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    handleScroll(); // run once on mount to set correct initial state

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${isLanding ? styles.isLanding : ""}`}>
        <div className={`container ${styles.navContainer}`}>

          <div className={styles.navLeft}>
            <Link href="/" className={styles.logoGroup}>
              <div className={styles.logoIcon}>
                <Image src="/icon.svg" alt="Paras Mottan Logo" width={22} height={22} priority />
              </div>
              <span className={styles.logoText}>Paras Mottan</span>
            </Link>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <div className={styles.hamburgerLines}>
                <span className={styles.line}></span>
                <span className={styles.line}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        <nav className={styles.mobileNavLinks}>
          <Link href="/work" onClick={() => setMenuOpen(false)}>Work</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>
      </div>
    </>
  );
}
