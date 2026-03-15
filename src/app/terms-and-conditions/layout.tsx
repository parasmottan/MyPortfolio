import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions governing your use of our website and services.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
