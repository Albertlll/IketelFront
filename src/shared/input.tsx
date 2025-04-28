import { cn } from "@/lib/utils";
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					" rounded-[20px] w-full border-[2px] text-[18px] bg-white px-[24px] py-[12px] placeholder:gray border-lightPrimary outline-none focus:border-secondary transition-colors duration-200",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
