import { requireAdmin } from "@/lib/dal/profile";
import { AdminProfileForm } from "./AdminProfileForm";

export default async function AdminProfilePage() {
    const profile = await requireAdmin();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">
                    Profile
                </h1>
                <p className="mt-1 text-sm text-brand-muted">
                    Update your display name
                </p>
            </div>
            <AdminProfileForm profile={profile} />
        </div>
    );
}
