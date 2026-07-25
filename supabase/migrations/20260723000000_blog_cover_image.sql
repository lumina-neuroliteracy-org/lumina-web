-- Add cover image to blog posts
alter table public.blog_posts
    add column if not exists cover_image_url text;

-- Storage bucket for blog cover images (public read)
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Anyone can read images
create policy "Public can view blog images"
    on storage.objects for select
    using (bucket_id = 'blog-images');

-- Admins can upload/replace images
create policy "Admins can upload blog images"
    on storage.objects for insert
    with check (
        bucket_id = 'blog-images'
        and exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role in ('admin', 'super_admin')
        )
    );

-- Admins can delete images
create policy "Admins can delete blog images"
    on storage.objects for delete
    using (
        bucket_id = 'blog-images'
        and exists (
            select 1 from public.profiles
            where id = auth.uid()
            and role in ('admin', 'super_admin')
        )
    );
