import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CreditCardIcon } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import MiniCartDropdown from '@/components/MiniCartDropdown';
import CartItem from '@/components/CartItem';
import { type SharedData, type GroupedCartItem } from '@/types';

export default function Index() {
    const { props } = usePage<
        SharedData & { cartItems: Record<number, GroupedCartItem> }
    >();
    const {
        auth,
        cartItems = {},
        totalQuantity = 0,
        totalPrice = 0,
        csrf_token,
    } = props;

    // State for wallet connection, dropdowns, and toast
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isCartDropdownVisible, setIsCartDropdownVisible] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Toggle dropdown visibility for profile
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
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
            <Head title="Your Cart">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@400;500;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="relative flex min-h-screen flex-col bg-[#1A1A2E] p-4 sm:p-6 text-[#E5E7EB] overflow-hidden">
                {/* Static Background Effect */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1A1A2E] to-[#2A2A40] opacity-80">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,212,255,0.1)_0%,_transparent_70%)]"></div>
                </div>

                <header className="w-full max-w-7xl mx-auto text-sm z-20 flex items-center justify-between bg-[#25253A] py-3 sm:py-4 px-4 sm:px-6 rounded-md">
                    {/* GETIT Logo */}
                    <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium font-['Inter'] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300">
                        <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-[#00D4FF] shadow-[0_0_5px_#00D4FF]">
                            <AppLogoIcon className="size-9 fill-[#FFD700]" />
                        </div>
                        <span className="text-[#FFD700] font-['Orbitron'] text-base sm:text-lg">GETIT</span>
                    </Link>

                    {/* Header Navigation */}
                    <nav className="flex items-center justify-end gap-3 sm:gap-4">
                        {/* Cart Button with Dropdown using MiniCartDropdown */}
                        <MiniCartDropdown
                            isVisible={isCartDropdownVisible}
                            onMouseEnter={() => setIsCartDropdownVisible(true)}
                            onMouseLeave={() => setIsCartDropdownVisible(false)}
                        />

                        {/* Profile Avatar with Dropdown */}
                        <div className="relative">
                            <button onClick={toggleProfileDropdown} className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                    <AvatarImage src={auth.user?.avatar || ''} alt="User Avatar" />
                                    <AvatarFallback className="rounded-lg bg-[#A1A09A]/20 text-[#E5E7EB] font-['Inter']">
                                        {auth.user?.name?.[0]?.toUpperCase() || 'G'}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-['Inter'] text-[#FFD700] text-sm sm:text-base">
                                    {auth.user?.name || 'User'}
                                </span>
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md bg-[#2A2A40] shadow-[0_0_10px_#00D4FF] border border-[#00D4FF] z-30">
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
                            className={`inline-block rounded-sm px-4 sm:px-5 py-1.5 text-sm font-['Inter'] transition-all duration-300 ${
                                isWalletConnected
                                    ? 'bg-[#00D4FF]/20 text-[#00D4FF] cursor-default'
                                    : 'border border-[#00D4FF] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700]'
                            }`}
                        >
                            {isWalletConnected ? 'Connected' : 'Connect Wallet'}
                        </Button>
                    </nav>
                </header>

                {/* Main Content */}
                <main className="w-full max-w-7xl mx-auto mt-6 sm:mt-8 z-10">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-['Orbitron'] text-[#FFD700] mb-4">Your Cart</h1>
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                        {/* Cart Items */}
                        <div className="flex-1 bg-[#25253A] rounded-md shadow-[0_0_10px_#00D4FF] border border-[#00D4FF]/20 p-4 sm:p-6 order-2 lg:order-1">
                            <h3 className="text-lg sm:text-xl font-['Orbitron'] text-[#FFD700] mb-4">Shopping Cart</h3>
                            <div className="my-2 sm:my-4">
                                {Object.keys(cartItems).length === 0 ? (
                                    <div className="py-2 text-[#A1A09A] text-center font-['Inter'] text-sm">
                                        You don't have any items in your cart.
                                    </div>
                                ) : (
                                    Object.values(cartItems).map((cartItem) => (
                                        <div key={cartItem.user.id}>
                                            <div className="flex items-center justify-between pb-2 sm:pb-4 border-b border-[#00D4FF]/20 mb-2 sm:mb-4">
                                                <Link href="/" className="text-sm sm:text-base font-['Inter'] text-[#E5E7EB] hover:text-[#FFD700] underline">
                                                    {cartItem.user.name}
                                                </Link>
                                                <div>
                                                    <button
                                                        className="inline-flex items-center gap-2 rounded-sm border border-[#00D4FF] px-2 sm:px-3 py-1 text-xs sm:text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
                                                        disabled
                                                    >
                                                        <CreditCardIcon className="size-4 sm:size-5" />
                                                        Pay only for this vendor
                                                    </button>
                                                </div>
                                            </div>
                                            {cartItem.items.map((item) => (
                                                <CartItem item={item} key={item.id} />
                                            ))}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div className="bg-[#25253A] rounded-md shadow-[0_0_10px_#00D4FF] border border-[#00D4FF]/20 p-4 sm:p-6 lg:min-w-[260px] order-1 lg:order-2">
                            <div className="text-sm sm:text-base font-['Inter'] text-[#E5E7EB] mb-4">
                                Total ({totalQuantity} items): <CurrencyFormatter amount={totalPrice} />
                            </div>
                            <button
                                className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#00D4FF] text-[#1A1A2E] font-['Inter'] py-2 sm:py-3 text-sm sm:text-base hover:bg-[#FFD700] hover:text-[#1A1A2E] transition-all duration-300"
                                disabled
                            >
                                <CreditCardIcon className="size-5 sm:size-6" />
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </main>

                {/* Fancy Toast Notification */}
                {showToast && (
                    <div className="fixed bottom-5 right-5 z-40 animate-slide-in-out">
                        <div className="bg-[#25253A] border border-[#00D4FF] text-[#E5E7EB] px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg flex items-center space-x-2 sm:space-x-3 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
                            <span className="text-sm font-['Inter']">{toastMessage}</span>
                            <span className="text-[#00D4FF] animate-pulse">●</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}