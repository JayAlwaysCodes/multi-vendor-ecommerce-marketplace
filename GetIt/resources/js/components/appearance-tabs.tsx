import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn('inline-flex gap-1 rounded-lg bg-[#2A2A40] p-1 shadow-[0_0_5px_#00D4FF]', className)}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 font-["Inter"] text-sm transition-colors',
                        appearance === value
                            ? 'bg-[#00D4FF]/20 text-[#FFD700] shadow-[0_0_3px_#00D4FF]'
                            : 'text-[#A1A09A] hover:bg-[#FFD700]/20 hover:text-[#FFD700]',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4 text-[#A1A09A]" />
                    <span className="ml-1.5">{label}</span>
                </button>
            ))}
        </div>
    );
}