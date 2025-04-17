import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "text-sm leading-none font-medium font-['Inter'] text-[#E5E7EB] select-none transition-all duration-300 hover:text-[#FFD700] hover:shadow-[0_0_5px_#FFD700] group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 group-data-[disabled=true]:text-[#4B5563] peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:text-[#4B5563]",
        className
      )}
      {...props}
    />
  );
}

export { Label };