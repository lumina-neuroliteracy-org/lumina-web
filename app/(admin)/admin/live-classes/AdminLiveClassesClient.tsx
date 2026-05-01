"use client";

import { useState } from "react";
import { Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveClassCard } from "@/components/dashboard/LiveClassCard";
import { LiveClassFormDialog } from "@/components/dashboard/LiveClassFormDialog";
import type { LiveClass } from "@/lib/supabase/types";

export function AdminLiveClassesClient({
    liveClasses,
}: {
    liveClasses: LiveClass[];
}) {
    const [creating, setCreating] = useState(false);

    return (
        <>
            <div className="space-y-6 mt-2 lg:mt-0">
                <div className="flex flex-col lg:flex-row lg:*:items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-brand-navy">
                            Live Classes
                        </h1>
                        <p className="mt-1 text-sm text-brand-muted">
                            Manage class sessions and join links
                        </p>
                    </div>
                    <Button
                        onClick={() => setCreating(true)}
                        className="rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90 mt-3 lg:my-0 max-w-xs"
                    >
                        <Plus className="size-4 mr-1" />
                        Create Class
                    </Button>
                </div>

                {liveClasses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-brand-card py-16 text-center">
                        <Video className="size-10 text-brand-muted/50 mb-3" />
                        <p className="text-sm text-brand-muted">
                            No live classes yet. Create your first one.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {liveClasses.map((lc) => (
                            <LiveClassCard key={lc.id} liveClass={lc} isAdmin />
                        ))}
                    </div>
                )}
            </div>

            {creating && (
                <LiveClassFormDialog onClose={() => setCreating(false)} />
            )}
        </>
    );
}
