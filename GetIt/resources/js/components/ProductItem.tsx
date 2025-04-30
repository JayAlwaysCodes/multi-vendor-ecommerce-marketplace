import React from 'react';
import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import CurrencyFormatter from './CurrencyFormatter';

function ProductItem({ product }: { product: Product }) {
    return (
        <div className="bg-[#25253A] rounded-md shadow-[0_0_10px_#00D4FF] overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_#FFD700]">
            {/* Product Image */}
            <Link href={route('product.show', product.slug)}>
                <div className="relative w-full aspect-square">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            {/* Product Details */}
            <div className="p-4">
                <h2 className="text-lg font-['Orbitron'] text-[#FFD700] truncate">{product.title}</h2>
                <p className="text-sm text-[#E5E7EB] font-['Inter'] mt-1">
                    by{' '}
                    <Link href={`/user/${product.user.id}`} className="text-[#00D4FF] hover:underline">
                        {product.user.name}
                    </Link>{' '}
                    in{' '}
                    <Link href={`/department/${product.department.id}`} className="text-[#00D4FF] hover:underline">
                        {product.department.name}
                    </Link>
                </p>
                <div className="flex items-center justify-between mt-3">
                    <Button
                        className="bg-[#00D4FF] text-[#1A1A2E] font-['Inter'] hover:bg-[#FFD700] hover:text-[#1A1A2E] transition-all duration-300"
                        onClick={() => alert('Added to cart!')} // Placeholder for cart functionality
                    >
                        Add to Cart
                    </Button>
                    <span className="text-xl font-['Inter'] text-[#FFD700]">
                        <CurrencyFormatter amount={product.price}  />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;