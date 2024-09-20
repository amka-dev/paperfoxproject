'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RootLayout from './layout' // Проверьте правильность пути
import { useParams } from 'next/navigation'
import { Header } from '../components/header/header'
import { Galery } from '../components/galery/galery'
import { Main } from '../components/main/main'
import { Footer } from '../components/footer/footer'
import { Contacts } from '../components/contacts/contacts'
import { About } from '../components/about/about'

import styles from '../page.module.css'

export default function DynamicPage() {
	const [data, setData] = useState({
		aboutText: 'Loading...',
		backgroundColor: '#f0f0f5',
		contactsText: 'Loading...',
		products: [],
		title: 'Loading...',
		metaTags: '',
		color: '#ffffff'
	})

	const { slug } = useParams()

	useEffect(() => {
		if (!slug) return

		async function fetchData() {
			try {
				const pageContentRes = await axios.get(
					`http://localhost:1337/api/page-contents?filters[slug][$eq]=${slug}`
				)
				const pageContentData = pageContentRes.data?.data[0]?.attributes || {}

				const productsRes = await axios.get('http://localhost:1337/api/items?populate=images')
				const productsData = productsRes.data?.data || []

				setData({
					aboutText: pageContentData.TextForAbout || 'Default about text',
					backgroundColor: pageContentData.color || '#f0f0f5',
					contactsText: pageContentData.TextForContact || 'Default Contacts text',
					products: productsData.map(item => item.attributes) || [],
					title: pageContentData.title || 'Default title',
					metaTags: pageContentData.metategs || 'Default meta tags',
					color: pageContentData.color || '#ffffff'
				})
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchData()
	}, [slug])

	// Преобразуем metaTags в массив ключевых слов
	const keywordsArray = data.metaTags
		.replace(/'/g, '') // Убираем кавычки
		.split(',') // Разбиваем строку на массив по запятым
		.map(keyword => keyword.trim()) // Убираем лишние пробелы

	// Создаем объект метаданных с новыми default значениями
	const pageMetadata = {
		title: data.title || 'Welcome to PaperFoxProject',
		description: data.metaTags || 'Explore a wide range of papercraft templates and DIY projects at PaperFoxProject.',
		keywords: keywordsArray.length ? keywordsArray : ['papercraft', 'DIY', 'templates', 'crafts', 'PaperFoxProject'],
		author: 'Amir Nasifullin',
		openGraph: {
			title: data.title || 'Welcome to PaperFoxProject',
			description:
				data.metaTags || 'Explore a wide range of papercraft templates and DIY projects at PaperFoxProject.',
			site_name: 'PaperFoxProject'
		}
	}

	return (
		<RootLayout metadata={pageMetadata}>
			<main className={styles.main}>
				<Header />
				<Galery />
				<Main products={data.products} backgroundColor={data.backgroundColor} />
				<Contacts contactsText={data.contactsText} />
				<About aboutText={data.aboutText} backgroundColor={data.backgroundColor} />
				<Footer />
			</main>
		</RootLayout>
	)
}
