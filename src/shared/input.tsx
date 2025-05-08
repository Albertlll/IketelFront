import { cn } from "@/lib/utils";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
	onImageLoad?: (base64: string) => void; // Новый пропс для обработки base64
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, onImageLoad, ...props }, ref) => {
		const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
			// Обработка загрузки изображения
			if (type === "file" && onImageLoad) {
				const file = e.target.files?.[0];
				if (file?.type.startsWith("image/")) {
					const base64 = await new Promise<string>((resolve, reject) => {
						const reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = () => resolve(reader.result as string);
						reader.onerror = (error) => reject(error);
					});
					onImageLoad(base64);
				}
			}

			if (props.onChange) {
				props.onChange(e);
			}
		};

		return (
			<input
				type={type}
				className={cn(
					" cursor-pointer rounded-[20px] w-full border-[2px] text-[18px] bg-white px-[24px] py-[12px] placeholder:gray border-lightPrimary outline-none focus:border-secondary transition-colors duration-200 disabled:border-gray disabled:text-gray",
					className,
				)}
				ref={ref}
				onChange={handleChange}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
