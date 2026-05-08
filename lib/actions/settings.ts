"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/dal/profile";

export async function updateSetting(key: string, value: string): Promise<{ error: string | null }> {
    await requireAdmin();
    const supabase = await createClient();
    const { error } = await supabase
        .from("site_settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);
    return { error: error?.message ?? null };
}
