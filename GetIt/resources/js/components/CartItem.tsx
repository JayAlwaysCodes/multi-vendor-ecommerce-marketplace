import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import { CartItem as CartItemType } from '@/types';
import TextInput from '@/components/TextInput';
import CurrencyFormatter from '@/components/CurrencyFormatter';
import { productRoute } from '@/helpers';

function CartItem({ item }: { item: CartItemType }) {
    const deleteForm = useForm({
        option_ids: item.option_ids,
    });

    const [error, setError] = useState('');

    const onDeleteClick = () => {
        deleteForm.delete(route('cart.destroy', item.product_id), {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Item removed from cart successfully');
            },
            onError: (err) => {
                console.error('Error removing item:', err);
            },
        });
    };

    const handleQuantityChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        const newQuantity = parseInt(ev.target.value) || 1;
        router.put(
            route('cart.update', item.product_id),
            {
                quantity: newQuantity,
                option_ids: item.option_ids,
            },
            {
                preserveScroll: true,
                onError: (errors) => {
                    setError(Object.values(errors)[0] || 'Error updating quantity');
                },
            }
        );
    };

    return (
        <>
            <div key={item.id} className="flex gap-4 sm:gap-6 p-2 sm:p-3">
                <Link href={productRoute(item)} className="w-24 sm:w-32 min-w-24 sm:min-w-32 min-h-24 sm:min-h-32 flex justify-center self-start">
                    <img
                        src={item.image || '/placeholder-image.png'}
                        alt={item.title}
                        className="max-w-full max-h-full object-cover rounded hover:opacity-80 transition-opacity duration-300"
                    />
                </Link>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <h3 className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold text-[#E5E7EB] font-['Inter']">
                            <Link href={productRoute(item)} className="hover:text-[#FFD700]">
                                {item.title}
                            </Link>
                        </h3>
                        <div className="text-xs sm:text-sm text-[#A1A09A] font-['Inter']">
                            {item.options.map((option) => (
                                <div key={option.id}>
                                    <strong className="font-semibold text-[#E5E7EB]">{option.type.name}:</strong> {option.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 sm:mt-4">
                        <div className="flex gap-2 sm:gap-3 items-center">
                            <div className="text-xs sm:text-sm font-['Inter'] text-[#E5E7EB]">Quantity:</div>
                            <div className={error ? 'relative' : ''}>
                                <TextInput
                                    type="number"
                                    defaultValue={item.quantity}
                                    onBlur={handleQuantityChange}
                                    className="w-12 sm:w-16"
                                    min="1"
                                />
                                {error && (
                                    <div className="absolute top-full mt-1 text-xs text-[#FF5555] font-['Inter']">
                                        {error}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={onDeleteClick}
                                className="inline-flex items-center rounded-sm border border-[#FF5555]/50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FF5555]/20 hover:text-[#FF5555] transition-all duration-300"
                            >
                                Delete
                            </button>
                            <button
                                className="inline-flex items-center rounded-sm border border-[#00D4FF]/50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-all duration-300"
                                disabled
                            >
                                Save for Later
                            </button>
                        </div>
                        <div className="text-sm sm:text-base font-['Inter'] text-[#E5E7EB]">
                            <CurrencyFormatter amount={item.quantity * item.price} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-px bg-[#00D4FF]/20 my-2 sm:my-4"></div>
        </>
    );
}

export default CartItem;