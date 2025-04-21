import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-[#00D4FF] font-['Inter']">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button
                    disabled={processing}
                    variant="secondary"
                    className="bg-[#A1A09A]/20 text-[#E5E7EB] hover:bg-[#A1A09A]/40 font-['Inter']"
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 text-[#E5E7EB]" />}
                    Resend verification email
                </Button>

                <TextLink
                    href={route('logout')}
                    method="post"
                    className="mx-auto block text-sm text-[#FFD700] hover:text-[#FFD700]/80 font-['Inter']"
                >
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}