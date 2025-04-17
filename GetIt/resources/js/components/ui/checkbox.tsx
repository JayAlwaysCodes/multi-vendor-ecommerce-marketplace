import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-[#00D4FF] data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#00D4FF] data-[state=checked]:to-[#8B00FF] data-[state=checked]:border-[#8B00FF] data-[state=checked]:text-white focus-visible:border-[#8B00FF] focus-visible:ring-[#8B00FF]/50 aria-invalid:ring-[#FF6B6B]/20 aria-invalid:border-[#FF6B6B] size-4 shrink-0 rounded-[4px] border bg-[#1A1A2E] shadow-[0_0_5px_#00D4FF] transition-all duration-300 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 hover:shadow-[0_0_10px_#FFD700]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };