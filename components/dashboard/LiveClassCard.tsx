"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteLiveClass } from "@/lib/dal/live-classes";
import type { LiveClass } from "@/lib/supabase/types";
import { LiveClassFormDialog } from "./LiveClassFormDialog";

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

export function LiveClassCard({
    liveClass,
    isAdmin = false,
}: {
    liveClass: LiveClass;
    isAdmin?: boolean;
}) {
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        if (!confirm(`Delete "${liveClass.title}"?`)) return;
        setDeleting(true);
        await deleteLiveClass(liveClass.id);
        setDeleting(false);
        router.refresh();
    }

    return (
        <>
            <div className="rounded-xl border border-border bg-brand-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-brand-navy">
                        {liveClass.title}
                    </h3>
                    {isAdmin && !liveClass.is_active && (
                        <span className="shrink-0 rounded-full bg-brand-muted/10 px-2 py-0.5 text-xs text-brand-muted">
                            Inactive
                        </span>
                    )}
                </div>

                {liveClass.description && (
                    <p className="text-sm text-brand-muted line-clamp-2">
                        {liveClass.description}
                    </p>
                )}

                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <Calendar className="size-3.5" />
                    {formatDate(liveClass.scheduled_at)}
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <a
                        href={liveClass.join_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-brand-navy px-4 py-2 text-xs font-medium text-brand-on-navy transition-colors hover:bg-brand-navy/90"
                    >
                        <ExternalLink className="size-3" />
                        Join Class
                    </a>

                    {isAdmin && (
                        <>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditing(true)}
                                className="rounded-full"
                            >
                                <Pencil className="size-3.5 mr-1" />
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={deleting}
                                onClick={handleDelete}
                                className="rounded-full text-destructive hover:text-destructive"
                            >
                                <Trash2 className="size-3.5 mr-1" />
                                {deleting ? "Deleting…" : "Delete"}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {editing && (
                <LiveClassFormDialog
                    existing={liveClass}
                    onClose={() => setEditing(false)}
                />
            )}
        </>
    );
}
