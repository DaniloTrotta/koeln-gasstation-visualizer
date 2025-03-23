import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Tankstellen in Köln",
	description:
		"Eine Übersicht aller Tankstellen in Köln mit Filtermöglichkeiten nach Straßennamen und Sortierung.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<NuqsAdapter>
						<Toaster position="bottom-right" />

						<div className="flex flex-col items-center justify-center container mx-auto">
							{children}
						</div>
					</NuqsAdapter>
				</ThemeProvider>
			</body>
		</html>
	);
}
