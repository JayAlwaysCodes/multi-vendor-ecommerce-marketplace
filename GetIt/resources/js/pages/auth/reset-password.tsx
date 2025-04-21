import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
    token: string;
    email: string;
}

type ResetPasswordForm = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ResetPasswordForm>>({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Reset password" description="Please enter your new password below">
            <Head title="Reset password" />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[#E5E7EB] font-['Inter']">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={data.email}
                            className="mt-1 block w-full bg-[#1A1A2E] text-[#E5E7EB] border-[#00D4FF] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                            readOnly
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2 text-[#FF4433]" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-[#E5E7EB] font-['Inter']">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={data.password}
                            className="mt-1 block w-full bg-[#1A1A2E] text-[#E5E7EB] border-[#00D4FF] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                            autoFocus
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} className="text-[#FF4433]" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-[#E5E7EB] font-['Inter']">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            className="mt-1 block w-full bg-[#1A1A2E] text-[#E5E7EB] border-[#00D4FF] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} className="mt-2 text-[#FF4433]" />
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full bg-[#FFD700] text-[#2A2A40] hover:bg-[#FFD700]/80 focus:ring-[#00D4FF] font-['Inter']"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 text-[#2A2A40]" />}
                        Reset password
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}