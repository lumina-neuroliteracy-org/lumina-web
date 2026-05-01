"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteLiveClass } from "@/lib/actions/live-classes";
import type { LiveClass } from "@/lib/supabase/types";
import { LiveClassFormDialog } from "./LiveClassFormDialog";
import Link from "next/link";

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
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        setDeleting(true);
        const { error } = await deleteLiveClass(liveClass.id);
        setDeleting(false);
        setConfirmOpen(false);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Live class deleted");
            router.refresh();
        }
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

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 pt-1 min-w-0">
                    <Link
                        href={liveClass.join_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto gap-1.5 rounded-full bg-brand-navy px-4 py-2 text-xs font-medium text-brand-on-navy transition-colors hover:bg-brand-navy/90 min-w-0 max-w-full"
                    >
                        <ExternalLink className="size-3" />
                        Join Class
                    </Link>

                    {isAdmin && (
                        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto min-w-0">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditing(true)}
                                className="rounded-full w-full sm:w-auto justify-center min-w-0 max-w-full"
                            >
                                <Pencil className="size-3.5 mr-1" />
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setConfirmOpen(true)}
                                className="rounded-full w-full sm:w-auto justify-center text-destructive hover:text-destructive min-w-0 max-w-full"
                            >
                                <Trash2 className="size-3.5 mr-1" />
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {editing && (
                <LiveClassFormDialog
                    existing={liveClass}
                    onClose={() => setEditing(false)}
                />
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete live class?"
                description={`"${liveClass.title}" will be permanently removed.`}
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}
