"use server";

import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/supabase/types";

export async function createEvent(
    payload: Omit<Event, "id" | "created_by" | "created_at" | "updated_at">
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { error } = await supabase
        .from("events")
        .insert({ ...payload, created_by: user.id });
    return { error: error?.message ?? null };
}

export async function updateEvent(
    id: string,
    payload: Partial<Omit<Event, "id" | "created_by" | "created_at" | "updated_at">>
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("events")
        .update(payload)
        .eq("id", id);
    return { error: error?.message ?? null };
}

export async function deleteEvent(
    id: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);
    return { error: error?.message ?? null };
}
