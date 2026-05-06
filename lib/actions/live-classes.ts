"use server";

import { createClient } from "@/lib/supabase/server";
import type { LiveClass } from "@/lib/supabase/types";

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
