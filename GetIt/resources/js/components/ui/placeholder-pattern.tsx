import { useId } from 'react';

interface PlaceholderPatternProps {
    className?: string;
}

export function PlaceholderPattern({ className }: PlaceholderPatternProps) {
    const patternId = useId();
    const filterId = useId();

    return (
        <svg className={className} fill="none">
            <defs>
                <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.5" />
                    </feComponentTransfer>
                </filter>
                <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path
                        d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"
                        stroke="#FFD700"
                        strokeOpacity="0.3"
                        filter={`url(#${filterId})`}
                    />
                </pattern>
            </defs>
            <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%"></rect>
        </svg>
    );
}