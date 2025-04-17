import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-['Inter'] transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-[#8B00FF] focus-visible:ring-[#8B00FF]/50 focus-visible:ring-[3px] aria-invalid:ring-[#FF6B6B]/20",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#00D4FF] to-[#8B00FF] text-white shadow-[0_0_10px_#00D4FF] hover:from-[#8B00FF] hover:to-[#00D4FF] hover:shadow-[0_0_15px_#FFD700]",
        destructive:
          "bg-[#FF6B6B] text-white shadow-[0_0_10px_#FF6B6B] hover:bg-[#FF8787] focus-visible:ring-[#FF6B6B]/20",
        outline:
          "border border-[#00D4FF] bg-[#1A1A2E] text-[#E5E7EB] shadow-[0_0_5px_#00D4FF] hover:bg-[#3A3A50] hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700]",
        secondary:
          "bg-[#2A2A40] text-[#E5E7EB] shadow-[0_0_5px_#00D4FF] hover:bg-[#3A3A50] hover:text-[#FFD700] hover:shadow-[0_0_10px_#FFD700]",
        ghost:
          "text-[#00D4FF] hover:bg-[#3A3A50] hover:text-[#FFD700] hover:shadow-[0_0_5px_#FFD700]",
        link:
          "text-[#00D4FF] hover:text-[#FFD700] hover:shadow-[0_0_5px_#FFD700] font-['Inter']",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };