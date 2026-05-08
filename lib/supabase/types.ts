export type Role = "student" | "admin" | "super_admin";

export interface Profile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: Role;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface LiveClass {
    id: string;
    title: string;
    description: string | null;
    join_url: string;
    scheduled_at: string;
    created_by: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Resource {
    id: string;
    title: string;
    description: string | null;
    file_url: string;
    file_type: string;
    created_by: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export type EventType = "webinar" | "seminar" | "event";

export interface Event {
    id: string;
    title: string;
    description: string | null;
    type: EventType;
    date: string;
    href: string | null;
    banner_image_url: string | null;
    is_published: boolean;
    created_by: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserListEntry {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: Role;
    is_active: boolean;
    email: string | null;
    created_at: string;
}

export interface SiteSetting {
    key: string;
    value: string;
    updated_at: string;
}
