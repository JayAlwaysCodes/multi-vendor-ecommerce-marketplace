import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your GETIT Account" description="Access your account with email or connect your wallet">
            <Head title="Log in" />

            <form
                className="flex flex-col gap-6 bg-[#2A2A40] p-8 rounded-lg max-w-md mx-auto shadow-[0_0_10px_#00D4FF]"
                onSubmit={submit}
            >
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#E5E7EB] font-['Inter']">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="bg-[#1A1A2E] border-[#00D4FF] text-[#E5E7EB] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                        />
                        <InputError message={errors.email} className="text-[#FF4433]" />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-[#E5E7EB] font-['Inter']">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm text-[#00D4FF] hover:text-[#FFD700] font-['Inter']" tabIndex={5}>
                                    Forgot Password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="bg-[#1A1A2E] border-[#00D4FF] text-[#E5E7EB] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                        />
                        <InputError message={errors.password} className="text-[#FF4433]" />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="border-[#00D4FF] data-[state=checked]:bg-[#00D4FF] data-[state=checked]:text-[#2A2A40]"
                        />
                        <Label htmlFor="remember" className="text-[#E5E7EB] font-['Inter']">Remember Me</Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-[#FFD700] text-[#2A2A40] hover:bg-[#FFD700]/80 focus:ring-[#00D4FF] font-['Inter']"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 text-[#2A2A40]" />}
                        Log In
                    </Button>

                    <Button
                        type="button"
                        className="w-full bg-[#1A1A2E] border border-[#00D4FF] text-[#E5E7EB] hover:bg-[#3A3A50] shadow-[0_0_5px_#00D4FF] transition-all duration-300 font-['Inter']"
                        onClick={() => alert('Web3 Wallet Connect Coming Soon!')}
                    >
                        Connect Wallet
                    </Button>
                </div>

                <div className="text-center text-sm text-[#A1A09A] font-['Inter']">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} className="text-[#FFD700] hover:text-[#FFD700]/80" tabIndex={5}>
                        Sign Up
                    </TextLink>
                </div>
            </form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-[#FFD700] font-['Inter']">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}