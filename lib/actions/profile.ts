"use server";

import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/supabase/types";

export async function updateProfile(
    id: string,
    updates: Partial<Pick<Profile, "full_name" | "avatar_url">>
): Promise<{ error: string | null }> {
    const supabase = await createClient();
    const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", id);
    return { error: error?.message ?? null };
}
