"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createEvent, updateEvent } from "@/lib/actions/events";
import type { Event, EventType } from "@/lib/supabase/types";

function toDatetimeLocal(iso: string) {
    return iso.slice(0, 16);
}

export function EventFormDialog({
    existing,
    onClose,
}: {
    existing?: Event;
    onClose: () => void;
}) {
    const router = useRouter();
    const [title, setTitle] = useState(existing?.title ?? "");
    const [description, setDescription] = useState(existing?.description ?? "");
    const [type, setType] = useState<EventType>(existing?.type ?? "webinar");
    const [date, setDate] = useState(
        existing ? toDatetimeLocal(existing.date) : ""
    );
    const [href, setHref] = useState(existing?.href ?? "");
    const [isPublished, setIsPublished] = useState(existing?.is_published ?? true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const payload = {
            title,
            description: description || null,
            type,
            date: new Date(date).toISOString(),
            href: href || null,
            is_published: isPublished,
        };

        const result = existing
            ? await updateEvent(existing.id, payload)
            : await createEvent(payload);

        setLoading(false);

        if (result.error) {
            setError(result.error);
            toast.error(result.error);
        } else {
            toast.success(existing ? "Event updated" : "Event created");
            router.refresh();
            onClose();
        }
    }

    return (
        <Sheet open onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4">
                <SheetHeader>
                    <SheetTitle>
                        {existing ? "Edit Event" : "Create Event"}
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="ev-title">Title</Label>
                        <Input
                            id="ev-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="ev-desc">Description</Label>
                        <textarea
                            id="ev-desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="ev-type">Type</Label>
                        <select
                            id="ev-type"
                            value={type}
                            onChange={(e) => setType(e.target.value as EventType)}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="webinar">Webinar</option>
                            <option value="seminar">Seminar</option>
                            <option value="event">Event</option>
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="ev-date">Date &amp; Time</Label>
                        <Input
                            id="ev-date"
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="ev-href">Registration Link</Label>
                        <Input
                            id="ev-href"
                            type="url"
                            value={href}
                            onChange={(e) => setHref(e.target.value)}
                            placeholder="https://..."
                            className="rounded-xl"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            className="rounded"
                        />
                        Published (visible on site)
                    </label>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
                        >
                            {loading ? "Saving…" : "Save"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-full"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
