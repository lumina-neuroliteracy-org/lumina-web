"use client";

import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/dashboard/ResourceCard";
import { ResourceFormDialog } from "@/components/dashboard/ResourceFormDialog";
import type { Resource } from "@/lib/supabase/types";

export function AdminResourcesClient({
    resources,
}: {
    resources: Resource[];
}) {
    const [creating, setCreating] = useState(false);

    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-brand-navy">
                            Resources
                        </h1>
                        <p className="mt-1 text-sm text-brand-muted">
                            Upload and manage learning materials
                        </p>
                    </div>
                    <Button
                        onClick={() => setCreating(true)}
                        className="rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
                    >
                        <Plus className="size-4 mr-1" />
                        Add Resource
                    </Button>
                </div>

                {resources.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-brand-card py-16 text-center">
                        <FileText className="size-10 text-brand-muted/50 mb-3" />
                        <p className="text-sm text-brand-muted">
                            No resources yet. Add your first one.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {resources.map((r) => (
                            <ResourceCard key={r.id} resource={r} isAdmin />
                        ))}
                    </div>
                )}
            </div>

            {creating && (
                <ResourceFormDialog onClose={() => setCreating(false)} />
            )}
        </>
    );
}
