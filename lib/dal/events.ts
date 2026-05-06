import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/lib/supabase/types";

export async function getNextEvent(): Promise<Event | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true })
        .limit(1)
        .maybeSingle();

    if (error) return null;
    return data as Event | null;
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .gte("date", new Date().toISOString())
        .order("date", { ascending: true });

    if (error) return [];
    return (data ?? []) as Event[];
}

export async function getAllEvents(): Promise<Event[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

    if (error) return [];
    return (data ?? []) as Event[];
}
