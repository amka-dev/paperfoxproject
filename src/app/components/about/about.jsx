'use client'
import style from './about.module.scss'
import parse from 'html-react-parser'

export const About = ({ aboutText = 'Loading...', backgroundColor = '#f0f0f5' }) => {
	return (
		<section className={style.about} style={{ backgroundColor }} id='about'>
			<div>
				<h1>About Me</h1>
				<div>{parse(typeof aboutText === 'string' ? aboutText : 'Error loading about text')}</div>
			</div>
		</section>
	)
}
