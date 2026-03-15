import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights and perspectives on design, development, and building digital products.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
