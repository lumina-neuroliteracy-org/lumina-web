import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/supabase/types";

export async function getPublishedResources(): Promise<Resource[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as Resource[];
}

export async function getAllResources(): Promise<Resource[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as Resource[];
}

export async function createResource(
    payload: Omit<Resource, "id" | "created_by" | "created_at" | "updated_at">
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { error } = await supabase
        .from("resources")
        .insert({ ...payload, created_by: user.id });
    return { error: error?.message ?? null };
}

export async function updateResource(
    id: string,
    payload: Partial<
        Omit<Resource, "id" | "created_by" | "created_at" | "updated_at">
    >
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("resources")
        .update(payload)
        .eq("id", id);
    return { error: error?.message ?? null };
}

export async function deleteResource(
    id: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", id);
    return { error: error?.message ?? null };
}
