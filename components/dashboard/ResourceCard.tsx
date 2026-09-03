"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { deleteResource } from "@/lib/actions/resources";
import type { Resource } from "@/lib/supabase/types";
import { ResourceFormDialog } from "./ResourceFormDialog";
import Link from "next/link";

const BADGE_COLORS: Record<string, string> = {
    // documents
    pdf:  "bg-red-100 text-red-700",
    doc:  "bg-blue-100 text-blue-700",
    docx: "bg-blue-100 text-blue-700",
    xls:  "bg-green-100 text-green-700",
    xlsx: "bg-green-100 text-green-700",
    ppt:  "bg-orange-100 text-orange-700",
    pptx: "bg-orange-100 text-orange-700",
    txt:  "bg-gray-100 text-gray-600",
    // images
    jpg:  "bg-yellow-100 text-yellow-700",
    jpeg: "bg-yellow-100 text-yellow-700",
    png:  "bg-yellow-100 text-yellow-700",
    gif:  "bg-yellow-100 text-yellow-700",
    webp: "bg-yellow-100 text-yellow-700",
    svg:  "bg-yellow-100 text-yellow-700",
    // video
    mp4:  "bg-purple-100 text-purple-700",
    mov:  "bg-purple-100 text-purple-700",
    avi:  "bg-purple-100 text-purple-700",
    webm: "bg-purple-100 text-purple-700",
    // audio
    mp3:  "bg-pink-100 text-pink-700",
    wav:  "bg-pink-100 text-pink-700",
    // archive
    zip:  "bg-gray-100 text-gray-700",
    rar:  "bg-gray-100 text-gray-700",
};

export function ResourceCard({
    resource,
    isAdmin = false,
    students = [],
}: {
    resource: Resource;
    isAdmin?: boolean;
    students?: { id: string; full_name: string | null }[];
}) {
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    async function handleDelete() {
        setDeleting(true);
        const { error } = await deleteResource(resource.id);
        setDeleting(false);
        setConfirmOpen(false);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Resource deleted");
            router.refresh();
        }
    }

    const badgeClass =
        BADGE_COLORS[resource.file_type] ?? "bg-gray-100 text-gray-700";

    return (
        <>
            <div className="rounded-xl border border-border bg-brand-card p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-brand-navy">
                        {resource.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1.5">
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase ${badgeClass}`}
                        >
                            {resource.file_type}
                        </span>
                        {isAdmin && (
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${resource.is_published ? "bg-green-100 text-green-700" : "bg-brand-muted/10 text-brand-muted"}`}
                            >
                                {resource.is_published ? "Published" : "Unpublished"}
                            </span>
                        )}
                    </div>
                </div>

                {resource.description && (
                    <p className="text-sm text-brand-muted line-clamp-2">
                        {resource.description}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 pt-1 min-w-0">
                    <Link
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto gap-1.5 rounded-full bg-brand-navy px-4 py-2 text-xs font-medium text-brand-on-navy transition-colors hover:bg-brand-navy/90 min-w-0 max-w-full"
                    >
                        <Download className="size-3" />
                        Download
                    </Link>

                    {isAdmin && (
                        <>
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
                        </>
                    )}
                </div>
            </div>

            {editing && (
                <ResourceFormDialog
                    existing={resource}
                    onClose={() => setEditing(false)}
                    students={students}
                />
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete resource?"
                description={`"${resource.title}" will be permanently removed.`}
                loading={deleting}
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}
