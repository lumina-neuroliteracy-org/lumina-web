"use server";

import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/supabase/types";

export async function setUserRole(
    targetId: string,
    newRole: Extract<Role, "student" | "admin">
): Promise<{ error: string | null }> {
    const supabase = await createClient();

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
