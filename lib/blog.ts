// Blog types shared between client and server

export interface BlogSection {
  heading?: string;
  body: string; // plain text; newlines separate paragraphs
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  content: BlogSection[];
  read_time: string | null;
  featured: boolean;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
