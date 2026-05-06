import { getAllEvents } from "@/lib/dal/events";
import { AdminEventsClient } from "./AdminEventsClient";

export default async function AdminEventsPage() {
    const events = await getAllEvents();
    return <AdminEventsClient events={events} />;
}
