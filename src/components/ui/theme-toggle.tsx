"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
	className?: string;
	isRoundedFull?: boolean;
}

export function ThemeToggle({ className, isRoundedFull }: ThemeToggleProps) {
	// next-themes
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	return (
		<div
			className={cn(
				"flex w-16 h-8 p-1 rounded-md cursor-pointer transition-all duration-300",
				isRoundedFull && "rounded-full",
				isDark
					? "bg-zinc-950 border border-zinc-800"
					: "bg-white border border-zinc-200",
				className,
			)}
			onClick={() => setTheme(isDark ? "light" : "dark")}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === "Space") {
					setTheme(isDark ? "light" : "dark");
				}
			}}
		>
			<div className="flex justify-between items-center w-full">
				<div
					className={cn(
						"flex justify-center items-center w-6 h-6 rounded-md transition-transform duration-300",
						isRoundedFull && "rounded-full",
						isDark
							? "transform translate-x-0 bg-zinc-800"
							: "transform translate-x-8 bg-gray-200",
					)}
				>
					{isDark ? (
						<Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
					) : (
						<Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
					)}
				</div>
				<div
					className={cn(
						"flex justify-center items-center w-6 h-6 rounded-md transition-transform duration-300",
						isRoundedFull && "rounded-full",
						isDark ? "bg-transparent" : "transform -translate-x-8",
					)}
				>
					{isDark ? (
						<Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
					) : (
						<Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
					)}
				</div>
			</div>
		</div>
	);
}
