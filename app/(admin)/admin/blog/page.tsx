import { getAllBlogPosts, getAllCategories } from "@/lib/dal/blog";
import { AdminBlogClient } from "./AdminBlogClient";

export default async function AdminBlogPage() {
    const [posts, categories] = await Promise.all([
        getAllBlogPosts(),
        getAllCategories(),
    ]);
    return <AdminBlogClient posts={posts} categories={categories} />;
}
