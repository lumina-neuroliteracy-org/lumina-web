import { notFound } from "next/navigation";
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/dal/blog";
import BlogPostHero from "@/components/blog/BlogPostHero";
import BlogPostBody from "@/components/blog/BlogPostBody";
import type { Metadata } from "next";

const BASE_URL = "https://www.lumina-literacy.ie";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    const url = `${BASE_URL}/blog/${slug}`;
    const images = post.cover_image_url
        ? [{ url: post.cover_image_url, alt: post.title }]
        : [];

    return {
        title: post.title,
        description: post.excerpt ?? undefined,
        keywords: post.category ? [post.category] : undefined,
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: "article",
            title: post.title,
            description: post.excerpt ?? undefined,
            url,
            images,
            publishedTime: post.publish_at ?? post.created_at,
            modifiedTime: post.updated_at,
            tags: post.category ? [post.category] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt ?? undefined,
            images: images.map((i) => i.url),
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const [post, related] = await Promise.all([
        getBlogPostBySlug(slug),
        getRelatedPosts(slug),
    ]);

    if (!post) notFound();

    const url = `${BASE_URL}/blog/${slug}`;
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt ?? undefined,
        url,
        datePublished: post.publish_at ?? post.created_at,
        dateModified: post.updated_at,
        ...(post.cover_image_url && { image: post.cover_image_url }),
        ...(post.category && { articleSection: post.category }),
        publisher: {
            "@type": "Organization",
            "@id": `${BASE_URL}/#organization`,
            name: "Lumina Neuro-Literacy Studio",
            logo: { "@type": "ImageObject", url: `${BASE_URL}/lumina-logo.png` },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <BlogPostHero post={post} />
            <BlogPostBody post={post} related={related} />
        </>
    );
}
