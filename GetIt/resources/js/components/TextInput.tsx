import React, { InputHTMLAttributes, forwardRef } from 'react';

// Extend InputHTMLAttributes to allow all standard input props
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ className = '', ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`bg-[#2A2A40] border border-[#00D4FF]/50 text-[#E5E7EB] rounded-sm font-['Inter'] text-sm focus:ring-2 focus:ring-[#00D4FF] focus:border-[#00D4FF] transition-all duration-300 outline-none ${className}`}
                {...props}
            />
        );
    }
);

TextInput.displayName = 'TextInput';

export default TextInput;