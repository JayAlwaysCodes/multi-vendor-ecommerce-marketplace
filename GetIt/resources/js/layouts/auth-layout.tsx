import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title: string;
    description: string;
}

export default function AuthLayout({ children, title, description, ...props }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-gradient-to-b from-[#1A1A2E] to-[#0F0F1B]">
            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
        </div>
    );
}