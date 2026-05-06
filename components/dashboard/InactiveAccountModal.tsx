"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function InactiveAccountModal() {
    const router = useRouter();
    const supabase = createClient();

    async function handleSignOut() {
        await supabase.auth.signOut();
        router.push("/login");
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-sm rounded-2xl border border-border bg-brand-card p-8 text-center shadow-xl">
                <div className="mb-4 flex justify-center">
                    <div className="flex size-14 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="size-7 text-red-600" />
                    </div>
                </div>
                <h2 className="text-xl font-semibold text-brand-navy">
                    Account Inactive
                </h2>
                <p className="mt-2 text-sm text-brand-muted">
                    Your account is inactive. Please contact an
                    administrator to gain access.
                </p>
                <p className="text-brand-navy">info@lumina-literacy.ie</p>
                <Button
                    onClick={handleSignOut}
                    className="mt-6 w-full rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
