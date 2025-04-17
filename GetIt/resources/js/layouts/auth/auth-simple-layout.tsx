import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10 bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1B]">
            <div className="particle-bg" id="particles-js"></div>
            <div className="w-full max-w-sm bg-[#2A2A40] p-8 rounded-lg shadow-[0_0_10px_#00D4FF,0_0_20px_#8B00FF]">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium font-['Inter'] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-[#00D4FF] shadow-[0_0_5px_#00D4FF]">
                                <AppLogoIcon className="size-9 fill-current text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium font-['Orbitron'] text-[#FFD700]">{title}</h1>
                            <p className="text-sm text-gray-400 font-['Inter']">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}