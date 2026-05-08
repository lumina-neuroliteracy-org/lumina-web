"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSetting } from "@/lib/actions/settings";

// Converts any YouTube URL format to an embed URL.
// Returns null if no valid YouTube video ID can be found.
function toYouTubeEmbedUrl(input: string): string | null {
    const match = input.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (!match) return null;
    return `https://www.youtube.com/embed/${match[1]}`;
}

export function SiteSettingsForm({ youtubeUrl }: { youtubeUrl: string }) {
    const [url, setUrl] = useState(youtubeUrl);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const embedUrl = toYouTubeEmbedUrl(url);
        if (!embedUrl) {
            toast.error("Please paste a valid YouTube URL");
            return;
        }
        setLoading(true);
        const { error } = await updateSetting("homepage_youtube_url", embedUrl);
        setLoading(false);
        if (error) {
            toast.error(error);
        } else {
            setUrl(embedUrl);
            toast.success("Settings saved");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-brand-card p-6 space-y-4"
        >
            <div>
                <h2 className="text-sm font-semibold text-brand-navy">Homepage Video</h2>
                <p className="mt-0.5 text-xs text-brand-muted">
                    Paste any YouTube link — watch, share, or embed URL are all accepted.
                </p>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="youtube-url">YouTube URL</Label>
                <Input
                    id="youtube-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="rounded-xl"
                    required
                />
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
            >
                {loading ? "Saving…" : "Save changes"}
            </Button>
        </form>
    );
}
