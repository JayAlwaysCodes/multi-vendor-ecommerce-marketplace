import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-[#00D4FF] bg-[#1A1A2E] text-[#E5E7EB] placeholder:text-gray-500 selection:bg-[#8B00FF] selection:text-white flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base font-['Inter'] shadow-[0_0_5px_#00D4FF] transition-all duration-300 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#E5E7EB] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-[#8B00FF] focus-visible:ring-[#8B00FF]/50 focus-visible:ring-[3px] hover:shadow-[0_0_10px_#FFD700]",
        "aria-invalid:ring-[#FF6B6B]/20 aria-invalid:border-[#FF6B6B]",
        className
      )}
      {...props}
    />
  );
}

export { Input };