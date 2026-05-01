import { getAllResources } from "@/lib/dal/resources";
import { AdminResourcesClient } from "./AdminResourcesClient";

export default async function AdminResourcesPage() {
    const resources = await getAllResources();
    return <AdminResourcesClient resources={resources} />;
}
