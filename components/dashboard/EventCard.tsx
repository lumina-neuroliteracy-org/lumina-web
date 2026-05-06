"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteEvent } from "@/lib/actions/events";
import type { Event, EventType } from "@/lib/supabase/types";
import { EventFormDialog } from "./EventFormDialog";
import Link from "next/link";

const typeBadge: Record<EventType, string> = {
    webinar: "bg-blue-100 text-blue-700",
    seminar: "bg-purple-100 text-purple-700",
    event: "bg-emerald-100 text-emerald-700",
};

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

export function EventCard({
    event,
    isAdmin = false,
}: {
    event: Event;
    isAdmin?: boolean;
}) {
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        setDeleting(true);
        const { error } = await deleteEvent(event.id);
        setDeleting(false);
        setConfirmOpen(false);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Event deleted");
            router.refresh();
        }
    }

    return (
        <>
            <div className="rounded-xl border border-border bg-brand-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1.5">
                        <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${typeBadge[event.type]}`}
                        >
                            {event.type}
                        </span>
                        <h3 className="font-semibold text-brand-navy">{event.title}</h3>
                    </div>
                    {isAdmin && !event.is_published && (
                        <span className="shrink-0 rounded-full bg-brand-muted/10 px-2 py-0.5 text-xs text-brand-muted">
                            Draft
                        </span>
                    )}
                </div>

                {event.description && (
                    <p className="text-sm text-brand-muted line-clamp-2">
                        {event.description}
                    </p>
                )}

                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                    <Calendar className="size-3.5" />
                    {formatDate(event.date)}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 pt-1 min-w-0">
                    {event.href && (
                        <Link
                            href={event.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto gap-1.5 rounded-full bg-brand-navy px-4 py-2 text-xs font-medium text-brand-on-navy transition-colors hover:bg-brand-navy/90"
                        >
                            <ExternalLink className="size-3" />
                            Register
                        </Link>
                    )}

                    {isAdmin && (
                        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 w-full sm:w-auto min-w-0">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditing(true)}
                                className="rounded-full w-full sm:w-auto justify-center"
                            >
                                <Pencil className="size-3.5 mr-1" />
                                Edit
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setConfirmOpen(true)}
                                className="rounded-full w-full sm:w-auto justify-center text-destructive hover:text-destructive"
                            >
                                <Trash2 className="size-3.5 mr-1" />
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {editing && (
                <EventFormDialog
                    existing={event}
                    onClose={() => setEditing(false)}
                />
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete event?"
                description={`"${event.title}" will be permanently removed.`}
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}
