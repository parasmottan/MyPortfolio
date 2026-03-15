import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://parasmottanportfolio.online"),
  title: {
    default: "Paras Mottan | Web Design, Development & Business Growth",
    template: "%s | Paras Mottan",
  },
  description:
    "Modern websites and digital experiences designed to help businesses grow. Explore the portfolio of Paras Mottan.",
  alternates: {
    canonical: "https://parasmottanportfolio.online",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Paras Mottan | Web Design, Development & Business Growth",
    description:
      "Modern websites and digital experiences designed to help businesses grow. Explore the portfolio of Paras Mottan.",
    url: "https://parasmottanportfolio.online",
    siteName: "Paras Mottan Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Paras Mottan Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paras Mottan | Web Design, Development & Business Growth",
    description:
      "Modern websites and digital experiences designed to help businesses grow. Explore the portfolio of Paras Mottan.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable} style={{ fontFamily: "var(--font-inter)" }}>
        <SmoothScroll>
          <div className="app-wrapper">
            <Navbar />
            {children}
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
