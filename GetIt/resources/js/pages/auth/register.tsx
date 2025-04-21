import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create GETIT Account" description="Enter your details or connect your wallet to register">
            <Head title="Register" />
            <form
                className="flex flex-col gap-6 bg-[#2A2A40] p-8 rounded-lg max-w-md mx-auto shadow-[0_0_10px_#00D4FF]"
                onSubmit={submit}
            >
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-[#E5E7EB] font-['Inter']">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            className="bg-[#1A1A2E] border-[#00D4FF] text-[#E5E7EB] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                        />
                        <InputError message={errors.name} className="text-[#FF4433]" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#E5E7EB] font-['Inter']">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                            className="bg-[#1A1A2E] border-[#00D4FF] text-[#E5E7EB] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                        />
                        <InputError message={errors.email} className="text-[#FF4433]" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[#E5E7EB] font-['Inter']">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                            className="bg-[#1A1A2E] border-[#00D4FF] text-[#E5E7EB] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                        />
                        <InputError message={errors.password} className="text-[#FF4433]" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-[#E5E7EB] font-['Inter']">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                            className="bg-[#1A1A2E] border-[#00D4FF] text-[#E5E7EB] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                        />
                        <InputError message={errors.password_confirmation} className="text-[#FF4433]" />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full bg-[#FFD700] text-[#2A2A40] hover:bg-[#FFD700]/80 focus:ring-[#00D4FF] font-['Inter']"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 text-[#2A2A40]" />}
                        Create Account
                    </Button>

                    <Button
                        type="button"
                        className="w-full bg-[#1A1A2E] border border-[#00D4FF] text-[#E5E7EB] hover:bg-[#3A3A50] shadow-[0_0_5px_#00D4FF] transition-all duration-300 font-['Inter']"
                        onClick={() => alert('Web3 Wallet Connect Coming Soon!')}
                        tabIndex={6}
                    >
                        Connect Wallet
                    </Button>
                </div>

                <div className="text-center text-sm text-[#A1A09A] font-['Inter']">
                    Already have an account?{' '}
                    <TextLink href={route('login')} className="text-[#FFD700] hover:text-[#FFD700]/80" tabIndex={7}>
                        Log In
                    </TextLink>
                </div>
                {errors.email || errors.password || errors.name || errors.password_confirmation ? (
                    <Alert variant="destructive" className="mb-6 bg-[#FF4433]/10 border-[#FF4433]/30 text-[#FF4433] font-['Inter']">
                        <AlertTitle className="text-[#FF4433]">Registration Error</AlertTitle>
                        <AlertDescription>Please check the form for errors.</AlertDescription>
                    </Alert>
                ) : null}
            </form>
        </AuthLayout>
    );
}