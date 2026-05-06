"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/lib/actions/profile";
import type { Profile } from "@/lib/supabase/types";

export function AdminProfileForm({ profile }: { profile: Profile }) {
    const [fullName, setFullName] = useState(profile.full_name ?? "");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const { error } = await updateProfile(profile.id, {
            full_name: fullName,
        });
        setLoading(false);
        if (error) {
            toast.error(error);
        } else {
            toast.success("Profile updated");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-brand-card p-6 space-y-4"
        >
            <div className="space-y-1.5">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                    id="full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="rounded-xl"
                />
            </div>

            <div className="space-y-1.5">
                <Label>Role</Label>
                <div className="inline-flex items-center rounded-full bg-brand-navy/10 px-3 py-1 text-sm font-medium text-brand-navy capitalize">
                    {profile.role === "super_admin" ? "Super Admin" : profile.role}
                </div>
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
