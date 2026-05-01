"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setUserRole } from "@/lib/actions/users";
import type { Role, UserListEntry } from "@/lib/supabase/types";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", { dateStyle: "medium" });
}

const roleBadge: Record<Role, string> = {
    student: "bg-brand-gold-soft text-brand-on-gold",
    admin: "bg-brand-navy/10 text-brand-navy",
    super_admin: "bg-brand-navy text-brand-on-navy",
};

export function AdminUsersClient({
    profiles,
    isSuperAdmin,
}: {
    profiles: UserListEntry[];
    isSuperAdmin: boolean;
}) {
    const router = useRouter();
    const [pending, setPending] = useState<string | null>(null);

    async function handleRoleChange(
        id: string,
        currentRole: Role
    ) {
        const newRole =
            currentRole === "student" ? "admin" : "student";
        setPending(id);
        await setUserRole(id, newRole);
        setPending(null);
        router.refresh();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">
                    Users
                </h1>
                <p className="mt-1 text-sm text-brand-muted">
                    {profiles.length} registered{" "}
                    {profiles.length === 1 ? "user" : "users"}
                    {isSuperAdmin && (
                        <span className="ml-2 text-brand-muted/60">
                            — you can promote or demote students and admins
                        </span>
                    )}
                </p>
            </div>

            {profiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-brand-card py-16 text-center">
                    <Users className="size-10 text-brand-muted/50 mb-3" />
                    <p className="text-sm text-brand-muted">
                        No users registered yet.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border border-border bg-brand-card">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-brand-surface">
                                <th className="px-4 py-3 text-left font-medium text-brand-muted">
                                    Name
                                </th>
                                <th className="px-4 py-3 text-left font-medium text-brand-muted">
                                    Role
                                </th>
                                <th className="px-4 py-3 text-left font-medium text-brand-muted">
                                    Joined
                                </th>
                                {isSuperAdmin && (
                                    <th className="px-4 py-3 text-left font-medium text-brand-muted">
                                        Actions
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {profiles.map((p) => (
                                <tr
                                    key={p.id}
                                    className="hover:bg-brand-surface/50 transition-colors"
                                >
                                    <td className="px-4 py-3 font-medium text-brand-navy">
                                        {p.full_name ?? (
                                            <span className="text-brand-muted italic">
                                                No name
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${roleBadge[p.role]}`}
                                        >
                                            {p.role === "super_admin"
                                                ? "Super Admin"
                                                : p.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-brand-muted">
                                        {formatDate(p.created_at)}
                                    </td>
                                    {isSuperAdmin && (
                                        <td className="px-4 py-3">
                                            {p.role !== "super_admin" ? (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={pending === p.id}
                                                    onClick={() =>
                                                        handleRoleChange(
                                                            p.id,
                                                            p.role
                                                        )
                                                    }
                                                    className="rounded-full text-xs"
                                                >
                                                    {pending === p.id
                                                        ? "Saving…"
                                                        : p.role === "student"
                                                          ? "Promote to Admin"
                                                          : "Demote to Student"}
                                                </Button>
                                            ) : (
                                                <span className="text-xs text-brand-muted italic">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
