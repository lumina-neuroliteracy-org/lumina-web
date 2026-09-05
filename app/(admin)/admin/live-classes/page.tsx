import { getAllLiveClasses } from "@/lib/dal/live-classes";
import { getStudentProfiles } from "@/lib/dal/users";
import { AdminLiveClassesClient } from "./AdminLiveClassesClient";

export default async function AdminLiveClassesPage() {
    const [liveClasses, students] = await Promise.all([
        getAllLiveClasses(),
        getStudentProfiles(),
    ]);
    return <AdminLiveClassesClient liveClasses={liveClasses} students={students} />;
}
