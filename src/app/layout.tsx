import type { Metadata } from "next";
import { Yanone_Kaffeesatz } from "next/font/google";
import '@/style/global.scss'
import Header from "@/components/header";
import { Suspense } from "react";

const yanoneKaffeesatz = Yanone_Kaffeesatz({
	weight: '400',
	subsets: ['cyrillic'],
})

export const metadata: Metadata = {
	title: "Img day",
	description: "img day nasa in api",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${yanoneKaffeesatz.className}`}>
				<Suspense fallback={<></>}>
					<Header/>
					<div className="bg"/>					
					{children}
				</Suspense>
			</body>
		</html>
	);
}
