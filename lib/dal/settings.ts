import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getSetting = cache(async (key: string): Promise<string | null> => {
    const supabase = await createClient();
    const { data } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .single();
    return data?.value ?? null;
});
