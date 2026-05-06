"use client";

import { useRef, useState } from "react";
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
import { createClient } from "@/lib/supabase/client";
import type { Event, EventType } from "@/lib/supabase/types";

const BANNER_MAX_BYTES = 2 * 1024 * 1024;
const BANNER_ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

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
    const supabase = createClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState(existing?.title ?? "");
    const [description, setDescription] = useState(existing?.description ?? "");
    const [type, setType] = useState<EventType>(existing?.type ?? "webinar");
    const [date, setDate] = useState(
        existing ? toDatetimeLocal(existing.date) : ""
    );
    const [href, setHref] = useState(existing?.href ?? "");
    const [isPublished, setIsPublished] = useState(existing?.is_published ?? true);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(existing?.banner_image_url ?? null);
    const [removeBanner, setRemoveBanner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bannerError, setBannerError] = useState<string | null>(null);

    async function uploadBanner(f: File): Promise<string> {
        const ext = f.name.includes(".") ? `.${f.name.split(".").pop()}` : "";
        const base = f.name
            .slice(0, f.name.length - ext.length)
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-zA-Z0-9._-]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
        const path = `${Date.now()}-${base}${ext}`;
        const { error: uploadError } = await supabase.storage
            .from("event-banners")
            .upload(path, f);
        if (uploadError) throw new Error(uploadError.message);
        return supabase.storage.from("event-banners").getPublicUrl(path).data.publicUrl;
    }

    function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;
        if (!BANNER_ACCEPTED.includes(f.type)) {
            setBannerError("Only JPEG, PNG, or WebP images are allowed.");
            return;
        }
        if (f.size > BANNER_MAX_BYTES) {
            setBannerError("Image must be 2 MB or smaller.");
            return;
        }
        setBannerError(null);
        setBannerFile(f);
        setBannerPreview(URL.createObjectURL(f));
        setRemoveBanner(false);
    }

    function handleRemoveBanner() {
        setBannerFile(null);
        setBannerPreview(null);
        setRemoveBanner(true);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        let bannerUrl: string | null = existing?.banner_image_url ?? null;
        if (bannerFile) {
            try {
                bannerUrl = await uploadBanner(bannerFile);
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Image upload failed";
                setError(msg);
                toast.error(msg);
                setLoading(false);
                return;
            }
        } else if (removeBanner) {
            bannerUrl = null;
        }

        const payload = {
            title,
            description: description || null,
            type,
            date: new Date(date).toISOString(),
            href: href || null,
            banner_image_url: bannerUrl,
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

                    <div className="space-y-1.5">
                        <Label htmlFor="ev-banner">Banner Image</Label>
                        <p className="text-xs text-muted-foreground">Recommended: 1700 × 400 px · JPEG, PNG, or WebP · max 2 MB</p>
                        <input
                            ref={fileInputRef}
                            id="ev-banner"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleBannerChange}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-brand-navy file:px-3 file:py-1 file:text-xs file:font-semibold file:text-brand-on-navy"
                        />
                        {bannerError && (
                            <p className="text-xs text-destructive">{bannerError}</p>
                        )}
                        {bannerPreview && (
                            <div className="relative mt-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={bannerPreview}
                                    alt="Banner preview"
                                    className="w-full rounded-xl object-cover"
                                    style={{ maxHeight: "120px" }}
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveBanner}
                                    className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white hover:bg-black/80"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
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
