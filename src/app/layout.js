import { Inter } from 'next/font/google'
import './globals.css' // Импорт глобальных стилей
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'PaperFoxProject - Papercraft Templates for Everyone!',
	description: 'Explore our range of papercraft templates. Filter by category and purchase directly on Etsy!',
	keywords: ['papercraft', 'templates', 'Etsy', 'online shop', 'crafts', 'PaperFoxProject'],
	author: 'Amir Nasifullin',
	openGraph: {
		title: 'PaperFoxProject - Papercraft Templates for Everyone!',
		description: 'Explore our range of papercraft templates. Filter by category and purchase directly on Etsy!',
		site_name: 'PaperFoxProject'
	},
	viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}
