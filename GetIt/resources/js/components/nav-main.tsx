import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="text-[#FFD700] font-['Orbitron']">Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.href === page.url}
                            tooltip={{ children: item.title }}
                            className={item.href === page.url ? 'bg-[#00D4FF]/20 text-[#FFD700]' : 'text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700]'}
                        >
                            <Link href={item.href} prefetch className="font-['Inter']">
                                {item.icon && <item.icon className="h-5 w-5 text-[#A1A09A]" />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}