import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({ className = '', children, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'text-[#00D4FF] font-[\'Inter\'] transition-all duration-300 ease-out hover:text-[#FFD700] hover:shadow-[0_0_5px_#FFD700]',
                className,
            )}
            {...props}
        >
            {children}
        </Link>
    );
}