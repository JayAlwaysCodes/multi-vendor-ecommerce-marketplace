import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 bg-[#2A2A40] shadow-[0_0_10px_#00D4FF]">
                <div className="particle-bg" id="particles-js"></div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#00D4FF]/50 border-[#00D4FF] border shadow-[0_0_10px_#00D4FF] hover:shadow-[0_0_15px_#FFD700]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-[#FFD700]/30" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#00D4FF]/50 border-[#00D4FF] border shadow-[0_0_10px_#00D4FF] hover:shadow-[0_0_15px_#FFD700]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-[#FFD700]/30" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#00D4FF]/50 border-[#00D4FF] border shadow-[0_0_10px_#00D4FF] hover:shadow-[0_0_15px_#FFD700]">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-[#FFD700]/30" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl bg-[#1A1A2E] border-[#00D4FF] border shadow-[0_0_10px_#00D4FF] hover:shadow-[0_0_15px_#FFD700] md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-[#FFD700]/30" />
                </div>
            </div>
        </AppLayout>
    );
}