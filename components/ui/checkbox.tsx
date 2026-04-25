import * as React from "react";
import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type="checkbox"
            data-slot="checkbox"
            className={cn(
                "size-4 cursor-pointer rounded border-input accent-brand-navy",
                className
            )}
            {...props}
        />
    );
}

export { Checkbox };
