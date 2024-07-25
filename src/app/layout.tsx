import './globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
	weight: '500',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Carlos Aragon',
	description: 'Personal portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={montserrat.className}>{children}</body>
		</html>
	)
}
