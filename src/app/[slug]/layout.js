import { Inter } from 'next/font/google'
import './globals.css' // Импорт глобальных стилей
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, metadata }) {
	return (
		<html lang='en'>
			<head>
				<title>{metadata?.title || 'Default Title'}</title>
				<meta name='description' content={metadata?.description || 'Default description'} />
				<meta name='keywords' content={metadata?.keywords?.join(', ') || 'default, keywords'} />
				<meta name='author' content={metadata?.author || 'Default Author'} />
				{/* Дополнительные метатеги */}
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				{/* OpenGraph */}
				<meta property='og:title' content={metadata?.openGraph?.title || 'Default OG Title'} />
				<meta property='og:description' content={metadata?.openGraph?.description || 'Default OG Description'} />
				<meta property='og:site_name' content={metadata?.openGraph?.site_name || 'Default Site Name'} />
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
