import type { MetadataRoute } from "next";

const BASE_URL = "https://www.lumina-literacy.ie";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/student/",
        "/login",
        "/signup",
        "/forgot-password",
        "/update-password",
        "/coming-soon",
        "/auth/",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
