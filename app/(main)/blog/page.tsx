import type { Metadata } from "next";
import { getAllPublishedPosts, getFeaturedPost } from "@/lib/dal/blog";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
    title: "Dyslexia Blog",
    description:
        "Practical insights on dyslexia, structured literacy, and supporting every learner to thrive.",
    alternates: {
        canonical: "https://www.lumina-literacy.ie/blog",
    },
    openGraph: {
        type: "website",
        title: "Dyslexia Blog | Lumina Neuro-Literacy Studio",
        description:
            "Practical insights on dyslexia, structured literacy, and supporting every learner to thrive.",
        url: "https://www.lumina-literacy.ie/blog",
    },
};

export default async function BlogPage() {
    const [posts, featured] = await Promise.all([
        getAllPublishedPosts(),
        getFeaturedPost(),
    ]);

    return (
        <>
            <BlogHero />
            <BlogGrid posts={posts} featured={featured} />
        </>
    );
}
