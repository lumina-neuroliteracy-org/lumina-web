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
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { createResource, updateResource } from "@/lib/actions/resources";
import type { Resource } from "@/lib/supabase/types";

const FILE_TYPES = ["pdf", "video", "doc", "other"] as const;

export function ResourceFormDialog({
    existing,
    onClose,
}: {
    existing?: Resource;
    onClose: () => void;
}) {
    const router = useRouter();
    const supabase = createClient();

    const [title, setTitle] = useState(existing?.title ?? "");
    const [description, setDescription] = useState(
        existing?.description ?? ""
    );
    const [fileType, setFileType] = useState<string>(
        existing?.file_type ?? "pdf"
    );
    const [fileUrl, setFileUrl] = useState(existing?.file_url ?? "");
    const [file, setFile] = useState<File | null>(null);
    const [isPublished, setIsPublished] = useState(
        existing?.is_published ?? false
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function uploadFile(f: File): Promise<string> {
        const path = `${Date.now()}-${f.name.replace(/\s+/g, "-")}`;
        const { error: uploadError } = await supabase.storage
            .from("resources")
            .upload(path, f);
        if (uploadError) throw new Error(uploadError.message);
        return supabase.storage.from("resources").getPublicUrl(path).data
            .publicUrl;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            let resolvedUrl = fileUrl;
            if (file) {
                resolvedUrl = await uploadFile(file);
            }
            if (!resolvedUrl) {
                setError("Please provide a file or URL.");
                setLoading(false);
                return;
            }

            const payload = {
                title,
                description: description || null,
                file_url: resolvedUrl,
                file_type: fileType,
                is_published: isPublished,
            };

            const result = existing
                ? await updateResource(existing.id, payload)
                : await createResource(payload);

            if (result.error) {
                setError(result.error);
                toast.error(result.error);
            } else {
                toast.success(existing ? "Resource updated" : "Resource added");
                router.refresh();
                onClose();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Sheet open onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4">
                <SheetHeader>
                    <SheetTitle>
                        {existing ? "Edit Resource" : "Add Resource"}
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="res-title">Title</Label>
                        <Input
                            id="res-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="res-desc">Description</Label>
                        <textarea
                            id="res-desc"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="res-type">File Type</Label>
                        <select
                            id="res-type"
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value)}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            {FILE_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>File</Label>
                        <Input
                            type="file"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] ?? null)
                            }
                            className="rounded-xl"
                        />
                        <p className="text-xs text-brand-muted">
                            Or paste a direct URL below
                        </p>
                        <Input
                            type="url"
                            value={fileUrl}
                            onChange={(e) => setFileUrl(e.target.value)}
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
                        Published (visible to students)
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
