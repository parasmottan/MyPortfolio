"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // 1. Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      // @ts-ignore
      smoothTouch: true,
    } as any);

    // 3. Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 4. Use GSAP ticker instead of requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);

    // 5. Disable GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // 6. Reset scroll to top on mount to ensure triggers align
    window.scrollTo(0, 0);

    // 7. Refresh ScrollTrigger after components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return <>{children}</>;
}
