import Layout from '@/components/layout/layout'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ThemeProvider } from '../components/theme/theme-provider'
import './globals.css'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: 'RS3 GIM Dashboard',
	description: 'A dashboard for the runescape game mode, group ironman.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Layout>{children}</Layout>
				</ThemeProvider>
			</body>
		</html>
	)
}
