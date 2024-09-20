'use client'
import { useEffect, useState } from 'react'
import { Header } from './components/header/header'
import { Galery } from './components/galery/galery'
import { Main } from './components/main/main'
import { Footer } from './components/footer/footer'
import { Contacts } from './components/contacts/contacts'
import { About } from './components/about/about'
import axios from 'axios'
import styles from './page.module.css'

export default function HomePage() {
	const [data, setData] = useState({
		aboutText: 'Loading...',
		backgroundColor: '#f0f0f5',
		contactsText: 'Loading...',
		products: [],
		title: 'Loading...',
		metaTags: '',
		color: '#ffffff'
	})

	// Запрашиваем данные один раз
	useEffect(() => {
		async function fetchData() {
			try {
				const pageContentRes = await axios.get('http://localhost:1337/api/page-contents')
				const pageContentData = pageContentRes.data?.data[0]?.attributes || {}

				const productsRes = await axios.get('http://localhost:1337/api/items?populate=images')
				const productsData = productsRes.data?.data || []

				setData({
					aboutText: pageContentData.TextForAbout || 'Explore our amazing papercraft templates!',
					backgroundColor: pageContentData.color || '#f0f0f5',
					contactsText: pageContentData.TextForContact || 'Get in touch with us for custom orders and more.',
					products: productsData.map(item => item.attributes) || [],
					title: pageContentData.title || 'Welcome to PaperFoxProject!',
					metaTags: pageContentData.metategs || 'papercraft, templates, PaperFoxProject, DIY crafts',
					color: pageContentData.color || '#ffffff'
				})
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}
		fetchData()
	}, [])

	// Преобразуем metaTags в массив ключевых слов
	const keywordsArray = data.metaTags
		.replace(/'/g, '') // Убираем кавычки
		.split(',') // Разбиваем строку на массив по запятым
		.map(keyword => keyword.trim()) // Убираем лишние пробелы

	// Устанавливаем метаданные по умолчанию
	const pageMetadata = {
		title: data.title || 'Welcome to PaperFoxProject!',
		description: data.metaTags || 'Explore a wide range of papercraft templates and DIY projects at PaperFoxProject.',
		keywords: keywordsArray.length ? keywordsArray : ['papercraft', 'DIY', 'templates', 'crafts', 'PaperFoxProject'],
		author: 'PaperFoxProject Team'
	}

	// Добавление метаданных через useEffect
	useEffect(() => {
		document.title = pageMetadata.title
		document.querySelector('meta[name="description"]')?.setAttribute('content', pageMetadata.description)
		document.querySelector('meta[name="keywords"]')?.setAttribute('content', pageMetadata.keywords.join(', '))
		document.querySelector('meta[name="author"]')?.setAttribute('content', pageMetadata.author)
	}, [pageMetadata])

	return (
		<main className={styles.main}>
			<Header />
			<Galery />
			<Main products={data.products} backgroundColor={data.backgroundColor} />
			<Contacts contactsText={data.contactsText} />
			<About aboutText={data.aboutText} backgroundColor={data.backgroundColor} />
			<Footer />
		</main>
	)
}
