"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog";
import { slugify } from "@/lib/blog";
import { createClient } from "@/lib/supabase/client";
import type { BlogCategory, BlogPost } from "@/lib/supabase/types";


type Section = { heading: string; body: string };

function toLocalDatetime(iso: string) {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function BlogFormDialog({
    existing,
    categories,
    onClose,
}: {
    existing?: BlogPost;
    categories: BlogCategory[];
    onClose: () => void;
}) {
    const router = useRouter();

    const [title, setTitle] = useState(existing?.title ?? "");
    const [slug, setSlug] = useState(existing?.slug ?? "");
    const [slugEdited, setSlugEdited] = useState(!!existing);
    const [excerpt, setExcerpt] = useState(existing?.excerpt ?? "");
    const [category, setCategory] = useState(existing?.category ?? categories[0]?.name ?? "");
    const [readTime, setReadTime] = useState(existing?.read_time ?? "5 min read");
    const [featured, setFeatured] = useState(existing?.featured ?? false);
    const [isPublished, setIsPublished] = useState(existing?.is_published ?? false);

    // Scheduling
    const [scheduleMode, setScheduleMode] = useState<"now" | "schedule">(
        existing?.publish_at ? "schedule" : "now"
    );
    const [publishAt, setPublishAt] = useState(
        existing?.publish_at ? toLocalDatetime(existing.publish_at) : ""
    );

    // Content sections
    const [sections, setSections] = useState<Section[]>(
        existing?.content?.length
            ? existing.content.map((s) => ({ heading: s.heading ?? "", body: s.body }))
            : [{ heading: "", body: "" }]
    );

    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(existing?.cover_image_url ?? null);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageError, setImageError] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Auto-generate slug from title
    useEffect(() => {
        if (!slugEdited && title) {
            setSlug(slugify(title));
        }
    }, [title, slugEdited]);

    function addSection() {
        setSections((prev) => [...prev, { heading: "", body: "" }]);
    }

    function removeSection(index: number) {
        setSections((prev) => prev.filter((_, i) => i !== index));
    }

    function updateSection(index: number, field: keyof Section, value: string) {
        setSections((prev) =>
            prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
        );
    }

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageError(null);
        setImageUploading(true);
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const path = `covers/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
            .from("blog-images")
            .upload(path, file, { upsert: true });

        if (uploadError) {
            setImageError(uploadError.message);
            setImageUploading(false);
            return;
        }

        const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
        setCoverImageUrl(data.publicUrl);
        setImageUploading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!slug) {
            setError("Slug is required.");
            return;
        }

        const filledSections = sections.filter((s) => s.body.trim());
        if (filledSections.length === 0) {
            setError("At least one content section with body text is required.");
            return;
        }

        const content = filledSections.map((s) => ({
            heading: s.heading.trim() || undefined,
            body: s.body.trim(),
        }));

        let resolvedPublishAt: string | null = null;
        if (scheduleMode === "schedule" && publishAt) {
            resolvedPublishAt = new Date(publishAt).toISOString();
        }

        const payload = {
            title: title.trim(),
            slug: slug.trim(),
            excerpt: excerpt.trim() || null,
            category: category || null,
            cover_image_url: coverImageUrl,
            content,
            read_time: readTime.trim() || null,
            featured,
            is_published: isPublished,
            publish_at: resolvedPublishAt,
        };

        setLoading(true);
        const result = existing
            ? await updateBlogPost(existing.id, payload)
            : await createBlogPost(payload);
        setLoading(false);

        if (result.error) {
            setError(result.error);
            toast.error(result.error);
        } else {
            toast.success(existing ? "Post updated" : "Post created");
            router.refresh();
            onClose();
        }
    }

    return (
        <Sheet open onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto px-4">
                <SheetHeader>
                    <SheetTitle>{existing ? "Edit Post" : "New Blog Post"}</SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {/* Title */}
                    <div className="space-y-1.5">
                        <Label htmlFor="bp-title">Title *</Label>
                        <Input
                            id="bp-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="rounded-xl"
                            placeholder="e.g. What Is Dyslexia?"
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1.5">
                        <Label htmlFor="bp-slug">Slug *</Label>
                        <Input
                            id="bp-slug"
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value);
                                setSlugEdited(true);
                            }}
                            required
                            className="rounded-xl font-mono text-sm"
                            placeholder="what-is-dyslexia"
                        />
                        <p className="text-xs text-muted-foreground">
                            URL: /blog/<span className="font-medium">{slug || "your-slug"}</span>
                        </p>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-1.5">
                        <Label>Cover Image</Label>
                        <p className="text-xs text-muted-foreground">
                            JPEG, PNG, or WebP · max 5 MB
                        </p>
                        {coverImageUrl ? (
                            <div className="relative w-full overflow-hidden rounded-xl border border-border">
                                <Image
                                    src={coverImageUrl}
                                    alt="Cover preview"
                                    width={1200}
                                    height={630}
                                    className="w-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setCoverImageUrl(null)}
                                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80 transition-colors"
                                    aria-label="Remove image"
                                >
                                    <X className="size-4" />
                                </button>
                            </div>
                        ) : (
                            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-brand-surface py-8 text-sm text-muted-foreground hover:border-brand-navy transition-colors">
                                <ImageIcon className="size-7 opacity-40" />
                                <span>
                                    {imageUploading ? "Uploading…" : "Click to upload cover image"}
                                </span>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={handleImageChange}
                                    disabled={imageUploading}
                                />
                            </label>
                        )}
                        {imageError && (
                            <p className="text-xs text-destructive">{imageError}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <Label htmlFor="bp-category">Category</Label>
                        <select
                            id="bp-category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">— No category —</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                        {categories.length === 0 && (
                            <p className="text-xs text-muted-foreground">
                                No categories yet. Create them from the Blog page.
                            </p>
                        )}
                    </div>

                    {/* Read time */}
                    <div className="space-y-1.5">
                        <Label htmlFor="bp-read-time">Read Time</Label>
                        <Input
                            id="bp-read-time"
                            value={readTime}
                            onChange={(e) => setReadTime(e.target.value)}
                            className="rounded-xl"
                            placeholder="5 min read"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-1.5">
                        <Label htmlFor="bp-excerpt">Excerpt</Label>
                        <textarea
                            id="bp-excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            placeholder="A short summary shown on the blog listing page."
                        />
                    </div>

                    {/* Content sections */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label>Content Sections *</Label>
                            <button
                                type="button"
                                onClick={addSection}
                                className="flex items-center gap-1 text-xs font-medium text-brand-navy hover:text-brand-gold transition-colors"
                            >
                                <Plus className="size-3.5" /> Add Section
                            </button>
                        </div>
                        <div className="space-y-4">
                            {sections.map((section, i) => (
                                <div key={i} className="rounded-xl border border-border p-4 space-y-3 bg-brand-surface">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                                            Section {i + 1}
                                        </span>
                                        {sections.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSection(i)}
                                                className="text-destructive hover:text-destructive/70 transition-colors"
                                                aria-label="Remove section"
                                            >
                                                <Trash2 className="size-4" />
                                            </button>
                                        )}
                                    </div>
                                    <Input
                                        value={section.heading}
                                        onChange={(e) => updateSection(i, "heading", e.target.value)}
                                        placeholder="Section heading (optional)"
                                        className="rounded-lg text-sm"
                                    />
                                    <textarea
                                        value={section.body}
                                        onChange={(e) => updateSection(i, "body", e.target.value)}
                                        rows={5}
                                        required={i === 0}
                                        placeholder="Write the section content here. Use a blank line between paragraphs."
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Toggles */}
                    <div className="space-y-3 rounded-xl border border-border bg-brand-surface p-4">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={featured}
                                onChange={(e) => setFeatured(e.target.checked)}
                                className="rounded"
                            />
                            <span>Featured post <span className="text-xs text-muted-foreground">(shown at top of blog listing)</span></span>
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isPublished}
                                onChange={(e) => setIsPublished(e.target.checked)}
                                className="rounded"
                            />
                            <span>Published <span className="text-xs text-muted-foreground">(visible on site)</span></span>
                        </label>
                    </div>

                    {/* Scheduling */}
                    <div className="space-y-3 rounded-xl border border-border bg-brand-surface p-4">
                        <Label>Publish timing</Label>
                        <div className="flex gap-4 text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="schedule"
                                    checked={scheduleMode === "now"}
                                    onChange={() => setScheduleMode("now")}
                                />
                                Publish immediately
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="schedule"
                                    checked={scheduleMode === "schedule"}
                                    onChange={() => setScheduleMode("schedule")}
                                />
                                Schedule for later
                            </label>
                        </div>
                        {scheduleMode === "schedule" && (
                            <div className="space-y-1.5">
                                <Label htmlFor="bp-publish-at">Publish date &amp; time</Label>
                                <Input
                                    id="bp-publish-at"
                                    type="datetime-local"
                                    value={publishAt}
                                    onChange={(e) => setPublishAt(e.target.value)}
                                    required={scheduleMode === "schedule"}
                                    className="rounded-xl"
                                />
                                <p className="text-xs text-muted-foreground">
                                    The post will go live automatically at this time (once Published is also enabled).
                                </p>
                            </div>
                        )}
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <div className="flex gap-3 pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
                        >
                            {loading ? "Saving…" : existing ? "Update Post" : "Create Post"}
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
