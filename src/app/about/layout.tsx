import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Full-stack designer and developer bridging the gap between creative vision and technical execution.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
