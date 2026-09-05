import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { LiveClass } from "@/lib/supabase/types";

export async function getActiveLiveClasses(studentId: string): Promise<LiveClass[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_classes")
        .select("*")
        .eq("is_active", true)
        .or(`assigned_to.is.null,assigned_to.eq.${studentId}`)
        .order("scheduled_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []) as LiveClass[];
}

export async function getAllLiveClasses(): Promise<LiveClass[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("live_classes")
        .select("*")
        .order("scheduled_at", { ascending: false });

    if (error) throw new Error(error.message);
    return (data ?? []) as LiveClass[];
}
