import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { UserListEntry } from "@/lib/supabase/types";

export async function getAllProfiles(): Promise<UserListEntry[]> {
    const [supabase, admin] = await Promise.all([
        createClient(),
        Promise.resolve(createAdminClient()),
    ]);

    const { data: profiles, error } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, role, is_active, created_at")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    const { data: authUsers } = await admin.auth.admin.listUsers({ perPage: 1000 });
    const emailMap = new Map(
        (authUsers?.users ?? []).map((u) => [u.id, u.email ?? null])
    );

    return (profiles ?? []).map((p) => ({
        ...p,
        email: emailMap.get(p.id) ?? null,
    })) as UserListEntry[];
}
