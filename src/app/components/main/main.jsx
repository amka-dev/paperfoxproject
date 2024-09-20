'use client'
import React, { useState, useEffect } from 'react'
import style from './main.module.scss'

export const Main = ({ products, backgroundColor = '#f0f0f5' }) => {
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [hoveredProduct, setHoveredProduct] = useState(null)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)

	useEffect(() => {
		let interval
		if (hoveredProduct !== null && Array.isArray(products[hoveredProduct]?.images)) {
			interval = setInterval(() => {
				setCurrentImageIndex(prevIndex => {
					const productImages = products[hoveredProduct].images
					return (prevIndex + 1) % productImages.length
				})
			}, 1000)
		}
		return () => {
			clearInterval(interval)
			setCurrentImageIndex(0)
		}
	}, [hoveredProduct, products])

	const categories = ['All', ...new Set(products.map(product => product.category))]

	const filteredProducts =
		selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory)

	return (
		<section className={style.main_wrap} style={{ backgroundColor }}>
			<div className={style.main}>
				<div className={style.buttons}>
					{categories.map((category, index) => (
						<button
							key={index}
							onClick={() => setSelectedCategory(category)}
							className={style.category_btn}
						>
							{category}
						</button>
					))}
				</div>
				<div className={style.products}>
					{filteredProducts.map((product, index) => (
						<div
							key={index}
							className={style.card}
							onMouseEnter={() => setHoveredProduct(index)}
							onMouseLeave={() => setHoveredProduct(null)}
						>
							{product.images?.data && product.images.data.length > 0 && (
								<div>
									<img
										src={`http://localhost:1337${
											product.images.data[
												hoveredProduct === index ? currentImageIndex : 0
											]?.attributes?.url
										}`}
										alt={product.title}
										width={800}
										height={800}
										className={style.image}
									/>
								</div>
							)}

							<div className={style.card_text}>
								<h3>{product.title}</h3>
								<a
									href={product.Etsy_link}
									target='_blank'
									rel='noopener noreferrer'
									className={style.linkEtsy}
								>
									View on Etsy
								</a>
							</div>
						</div>
					))}
				</div>
				<div className={style.goEtsy}>
					<h1>You can find more papercrafts in Etsy!</h1>
					<p>
						You can also use an exclusive promotional code for website visitors{' '}
						<span>&quot;IMFROMWEB&quot;</span> and get a 60% discount on all our papercrafts!
					</p>
					<a href='https://www.etsy.com/shop/PaperFoxProject?ref=seller-platform-mcnav'>
						<button>Go to Etsy</button>
					</a>
				</div>
			</div>
		</section>
	)
}
