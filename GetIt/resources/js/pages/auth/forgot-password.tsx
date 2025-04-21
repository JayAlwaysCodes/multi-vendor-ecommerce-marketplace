import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
            <Head title="Forgot password" />

            {status && <div className="mb-4 text-center text-sm font-medium text-[#00D4FF] font-['Inter']">{status}</div>}

            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#E5E7EB] font-['Inter']">
                            Email address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                            className="bg-[#1A1A2E] text-[#E5E7EB] border-[#00D4FF] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                        />

                        <InputError message={errors.email} className="text-[#FF4433]" />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button
                            className="w-full bg-[#FFD700] text-[#2A2A40] hover:bg-[#FFD700]/80 focus:ring-[#00D4FF] font-['Inter']"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin text-[#2A2A40]" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="space-x-1 text-center text-sm text-[#A1A09A] font-['Inter']">
                    <span>Or, return to</span>
                    <TextLink href={route('login')} className="text-[#FFD700] hover:text-[#FFD700]/80">
                        log in
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}