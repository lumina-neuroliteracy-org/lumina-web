import { getAllResources } from "@/lib/dal/resources";
import { getStudentProfiles } from "@/lib/dal/users";
import { AdminResourcesClient } from "./AdminResourcesClient";

export default async function AdminResourcesPage() {
    const [resources, students] = await Promise.all([
        getAllResources(),
        getStudentProfiles(),
    ]);
    return <AdminResourcesClient resources={resources} students={students} />;
}
