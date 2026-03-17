import type { Metadata } from "next";
import { PROJECTS } from "@/lib/work-data";

const BASE_URL = "https://parasmottanportfolio.online";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.title} — ${project.desc}`;
  const description = `${project.title}: ${project.desc}. A ${project.cat} project by Paras Mottan.`;
  const url = `${BASE_URL}/work/${slug}`;

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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function WorkSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
