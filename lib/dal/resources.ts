import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Resource } from "@/lib/supabase/types";

export async function getPublishedResources(studentId: string): Promise<Resource[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_published", true)
        .or(`assigned_to.is.null,assigned_to.eq.${studentId}`)
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as Resource[];
}

export async function getAllResources(): Promise<Resource[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as Resource[];
}
