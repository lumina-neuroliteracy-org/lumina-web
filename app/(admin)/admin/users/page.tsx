import { requireAdmin } from "@/lib/dal/profile";
import { getAllProfiles } from "@/lib/dal/users";
import { AdminUsersClient } from "./AdminUsersClient";

export default async function AdminUsersPage() {
    const [currentProfile, profiles] = await Promise.all([
        requireAdmin(),
        getAllProfiles(),
    ]);

    return (
        <AdminUsersClient
            profiles={profiles}
            isSuperAdmin={currentProfile.role === "super_admin"}
        />
    );
}
