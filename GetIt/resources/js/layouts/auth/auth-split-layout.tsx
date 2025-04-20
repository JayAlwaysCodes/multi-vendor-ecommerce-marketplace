import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0 bg-[#1A1A2E]">
            <div className="relative hidden h-full flex-col p-10 text-[#E5E7EB] lg:flex border-r border-[#00D4FF]/50">
                <div className="absolute inset-0 bg-[#2A2A40]" />
                <Link href={route('home')} className="relative z-20 flex items-center text-lg font-medium font-['Orbitron'] text-[#FFD700] hover:text-[#FFD700] hover:shadow-[0_0_5px_#00D4FF]">
                    <AppLogoIcon className="mr-2 size-8 fill-[#FFD700]" />
                    {name}
                </Link>
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg font-['Inter'] text-[#E5E7EB]">“{quote.message}”</p>
                            <footer className="text-sm text-[#A1A09A] font-['Inter']">{quote.author}</footer>
                        </blockquote>
                    </div>
                )}
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-[#FFD700] sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium font-['Orbitron'] text-[#FFD700]">{title}</h1>
                        <p className="text-[#A1A09A] text-sm text-balance font-['Inter']">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}