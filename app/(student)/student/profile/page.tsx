import { requireAuth } from "@/lib/dal/profile";
import { StudentProfileForm } from "./StudentProfileForm";

export default async function StudentProfilePage() {
    const profile = await requireAuth();
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">
                    Profile
                </h1>
                <p className="mt-1 text-sm text-brand-muted">
                    Manage your account details
                </p>
            </div>
            <div className="max-w-md">
                <StudentProfileForm profile={profile} />
            </div>
        </div>
    );
}
