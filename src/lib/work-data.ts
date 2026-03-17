export type Project = {
  id: number;
  title: string;
  desc: string;
  year: string;
  cat: string;
  bg: string;
  image: string;
  slug: string;
};

/** Single source of truth for work/projects (used in listing + sitemap) */
export const PROJECTS: Project[] = [
  { id: 1, title: "Veloura", desc: "Premium Streaming Experience", year: "2023", cat: "Web Design", bg: "#111111", image: "/project-veloura.png", slug: "veloura" },
  { id: 2, title: "Seeker to Helper", desc: "Two-Sided Support Platform", year: "2023", cat: "MVP", bg: "#f7f7f7", image: "/project-seeker-helper.png", slug: "seeker-to-helper" },
  { id: 3, title: "Splitly", desc: "Smart Expense Splitting App", year: "2024", cat: "MVP", bg: "#2d1b69", image: "/project-splitly.png", slug: "splitly" },
  { id: 4, title: "P&S", desc: "Premium Beds for Modern Homes", year: "2022", cat: "Web Design", bg: "#2a1c13", image: "/project-pns.png", slug: "p&s" },
  { id: 5, title: "Memoire", desc: "Memory Preservation Platform", year: "2021", cat: "MVP", bg: "#161616", image: "/project-memoire.png", slug: "memorie" },
];
