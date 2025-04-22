import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    // State for wallet connection
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    // Handle wallet connection
    const handleWalletConnect = () => {
        setIsWalletConnected(true);
        alert('Web3 Wallet Connected!');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10 bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1B]">
            <div className="particle-bg" id="particles-js"></div>
            <div className="w-full max-w-sm flex items-center justify-between mb-4">
                <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium font-['Inter'] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300">
                    <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-[#00D4FF] shadow-[0_0_5px_#00D4FF]">
                        <AppLogoIcon className="size-9 fill-[#FFD700]" />
                    </div>
                    <span className="sr-only">{title}</span>
                </Link>
                <div className="flex items-center gap-3">
                    <Link
                        href="/cart"
                        className="inline-block rounded-sm border border-[#00D4FF] px-4 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
                    >
                        <ShoppingCart className="h-5 w-5" />
                    </Link>
                    <Button
                        onClick={isWalletConnected ? undefined : handleWalletConnect}
                        className={`inline-block rounded-sm px-5 py-1.5 text-sm font-['Inter'] transition-all duration-300 ${
                            isWalletConnected
                                ? 'bg-[#00D4FF]/20 text-[#00D4FF] cursor-default'
                                : 'border border-[#00D4FF] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700]'
                        }`}
                    >
                        {isWalletConnected ? 'Connected' : 'Connect Wallet'}
                    </Button>
                </div>
            </div>
            <div className="w-full max-w-sm bg-[#2A2A40] p-8 rounded-lg shadow-[0_0_10px_#00D4FF,0_0_20px_#00D4FF]">
                <div className="flex flex-col gap-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-xl font-medium font-['Orbitron'] text-[#FFD700]">{title}</h1>
                        <p className="text-sm text-[#A1A09A] font-['Inter']">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}