'use client'
import React, { useState, useEffect } from 'react'
import style from './galery.module.scss'
import background from '../../assets/background.png'
import background2 from '../../assets/background2.png'
import background3 from '../../assets/background3.png'

import left from '../../assets/left.png'
import right from '../../assets/right.png'
import Image from 'next/image'

const images = [background, background2, background3]
export const Galery = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const goToNext = () => {
		setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
	}

	const goToPrev = () => {
		setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
	}

	useEffect(() => {
		const interval = setInterval(goToNext, 5000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className={style.galery}>
			<div className={style.carousel}>
				<div className={style.carousel__images} style={{ transform: `translateX(-${currentIndex * 100}vw)` }}>
					{images.map((image, index) => (
						<Image key={index} src={image} alt={`Slide ${index}`} className={style.carousel__image} />
					))}
				</div>
			</div>
			<button className={`${style.control} ${style['control--prev']}`} onClick={goToPrev} aria-label='Previous slide'>
				<Image src={left} alt='Previous' />
			</button>
			<button className={`${style.control} ${style['control--next']}`} onClick={goToNext} aria-label='Next slide'>
				<Image src={right} alt='Next' />
			</button>
		</div>
	)
}
