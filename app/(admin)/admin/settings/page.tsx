import { requireAdmin } from "@/lib/dal/profile";
import { getSetting } from "@/lib/dal/settings";
import { SiteSettingsForm } from "./SiteSettingsForm";

const FALLBACK_YOUTUBE_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

export default async function AdminSettingsPage() {
    await requireAdmin();
    const youtubeUrl = (await getSetting("homepage_youtube_url")) ?? FALLBACK_YOUTUBE_URL;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-brand-navy">Site Settings</h1>
                <p className="mt-1 text-sm text-brand-muted">
                    Manage homepage and global configuration
                </p>
            </div>
            <SiteSettingsForm youtubeUrl={youtubeUrl} />
        </div>
    );
}
