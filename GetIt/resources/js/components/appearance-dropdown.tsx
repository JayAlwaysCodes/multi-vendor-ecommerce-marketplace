import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function AppearanceToggleDropdown({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Moon className="h-5 w-5 text-[#A1A09A]" />;
            case 'light':
                return <Sun className="h-5 w-5 text-[#A1A09A]" />;
            default:
                return <Monitor className="h-5 w-5 text-[#A1A09A]" />;
        }
    };

    return (
        <div className={className} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-md text-[#FFD700] hover:bg-[#FFD700]/20 hover:text-[#FFD700] focus:ring-[#00D4FF]"
                    >
                        {getCurrentIcon()}
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    className="bg-[#2A2A40] text-[#E5E7EB] border-[#00D4FF] shadow-[0_0_5px_#00D4FF] font-['Inter']"
                >
                    <DropdownMenuItem
                        onClick={() => updateAppearance('light')}
                        className="hover:bg-[#FFD700]/20 hover:text-[#FFD700] focus:bg-[#FFD700]/20 focus:text-[#FFD700]"
                    >
                        <span className="flex items-center gap-2">
                            <Sun className="h-5 w-5 text-[#A1A09A]" />
                            Light
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => updateAppearance('dark')}
                        className="hover:bg-[#FFD700]/20 hover:text-[#FFD700] focus:bg-[#FFD700]/20 focus:text-[#FFD700]"
                    >
                        <span className="flex items-center gap-2">
                            <Moon className="h-5 w-5 text-[#A1A09A]" />
                            Dark
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => updateAppearance('system')}
                        className="hover:bg-[#FFD700]/20 hover:text-[#FFD700] focus:bg-[#FFD700]/20 focus:text-[#FFD700]"
                    >
                        <span className="flex items-center gap-2">
                            <Monitor className="h-5 w-5 text-[#A1A09A]" />
                            System
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}