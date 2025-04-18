import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-['Inter'] font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-[#00D4FF] focus-visible:ring-[#00D4FF]/50 focus-visible:ring-[3px] aria-invalid:border-[#FF4433] aria-invalid:ring-[#FF4433]/20 transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default:
          "border-[#00D4FF] bg-[#2A2A40] text-[#E5E7EB] [a&]:hover:bg-[#FFD700]/20 [a&]:hover:text-[#FFD700] [a&]:hover:shadow-[0_0_10px_#FFD700]",
        secondary:
          "border-[#8B00FF] bg-[#2A2A40] text-[#E5E7EB] [a&]:hover:bg-[#8B00FF]/20 [a&]:hover:text-[#FFD700] [a&]:hover:shadow-[0_0_10px_#8B00FF]",
        destructive:
          "border-[#FF4433] bg-[#2A2A40] text-[#E5E7EB] [a&]:hover:bg-[#FF4433]/20 [a&]:hover:text-[#FFD700] [a&]:hover:shadow-[0_0_10px_#FF4433]",
        outline:
          "border-[#00D4FF] bg-transparent text-[#E5E7EB] [a&]:hover:bg-[#00D4FF]/20 [a&]:hover:text-[#FFD700] [a&]:hover:shadow-[0_0_10px_#00D4FF]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }