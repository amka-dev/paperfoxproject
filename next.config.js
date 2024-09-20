/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['i.etsystatic.com', 'localhost', '127.0.0.1', 'http://localhost:3000', 'http://localhost:1337']
	}
}

module.exports = nextConfig
