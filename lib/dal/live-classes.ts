import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { LiveClass } from "@/lib/supabase/types";

export async function getActiveLiveClasses(): Promise<LiveClass[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_classes")
        .select("*")
        .eq("is_active", true)
        .order("scheduled_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as LiveClass[];
}

export async function getAllLiveClasses(): Promise<LiveClass[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_classes")
        .select("*")
        .order("scheduled_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as LiveClass[];
}

export async function createLiveClass(
    payload: Omit<LiveClass, "id" | "created_by" | "created_at" | "updated_at">
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { error } = await supabase
        .from("live_classes")
        .insert({ ...payload, created_by: user.id });
    return { error: error?.message ?? null };
}

export async function updateLiveClass(
    id: string,
    payload: Partial<
        Omit<LiveClass, "id" | "created_by" | "created_at" | "updated_at">
    >
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("live_classes")
        .update(payload)
        .eq("id", id);
    return { error: error?.message ?? null };
}

export async function deleteLiveClass(
    id: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("live_classes")
        .delete()
        .eq("id", id);
    return { error: error?.message ?? null };
}
