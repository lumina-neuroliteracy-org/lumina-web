import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Role, UserListEntry } from "@/lib/supabase/types";

export async function getAllProfiles(): Promise<UserListEntry[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role, created_at")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as UserListEntry[];
}

export async function setUserRole(
    targetId: string,
    newRole: Extract<Role, "student" | "admin">
): Promise<{ error: string | null }> {
    const supabase = await createClient();

    // Verify caller is super_admin before updating
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Unauthenticated" };

    const { data: caller } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (caller?.role !== "super_admin") return { error: "Forbidden" };

    const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", targetId);

    return { error: error?.message ?? null };
}
