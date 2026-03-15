import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A curated archive of projects that define our approach to digital craftsmanship.",
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
