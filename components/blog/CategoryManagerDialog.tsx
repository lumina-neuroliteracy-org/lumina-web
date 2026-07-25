"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, Trash2, Tag } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory, deleteCategory } from "@/lib/actions/blog";
import type { BlogCategory } from "@/lib/supabase/types";

export function CategoryManagerDialog({
    categories,
    onClose,
}: {
    categories: BlogCategory[];
    onClose: () => void;
}) {
    const router = useRouter();
    const [newName, setNewName] = useState("");
    const [adding, setAdding] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    async function handleAdd(e: React.FormEvent) {
        e.preventDefault();
        const trimmed = newName.trim();
        if (!trimmed) return;

        const isDuplicate = categories.some(
            (c) => c.name.toLowerCase() === trimmed.toLowerCase()
        );
        if (isDuplicate) {
            toast.error("A category with that name already exists.");
            return;
        }

        setAdding(true);
        const { error } = await createCategory(trimmed);
        setAdding(false);

        if (error) {
            toast.error(error);
        } else {
            toast.success(`Category "${trimmed}" added`);
            setNewName("");
            router.refresh();
        }
    }

    async function handleDelete(category: BlogCategory) {
        if (
            !confirm(
                `Delete category "${category.name}"? Posts using it will lose their category tag.`
            )
        )
            return;

        setDeletingId(category.id);
        const { error } = await deleteCategory(category.id);
        setDeletingId(null);

        if (error) {
            toast.error(error);
        } else {
            toast.success(`Category "${category.name}" deleted`);
            router.refresh();
        }
    }

    return (
        <Sheet open onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto px-4">
                <SheetHeader>
                    <SheetTitle>Manage Categories</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    {/* Add new category */}
                    <form onSubmit={handleAdd} className="flex gap-2">
                        <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="New category name"
                            className="rounded-xl flex-1"
                            required
                        />
                        <Button
                            type="submit"
                            disabled={adding || !newName.trim()}
                            className="rounded-full bg-brand-navy text-brand-on-navy hover:bg-brand-navy/90 shrink-0"
                        >
                            <Plus className="size-4 mr-1" />
                            Add
                        </Button>
                    </form>

                    {/* Category list */}
                    {categories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
                            <Tag className="size-8 text-brand-muted/40 mb-2" />
                            <p className="text-sm text-brand-muted">No categories yet.</p>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {categories.map((cat) => (
                                <li
                                    key={cat.id}
                                    className="flex items-center justify-between rounded-xl border border-border bg-brand-surface px-4 py-3"
                                >
                                    <span className="text-sm font-medium text-brand-navy">
                                        {cat.name}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(cat)}
                                        disabled={deletingId === cat.id}
                                        className="text-destructive hover:text-destructive/70 transition-colors disabled:opacity-50"
                                        aria-label={`Delete ${cat.name}`}
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}

                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full rounded-full"
                    >
                        Done
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
