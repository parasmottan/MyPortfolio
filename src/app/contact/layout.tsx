import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Ready to transform your digital presence? Book a discovery call or drop me a line directly.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
