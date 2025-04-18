import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-['Inter'] font-medium text-[#E5E7EB] hover:bg-[#FFD700]/20 hover:text-[#FFD700] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[#00D4FF]/20 data-[state=on]:text-[#00D4FF] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-[#00D4FF]/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] duration-300 aria-invalid:ring-[#FF4433]/20 aria-invalid:border-[#FF4433] shadow-[0_0_5px_#00D4FF]",
  {
    variants: {
      variant: {
        default: "bg-[#2A2A40]",
        outline:
          "border border-[#00D4FF] bg-[#2A2A40] shadow-xs hover:bg-[#FFD700]/20 hover:text-[#FFD700] hover:shadow-[0_0_5px_#FFD700]",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }