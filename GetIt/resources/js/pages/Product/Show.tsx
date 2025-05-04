import CurrencyFormatter from '@/components/CurrencyFormatter';
import { arraysAreEqual } from '@/helpers';
import { type SharedData, Product, VariationTypeOption, Image } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

export default function Show() {
    const props = usePage<SharedData & { product: { product: Product }; variationOptions: number[] }>().props;
    console.log('All props received in Show:', props);

    // Extract the inner product from the wrapped object
    const productData = props.product.product;
    const { variationOptions, auth } = props;

    // Log product and variationOptions for debugging
    console.log('Product data:', productData);
    console.log('Product exists:', !!productData);
    console.log('VariationOptions prop:', variationOptions);
    console.log('Product variationTypes:', productData?.variationTypes);
    console.log('Product variations:', productData?.variations);
    console.log('Product images:', productData?.images);

    const form = useForm<{
        option_ids: Record<string, number>;
        quantity: number;
        price: number | null;
    }>({
        option_ids: {},
        quantity: 1,
        price: null
    });

    const { url } = usePage();
    
    const [selectedOptions, setSelectedOptions] = useState<Record<number, VariationTypeOption>>([]);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

    const images = useMemo(() => {
        console.log('Computing images, selectedOptions:', selectedOptions);
        for (let typeId in selectedOptions) {
            const option = selectedOptions[typeId];
            if (option?.images?.length > 0) return option.images;
        }
        return productData?.images || [];
    }, [productData, selectedOptions]);

    // State to track the selected image for the large display
    const [selectedImage, setSelectedImage] = useState<Image | null>(images.length > 0 ? images[0] : null);

    // Update selectedImage when images change (e.g., due to variation selection)
    useEffect(() => {
        setSelectedImage(images.length > 0 ? images[0] : null);
    }, [images]);

    const computedProduct = useMemo(() => {
        console.log('Computing computedProduct, selectedOptions:', selectedOptions);
        const selectedOptionIds = Object.values(selectedOptions).map(op => op.id).sort();

        const variations = Array.isArray(productData?.variations) ? productData.variations : [];
        for (let variation of variations) {
            const optionIds = variation.variation_type_option_ids.sort();

            if (arraysAreEqual(selectedOptionIds, optionIds)) {
                console.log('Matched variation with price:', variation.price);
                return {
                    price: variation.price,
                    quantity: variation.quantity === null ? Number.MAX_VALUE : variation.quantity,
                };
            }
        }
        console.log('No variation matched, falling back to product defaults with price:', productData?.price);
        return {
            price: productData?.price ?? 0,
            quantity: productData?.quantity ?? 1
        };
    }, [productData, selectedOptions]);

    useEffect(() => {
        if (!productData || !Array.isArray(productData.variationTypes)) {
            console.log('Skipping useEffect: productData or variationTypes is invalid', { productData, variationTypes: productData?.variationTypes });
            return;
        }

        for (let type of productData.variationTypes) {
            if (!Array.isArray(type.options) || type.options.length === 0) {
                console.log(`No options available for variation type ${type.id}`);
                continue;
            }

            const selectedOptionId: number = variationOptions[type.id];
            const defaultOption = type.options.find(op => op.id == selectedOptionId) || type.options[0];
            console.log('Selecting option for type:', type.id, 'with option ID:', selectedOptionId, 'defaulting to:', defaultOption);
            if (defaultOption) {
                chooseOption(type.id, defaultOption, false);
            }
        }
    }, [productData, variationOptions]);

    const getOptionIdsMap = (newOptions: object) => {
        return Object.fromEntries(
            Object.entries(newOptions).map(([a, b]) => [a, (b as VariationTypeOption).id])
        );
    };

    const chooseOption = (
        typeId: number,
        option: VariationTypeOption,
        updateRouter: boolean = true
    ) => {
        setSelectedOptions((prevSelectedOptions) => {
            const newOptions = {
                ...prevSelectedOptions,
                [typeId]: option,
            };

            if (updateRouter) {
                router.get(url, {
                    options: getOptionIdsMap(newOptions),
                }, {
                    preserveScroll: true,
                    preserveState: true,
                });
            }
            return newOptions;
        });
    };

    const onQuantityChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        form.setData('quantity', parseInt(ev.target.value));
    };

    const addToCart = () => {
        form.post(route('cart.store', productData.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log('Add to cart error:', err);
            }
        });
    };

    const renderProductVariationTypes = () => {
        if (!Array.isArray(productData.variationTypes)) {
            console.log('variationTypes is not an array:', productData.variationTypes);
            return null;
        }

        return (
            productData.variationTypes.map((type, i) => (
                <div key={type.id}>
                    <b>{type.name}</b>
                    {type.type.toLowerCase() === 'image' && 
                        <div className="flex gap-2 mb-4">
                            {type.options.map(option => (
                                <div onClick={() => chooseOption(type.id, option)} key={option.id}>
                                    {option.images && option.images.length > 0 ? (
                                        <img
                                            src={option.images[0].thumb}
                                            alt={option.name}
                                            className={`w-[50px] ${selectedOptions[type.id]?.id === option.id ? 'outline outline-4 outline-[#00D4FF]' : ''}`}
                                        />
                                    ) : (
                                        <div
                                            className={`w-[50px] h-[50px] bg-[#25253A] flex items-center justify-center text-[#E5E7EB] text-sm ${selectedOptions[type.id]?.id === option.id ? 'outline outline-4 outline-[#00D4FF]' : ''}`}
                                        >
                                            {option.name}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    }
                    {type.type.toLowerCase() === 'radio' && 
                        <div className="flex gap-2 mb-4">
                            {type.options.map(option => (
                                <button
                                    onClick={() => chooseOption(type.id, option)}
                                    key={option.id}
                                    className={`btn ${selectedOptions[type.id]?.id === option.id ? 'bg-[#00D4FF] text-[#1A1A2E]' : 'bg-[#25253A] text-[#E5E7EB]'} border-[#00D4FF] hover:bg-[#FFD700]/20 hover:text-[#FFD700] transition-all duration-300`}
                                >
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    }
                </div>
            ))
        );
    };

    const renderAddToCartButton = () => {
        const availableQuantity = Math.max(1, Math.min(10, computedProduct.quantity || 1));

        return (
            <div className="mb-8 flex gap-4">
                <select
                    value={form.data.quantity}
                    onChange={onQuantityChange}
                    className="select select-bordered w-full bg-[#25253A] text-[#E5E7EB] border-[#00D4FF]"
                >
                    {Array.from({ length: availableQuantity }).map((_, i) => (
                        <option value={i + 1} key={i + 1}>Quantity: {i + 1}</option>
                    ))}
                </select>
                <button
                    onClick={addToCart}
                    className="btn bg-[#00D4FF] text-[#1A1A2E] font-['Inter'] hover:bg-[#FFD700] hover:text-[#1A1A2E] transition-all duration-300"
                >
                    Add to Cart
                </button>
            </div>
        );
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen((prev) => !prev);
    };

    const toggleCartDropdown = () => {
        setIsCartDropdownOpen((prev) => !prev);
    };

    const handleWalletConnect = () => {
        setIsWalletConnected(true);
        alert('Web3 Wallet Connected!');
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    useEffect(() => {
        const idsMap = Object.fromEntries(
            Object.entries(selectedOptions).map(([typeId, option]: [string, VariationTypeOption]) => [typeId, option.id])
        );
        console.log('Updated option_ids:', idsMap);
        form.setData('option_ids', idsMap);
    }, [selectedOptions]);

    if (!productData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#1A1A2E] text-[#E5E7EB] font-['Inter']">
                <p>Product not found.</p>
            </div>
        );
    }

    return (
        <>
            <Head title={productData.title || 'Product Details'}>
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
                        <div className="relative">
                            <button
                                onClick={toggleCartDropdown}
                                className="relative inline-block rounded-sm border border-[#00D4FF] px-3 sm:px-4 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
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

                <main className="w-full max-w-7xl mx-auto mt-20 sm:mt-24 z-10">
                    <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
                        <div className="col-span-7">
                            {/* Large Image Display */}
                            {selectedImage ? (
                                <div className="w-full h-96 bg-[#25253A] rounded-md flex items-center justify-center mb-4">
                                    <img
                                        src={selectedImage.large}
                                        alt="Selected product image"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-96 bg-[#25253A] rounded-md flex items-center justify-center mb-4">
                                    <p className="text-[#E5E7EB] font-['Inter']">No images available</p>
                                </div>
                            )}

                            {/* Thumbnails */}
                            {images.length > 0 && (
                                <div className="flex gap-4 justify-center">
                                    {images.slice(0, 3).map((image) => (
                                        <div
                                            key={image.id}
                                            onClick={() => setSelectedImage(image)}
                                            className={`w-24 h-24 bg-[#25253A] rounded-md flex items-center justify-center cursor-pointer ${
                                                selectedImage?.id === image.id ? 'outline outline-4 outline-[#00D4FF]' : ''
                                            }`}
                                        >
                                            <img
                                                src={image.thumb}
                                                alt="Product thumbnail"
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="col-span-5">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-['Orbitron'] text-[#FFD700] mb-8">{productData.title}</h1>
                            <div>
                                <div className="text-3xl font-semibold text-[#E5E7EB]">
                                    <CurrencyFormatter amount={computedProduct.price} />
                                </div>
                            </div>
                            {productData.variationTypes && productData.variationTypes.length > 0 && renderProductVariationTypes()}

                            {computedProduct.quantity !== undefined && computedProduct.quantity < 10 && computedProduct.quantity > 0 && (
                                <div className="text-red-500 my-4">
                                    <span>Only {computedProduct.quantity} left</span>
                                </div>
                            )}
                            {computedProduct.quantity > 0 ? renderAddToCartButton() : (
                                <div className="text-red-500 my-4">
                                    <span>Out of stock</span>
                                </div>
                            )}

                            <b className="text-xl text-[#FFD700] font-['Orbitron']">About the Item</b>
                            <div className="wysiwyg-output text-[#E5E7EB]" dangerouslySetInnerHTML={{ __html: productData.description || 'No description available.' }} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}