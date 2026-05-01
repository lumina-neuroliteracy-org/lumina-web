"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLiveClass, updateLiveClass } from "@/lib/dal/live-classes";
import type { LiveClass } from "@/lib/supabase/types";

function toDatetimeLocal(iso: string) {
    return iso.slice(0, 16);
}

export function LiveClassFormDialog({
    existing,
    onClose,
}: {
    existing?: LiveClass;
    onClose: () => void;
}) {
    const router = useRouter();
    const [title, setTitle] = useState(existing?.title ?? "");
    const [description, setDescription] = useState(
        existing?.description ?? ""
    );
    const [joinUrl, setJoinUrl] = useState(existing?.join_url ?? "");
    const [scheduledAt, setScheduledAt] = useState(
        existing ? toDatetimeLocal(existing.scheduled_at) : ""
    );
    const [isActive, setIsActive] = useState(existing?.is_active ?? true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const payload = {
            title,
            description: description || null,
            join_url: joinUrl,
            scheduled_at: new Date(scheduledAt).toISOString(),
            is_active: isActive,
        };

        const result = existing
            ? await updateLiveClass(existing.id, payload)
            : await createLiveClass(payload);

        setLoading(false);

        if (result.error) {
            setError(result.error);
        } else {
            router.refresh();
            onClose();
        }
    }

    return (
        <Sheet open onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>
                        {existing ? "Edit Live Class" : "Create Live Class"}
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="lc-title">Title</Label>
                        <Input
                            id="lc-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="lc-desc">Description</Label>
                        <textarea
                            id="lc-desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="lc-url">Join URL</Label>
                        <Input
                            id="lc-url"
                            type="url"
                            value={joinUrl}
                            onChange={(e) => setJoinUrl(e.target.value)}
                            required
                            placeholder="https://meet.google.com/..."
                            className="rounded-xl"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="lc-date">Scheduled At</Label>
                        <Input
                            id="lc-date"
                            type="datetime-local"
                            value={scheduledAt}
                            onChange={(e) => setScheduledAt(e.target.value)}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="rounded"
                        />
                        Active (visible to students)
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
