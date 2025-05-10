import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import { type SharedData, type CartItem } from '@/types';

interface MiniCartDropdownProps {
    isVisible: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

function MiniCartDropdown({ isVisible, onMouseEnter, onMouseLeave }: MiniCartDropdownProps) {
    const { cartTotal = 0, cartTotalPrice = 0, cartItems = [] } = usePage<
        SharedData & { cartTotal?: number; cartTotalPrice?: number; cartItems?: CartItem[] }
    >().props;

    const handleClearCart = () => {
        router.post(route('cart.clear'), {}, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                console.log('Cart cleared successfully');
            },
            onError: (err) => {
                console.error('Error clearing cart:', err);
            },
        });
    };

    return (
        <div
            className="relative"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {/* Cart Icon with Badge */}
            <button className="relative inline-block rounded-sm border border-[#00D4FF] px-3 sm:px-4 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300">
                <ShoppingCart className="h-5 w-5" />
                {cartTotal > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#00D4FF] text-xs font-['Inter'] text-[#FFD700] shadow-[0_0_5px_#00D4FF]">
                        {cartTotal}
                    </span>
                )}
            </button>

            {/* Dropdown Content */}
            {isVisible && (
                <div className="absolute right-0 mt-2 w-48 sm:w-64 rounded-md bg-[#2A2A40] shadow-[0_0_10px_#00D4FF] border border-[#00D4FF] z-20">
                    <div className="px-4 py-2 border-b border-[#00D4FF]/20">
                        <div className="text-sm text-[#E5E7EB] font-['Inter']">
                            Total: <CurrencyFormatter amount={cartTotalPrice} />
                        </div>
                    </div>
                    <div className="my-2 sm:my-4 max-h-[200px] sm:max-h-[300px] overflow-auto">
                        {cartItems.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-[#E5E7EB] font-['Inter']">
                                Your cart is empty.
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-2 sm:gap-4 p-2 sm:p-3 border-b border-[#00D4FF]/10">
                                    <Link href={route('product.show', item.slug)}>
                                        <img
                                            src={item.image || '/placeholder-image.png'}
                                            alt={item.title}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                                        />
                                    </Link>
                                    <div className="flex-1">
                                        <h4 className="mb-1 sm:mb-3 text-sm font-semibold text-[#E5E7EB] font-['Inter'] truncate">
                                            <Link href={route('product.show', item.slug)}>
                                                {item.title}
                                            </Link>
                                        </h4>
                                        <div className="flex justify-between text-xs sm:text-sm text-[#A1A09A] font-['Inter']">
                                            <div>Quantity: {item.quantity}</div>
                                            <div>
                                                <CurrencyFormatter amount={item.quantity * item.price} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {cartTotal > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="block w-full text-left px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] bg-[#FF5555]/20 hover:bg-[#FF5555]/40 transition-all duration-300"
                        >
                            Clear Cart
                        </button>
                    )}
                    <Link
                        href="/cart/checkout"
                        className="block px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700]"
                    >
                        Checkout
                    </Link>
                    <Link
                        href={route('cart.index')}
                        className="block px-4 py-2 text-sm text-[#E5E7EB] font-['Inter'] hover:bg-[#FFD700]/20 hover:text-[#FFD700]"
                    >
                        Edit Cart
                    </Link>
                </div>
            )}
        </div>
    );
}

export default MiniCartDropdown;