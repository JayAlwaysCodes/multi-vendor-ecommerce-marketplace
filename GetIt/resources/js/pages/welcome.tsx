import { type SharedData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    // State for wallet connection
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
    };

    const toggleCartDropdown = () => {
        setIsCartDropdownOpen((prev) => !prev);
    };

    // Handle wallet connection
    const handleWalletConnect = () => {
        setIsWalletConnected(true);
        alert('Web3 Wallet Connected!');
    };

    // Handle logout
    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Welcome to GETIT">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@400;500;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="relative flex min-h-screen flex-col bg-[#1A1A2E] p-6 text-[#E5E7EB] overflow-hidden">
                <div className="particle-bg absolute inset-0 z-0"></div>
                <header className="w-full max-w-[335px] lg:max-w-4xl mx-auto text-sm z-10 flex items-center justify-between">
                    {/* GETIT Logo */}
                    <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium font-['Inter'] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300">
                        <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-[#00D4FF] shadow-[0_0_5px_#00D4FF]">
                            <AppLogoIcon className="size-9 fill-[#FFD700]" />
                        </div>
                        <span className="text-[#FFD700] font-['Orbitron'] text-lg">GETIT</span>
                    </Link>

                    {/* Header Navigation */}
                    <nav className="flex items-center justify-end gap-4">
                        {/* Cart Button with Dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleCartDropdown}
                                className="relative inline-block rounded-sm border border-[#00D4FF] px-4 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {/* Dummy Cart Item Count Badge */}
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D4FF] text-xs font-['Inter'] text-[#FFD700] shadow-[0_0_5px_#00D4FF]">
                                    2
                                </span>
                            </button>

                            {isCartDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#2A2A40] shadow-[0_0_10px_#00D4FF] border border-[#00D4FF] z-20">
                                    <Link
                                        href="/cart/checkout"
                                        className="block px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700]"
                                    >
                                        Checkout
                                    </Link>
                                    <Link
                                        href="/cart/edit"
                                        className="block px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700]"
                                    >
                                        Edit Cart
                                    </Link>
                                </div>
                            )}
                        </div>

                        {auth.user ? (
                            <>
                                {/* Profile Avatar with Dropdown */}
                                <div className="relative">
                                    <button onClick={toggleProfileDropdown} className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                            <AvatarImage src="/path-to-user-image.jpg" alt="User Avatar" />
                                            <AvatarFallback className="rounded-lg bg-[#A1A09A]/20 text-[#E5E7EB] font-['Inter']">
                                                {auth.user.name?.[0]?.toUpperCase() || 'G'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-['Inter'] text-[#FFD700]">
                                            {auth.user.name || 'User'}
                                        </span>
                                    </button>

                                    {isProfileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#2A2A40] shadow-[0_0_10px_#00D4FF] border border-[#00D4FF] z-20">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700]"
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                href="/settings/profile"
                                                className="block px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700]"
                                            >
                                                Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700]"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Wallet Connect/Connected Button */}
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
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:border-[#00D4FF] hover:text-[#00D4FF] hover:shadow-[0_0_5px_#00D4FF] transition-all duration-300"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#00D4FF] px-5 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
                                >
                                    Register
                                </Link>
                                <Button
                                    onClick={handleWalletConnect}
                                    className="inline-block rounded-sm border border-[#00D4FF] px-5 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
                                >
                                    Connect Wallet
                                </Button>
                            </>
                        )}
                    </nav>
                </header>
            </div>
        </>
    );
}