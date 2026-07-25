"use server";

import { createClient } from "@/lib/supabase/server";
import type { BlogPost } from "@/lib/supabase/types";

type BlogPayload = Omit<BlogPost, "id" | "created_by" | "created_at" | "updated_at">;
type BlogUpdatePayload = Partial<BlogPayload>;

export async function createBlogPost(
    payload: BlogPayload
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { error } = await supabase
        .from("blog_posts")
        .insert({ ...payload, created_by: user.id });
    return { error: error?.message ?? null };
}

export async function updateBlogPost(
    id: string,
    payload: BlogUpdatePayload
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("blog_posts")
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq("id", id);
    return { error: error?.message ?? null };
}

export async function deleteBlogPost(
    id: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);
    return { error: error?.message ?? null };
}

export async function createCategory(
    name: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { error } = await supabase
        .from("blog_categories")
        .insert({ name: name.trim() });
    return { error: error?.message ?? null };
}

export async function deleteCategory(
    id: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("blog_categories")
        .delete()
        .eq("id", id);
    return { error: error?.message ?? null };
}

export async function toggleBlogPostPublished(
    id: string,
    is_published: boolean
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("blog_posts")
        .update({ is_published, updated_at: new Date().toISOString() })
        .eq("id", id);
    return { error: error?.message ?? null };
}
