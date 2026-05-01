import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { UserListEntry } from "@/lib/supabase/types";

export async function getAllProfiles(): Promise<UserListEntry[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role, created_at")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as UserListEntry[];
}
