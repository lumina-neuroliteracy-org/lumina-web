import { getAllLiveClasses } from "@/lib/dal/live-classes";
import { AdminLiveClassesClient } from "./AdminLiveClassesClient";

export default async function AdminLiveClassesPage() {
    const liveClasses = await getAllLiveClasses();
    return <AdminLiveClassesClient liveClasses={liveClasses} />;
}
