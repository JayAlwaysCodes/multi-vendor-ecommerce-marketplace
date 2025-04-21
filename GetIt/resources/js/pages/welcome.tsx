import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to GETIT">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Orbitron:wght@400;500;600&display=swap" rel="stylesheet" />
            </Head>
            <div className="relative flex min-h-screen flex-col items-center bg-[#1A1A2E] p-6 text-[#E5E7EB] lg:justify-center lg:p-8 overflow-hidden">
                <div className="particle-bg absolute inset-0 z-0"></div>
                <header className="mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl z-10">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                        <AvatarImage src="/path-to-user-image.jpg" alt="User Avatar" />
                                        <AvatarFallback className="rounded-lg bg-[#A1A09A]/20 text-[#E5E7EB] font-['Inter']">
                                            {auth.user.name?.[0]?.toUpperCase() || 'G'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="font-['Inter'] text-[#FFD700]">
                                        {auth.user.name || 'User'}
                                    </span>
                                </div>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#00D4FF] px-5 py-1.5 text-sm font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
                                >
                                    Dashboard
                                </Link>
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
                            </>
                        )}
                    </nav>
                </header>
                <Alert className="mb-6 w-full max-w-[335px] lg:max-w-4xl bg-[#2A2A40] border-[#00D4FF] text-[#E5E7EB] shadow-[0_0_5px_#00D4FF]">
                    <AlertTitle className="text-[#FFD700] font-['Orbitron']">Special Offer</AlertTitle>
                    <AlertDescription className="text-[#A1A09A] font-['Inter']">
                        Get 10% off your first purchase on GETIT! Use code: NEON10
                    </AlertDescription>
                </Alert>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow z-10">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-[#2A2A40] p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0_0_10px_#00D4FF] lg:rounded-tl-lg lg:rounded-br-none lg:p-20">
                            <h1 className="mb-1 font-['Orbitron'] text-xl font-medium text-[#FFD700]">
                                Welcome to GETIT
                            </h1>
                            <p className="mb-2 font-['Inter'] text-[#A1A09A]">
                                Discover a futuristic e-commerce experience with GETIT.
                                <br />
                                Start exploring our platform with these steps.
                            </p>
                            <ul className="mb-4 flex flex-col lg:mb-6">
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-1/2 before:bottom-0 before:left-[0.4rem] before:border-l before:border-[#00D4FF]">
                                    <span className="relative bg-[#2A2A40] py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#00D4FF] bg-[#2A2A40] shadow-[0_0_5px_#00D4FF]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                                        </span>
                                    </span>
                                    <span className="font-['Inter'] text-[#E5E7EB]">
                                        Browse our
                                        <Link
                                            href="/products"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-[#00D4FF] underline underline-offset-4 hover:text-[#FFD700] transition-colors duration-300"
                                        >
                                            <span>Product Catalog</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </Link>
                                    </span>
                                </li>
                                <li className="relative flex items-center gap-4 py-2 before:absolute before:top-0 before:bottom-1/2 before:left-[0.4rem] before:border-l before:border-[#00D4FF]">
                                    <span className="relative bg-[#2A2A40] py-1">
                                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[#00D4FF] bg-[#2A2A40] shadow-[0_0_5px_#00D4FF]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                                        </span>
                                    </span>
                                    <span className="font-['Inter'] text-[#E5E7EB]">
                                        Learn about
                                        <Link
                                            href="/about"
                                            className="ml-1 inline-flex items-center space-x-1 font-medium text-[#00D4FF] underline underline-offset-4 hover:text-[#FFD700] transition-colors duration-300"
                                        >
                                            <span>GETIT’s Mission</span>
                                            <svg
                                                width={10}
                                                height={11}
                                                viewBox="0 0 10 11"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-2.5 w-2.5"
                                            >
                                                <path
                                                    d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                                    stroke="currentColor"
                                                    strokeLinecap="square"
                                                />
                                            </svg>
                                        </Link>
                                    </span>
                                </li>
                            </ul>
                            <ul className="flex gap-3 text-sm leading-normal">
                                <li>
                                    <Link
                                        href="/products"
                                        className="inline-block rounded-sm border border-[#00D4FF] bg-[#2A2A40] px-5 py-1.5 font-['Inter'] text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700] transition-all duration-300"
                                    >
                                        Shop Now
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}