'use client'
import style from './contacts.module.scss'
import parse from 'html-react-parser'
import Image from 'next/image'
import personal from '../../assets/personal.webp'

export const Contacts = ({ contactsText = 'Loading...' }) => {
	return (
		<section className={style.contacts} id='contacts'>
			<div className={style.personal}>
				<h1>Personal Order</h1>
				<div>
					<Image src={personal} alt='Personal Order' />
					{parse(typeof contactsText === 'string' ? contactsText : 'Error loading Contacts text')}
				</div>
			</div>
		</section>
	)
}
