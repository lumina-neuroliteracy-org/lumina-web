import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Profile } from "@/lib/supabase/types";

export const getCurrentProfile = cache(async (): Promise<Profile> => {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) redirect("/login");

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error || !data) redirect("/login");
    return data as Profile;
});

export async function requireAuth(): Promise<Profile> {
    return getCurrentProfile();
}

export async function requireAdmin(): Promise<Profile> {
    const profile = await getCurrentProfile();
    if (profile.role !== "admin" && profile.role !== "super_admin")
        redirect("/student/dashboard");
    return profile;
}

export async function requireSuperAdmin(): Promise<Profile> {
    const profile = await getCurrentProfile();
    if (profile.role !== "super_admin") redirect("/admin/dashboard");
    return profile;
}
