import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { BlogCategory, BlogPost } from "@/lib/supabase/types";

/** Returns published posts whose scheduled publish time has passed (or is null = immediate). */
export async function getAllPublishedPosts(category?: string): Promise<BlogPost[]> {
    const supabase = await createClient();
    const now = new Date().toISOString();
    let query = supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .or(`publish_at.is.null,publish_at.lte.${now}`)
        .order("created_at", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query;
    if (error) return [];
    return (data ?? []) as BlogPost[];
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
    const supabase = await createClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .eq("featured", true)
        .or(`publish_at.is.null,publish_at.lte.${now}`)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) return null;
    return data as BlogPost | null;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const supabase = await createClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .or(`publish_at.is.null,publish_at.lte.${now}`)
        .maybeSingle();

    if (error) return null;
    return data as BlogPost | null;
}

export async function getRelatedPosts(excludeSlug: string, count = 3): Promise<BlogPost[]> {
    const supabase = await createClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .neq("slug", excludeSlug)
        .or(`publish_at.is.null,publish_at.lte.${now}`)
        .order("created_at", { ascending: false })
        .limit(count);

    if (error) return [];
    return (data ?? []) as BlogPost[];
}

/** Admin-only: fetch all posts regardless of published/scheduled state. */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) return [];
    return (data ?? []) as BlogPost[];
}

export async function getAllCategories(): Promise<BlogCategory[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name", { ascending: true });

    if (error) return [];
    return (data ?? []) as BlogCategory[];
}

/** Returns distinct categories from published posts. */
export async function getPublishedCategories(): Promise<string[]> {
    const supabase = await createClient();
    const now = new Date().toISOString();
    const { data, error } = await supabase
        .from("blog_posts")
        .select("category")
        .eq("is_published", true)
        .or(`publish_at.is.null,publish_at.lte.${now}`)
        .not("category", "is", null);

    if (error) return [];
    const seen = new Set<string>();
    for (const row of data ?? []) {
        if (row.category) seen.add(row.category);
    }
    return Array.from(seen).sort();
}
