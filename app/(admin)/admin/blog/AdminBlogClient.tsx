"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookOpen, Plus, Pencil, Trash2, Star, Eye, EyeOff, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogFormDialog } from "@/components/blog/BlogFormDialog";
import { CategoryManagerDialog } from "@/components/blog/CategoryManagerDialog";
import { deleteBlogPost, toggleBlogPostPublished } from "@/lib/actions/blog";
import { formatDate } from "@/lib/blog";
import type { BlogCategory, BlogPost } from "@/lib/supabase/types";

function PostStatus({ post }: { post: BlogPost }) {
    const now = new Date();
    const isScheduled =
        post.is_published &&
        post.publish_at &&
        new Date(post.publish_at) > now;

    if (isScheduled) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                <Clock className="size-3" />
                Scheduled
            </span>
        );
    }
    if (post.is_published) {
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                <Eye className="size-3" />
                Live
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
            <EyeOff className="size-3" />
            Draft
        </span>
    );
}

export function AdminBlogClient({
    posts,
    categories,
}: {
    posts: BlogPost[];
    categories: BlogCategory[];
}) {
    const router = useRouter();
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState<BlogPost | null>(null);
    const [managingCategories, setManagingCategories] = useState(false);

    async function handleDelete(post: BlogPost) {
        if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
        const { error } = await deleteBlogPost(post.id);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Post deleted");
            router.refresh();
        }
    }

    async function handleTogglePublish(post: BlogPost) {
        const next = !post.is_published;
        const { error } = await toggleBlogPostPublished(post.id, next);
        if (error) {
            toast.error(error);
        } else {
            toast.success(next ? "Post published" : "Post unpublished");
            router.refresh();
        }
    }

    return (
        <>
            <div className="space-y-6 mt-2 lg:mt-0">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div>
                        <h1 className="text-2xl font-semibold text-brand-navy">Blog Posts</h1>
                        <p className="mt-1 text-sm text-brand-muted">
                            Manage articles, schedule posts, and control what&apos;s live.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setManagingCategories(true)}
                            className="rounded-full"
                        >
                            Categories
                        </Button>
                        <Button
                            onClick={() => setCreating(true)}
                            className="rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90"
                        >
                            <Plus className="size-4 mr-1" />
                            New Post
                        </Button>
                    </div>
                </div>

                {posts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-brand-card py-16 text-center">
                        <BookOpen className="size-10 text-brand-muted/50 mb-3" />
                        <p className="text-sm text-brand-muted">
                            No blog posts yet. Write your first one.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="flex flex-col gap-3 rounded-xl border border-border bg-brand-card p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <PostStatus post={post} />
                                        {post.featured && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold-soft px-2.5 py-0.5 text-xs font-semibold text-brand-gold-strong">
                                                <Star className="size-3" />
                                                Featured
                                            </span>
                                        )}
                                        {post.category && (
                                            <span className="text-xs text-brand-muted">
                                                {post.category}
                                            </span>
                                        )}
                                    </div>
                                    <p className="font-medium text-brand-navy truncate">
                                        {post.title}
                                    </p>
                                    <p className="text-xs text-brand-muted mt-0.5">
                                        {post.publish_at && new Date(post.publish_at) > new Date()
                                            ? `Scheduled for ${formatDate(post.publish_at)}`
                                            : `Created ${formatDate(post.created_at)}`}
                                        {post.read_time && ` · ${post.read_time}`}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleTogglePublish(post)}
                                        className="rounded-full text-xs"
                                    >
                                        {post.is_published ? "Unpublish" : "Publish"}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setEditing(post)}
                                        className="rounded-full"
                                        aria-label="Edit post"
                                    >
                                        <Pencil className="size-3.5" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDelete(post)}
                                        className="rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                                        aria-label="Delete post"
                                    >
                                        <Trash2 className="size-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {managingCategories && (
                <CategoryManagerDialog
                    categories={categories}
                    onClose={() => setManagingCategories(false)}
                />
            )}
            {creating && (
                <BlogFormDialog
                    categories={categories}
                    onClose={() => setCreating(false)}
                />
            )}
            {editing && (
                <BlogFormDialog
                    existing={editing}
                    categories={categories}
                    onClose={() => setEditing(null)}
                />
            )}
        </>
    );
}
