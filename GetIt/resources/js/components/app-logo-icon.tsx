import { SVGAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function AppLogoIcon({ className, ...props }: SVGAttributes<SVGElement>) {
    return (
        <svg
            className={cn('h-6 w-6 fill-[#FFD700]', className)}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fill="#FFD700"
                d="M20 18a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h12a2 2 0 012 2v10zM6 10h12v2H6v-2zm0 4h6v2H6v-2z"
            />
            <path
                fill="#00D4FF"
                d="M9 16l2 2 4-4"
                stroke="#00D4FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}