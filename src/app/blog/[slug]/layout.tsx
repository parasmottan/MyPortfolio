import type { Metadata } from "next";
import { BLOG_CONTENT } from "@/lib/blog-data";

const BASE_URL = "https://parasmottanportfolio.online";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_CONTENT[slug];

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.title;
  const description = post.desc || `Read "${post.title}" by Paras Mottan.`;
  const url = `${BASE_URL}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: post.image ? [{ url: post.image, width: 800, height: 600, alt: title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
