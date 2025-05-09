import { type SharedData, PaginationProps, Product } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import ProductItem from '@/components/ProductItem';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import MiniCartDropdown from '@/components/MiniCartDropdown';

export default function Dashboard() {
    const props = usePage<SharedData & { products: PaginationProps<Product>; cartTotal?: number; cartTotalPrice?: number }>().props;
    console.log('All props received:', props);

    const { auth, products, cartTotal = 0, cartTotalPrice = 0 } = props;

    // Detailed logging for debugging
    console.log('Products prop:', products);
    console.log('Products exists:', !!products);
    console.log('Products.data exists:', !!products?.data);
    console.log('Products.data length:', products?.data?.length);

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

    // Handle pagination
    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Dashboard">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@400;500;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="relative flex min-h-screen flex-col bg-[#1A1A2E] p-4 sm:p-6 text-[#E5E7EB] overflow-hidden">
                {/* Static Background Effect */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1A1A2E] to-[#2A2A40] opacity-80">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,212,255,0.1)_0%,_transparent_70%)]"></div>
                </div>

                <header className="w-full max-w-7xl mx-auto text-sm z-10 flex items-center justify-between bg-[#25253A] py-3 sm:py-4 px-4 sm:px-6 rounded-md">
                    {/* GETIT Logo */}
                    <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium font-['Inter'] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300">
                        <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md bg-[#00D4FF] shadow-[0_0_5px_#00D4FF]">
                            <AppLogoIcon className="size-9 fill-[#FFD700]" />
                        </div>
                        <span className="text-[#FFD700] font-['Orbitron'] text-base sm:text-lg">GETIT</span>
                    </Link>

                    {/* Header Navigation */}
                    <nav className="flex items-center justify-end gap-3 sm:gap-4">
                        {/* Cart Button with Dropdown */}
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
                                    <AvatarImage src={auth.user.avatar || ''} alt="User Avatar" />
                                    <AvatarFallback className="rounded-lg bg-[#A1A09A]/20 text-[#E5E7EB] font-['Inter']">
                                        {auth.user.name?.[0]?.toUpperCase() || 'G'}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-['Inter'] text-[#FFD700] text-sm sm:text-base">
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
                <main className="w-full max-w-7xl mx-auto mt-20 sm:mt-24 z-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-['Orbitron'] text-[#FFD700] mb-6">Featured Products</h1>
                    {products && products.data && products.data.length > 0 ? (
                        <>
                            {/* Product Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.data.map((product) => (
                                    <ProductItem key={product.id} product={product} setToast={setToastMessage} setShowToast={setShowToast} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center gap-2 mt-8">
                                <Button
                                    onClick={() => handlePageChange(products.prev_page_url)}
                                    disabled={!products.prev_page_url}
                                    className="px-4 py-2 bg-[#25253A] text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700] disabled:opacity-50"
                                >
                                    Previous
                                </Button>
                                <span className="px-4 py-2 bg-[#25253A] text-[#E5E7EB] font-['Inter']">
                                    Page {products.current_page} of {products.last_page}
                                </span>
                                <Button
                                    onClick={() => handlePageChange(products.next_page_url)}
                                    disabled={!products.next_page_url}
                                    className="px-4 py-2 bg-[#25253A] text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700] disabled:opacity-50"
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-[#E5E7EB] font-['Inter']">No products available.</p>
                    )}
                </main>

                {/* Fancy Toast Notification */}
                {showToast && (
                    <div className="fixed bottom-5 right-5 z-50 animate-slide-in-out">
                        <div className="bg-[#25253A] border border-[#00D4FF] text-[#E5E7EB] px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 transform transition-all duration-300 hover:shadow-2xl hover:scale-105">
                            <span className="text-sm font-['Inter']">{toastMessage}</span>
                            <span className="text-[#00D4FF] animate-pulse">●</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}