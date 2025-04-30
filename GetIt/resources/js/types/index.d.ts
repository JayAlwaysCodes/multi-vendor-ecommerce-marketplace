import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type Image = {
    id: number;
    thumb:string;
    small:string;
    large:string;
}

export type VariationTypeOption = {
    id: number;
    name: string;
    images: Image[];
    type: VariationType;
}

export type VariationType = {
    id: number;
    name: string;
    type: 'select' | 'radio' | 'image';
    options: VariationTypeOption[]
}

export type Product = {
    id: number;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    image: string;
    images: Image[];
    short_description: string;
    user: {
        id: number;
        name: string;
    };
    department: {
        id: number;
        name: string;
    };
    description?: string;
    images?: Array<{
        id: number;
        url: string;
        thumb: string;
    }>;
    variationTypes: VariationType[],
    variations: Array<{
        id: number;
        variation_type_option_ids: number[];
        quantity: number;
        price: number;
    }>
    // variation_types?: Array<{
    //     id: number;
    //     name: string;
    //     options: Array<{
    //         id: number;
    //         name: string;
    //     }>;
    // }>;
    // variations?: Array<{
    //     id: number;
    //     variation_type_option_ids: number[];
    //     quantity: number;
    //     price: number;
    // }>;
}

export type PaginationProps<T> = {
    data: Array<T>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}