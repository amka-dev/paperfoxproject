import style from './footer.module.scss'
import logo from '../../assets/logo.png'
import pinterest from '../../assets/pinterest.svg'
import gmail from '../../assets/gmail.svg'
import instagram from '../../assets/instagram.svg'
import etsy from '../../assets/etsy.svg'
import Image from 'next/image'

export const Footer = () => {
	return (
		<footer className={style.footer}>
			<div className={style.menu}>
				<a href='https://www.etsy.com/shop/PaperFoxProject' aria-label='Visit our Etsy shop'>
					<Image src={logo} alt='PaperFoxProject Logo' className={style.logo} />
				</a>

				<nav className={style.nav}>
					<a href='https://www.pinterest.com/PaperFoxProject/' aria-label='Visit our Pinterest page'>
						<Image src={pinterest} alt='Pinterest' className={style.logos} />
					</a>

					<a href='https://www.etsy.com/shop/PaperFoxProject' aria-label='Visit our Etsy shop'>
						<Image src={etsy} alt='Etsy' className={style.logos} />
					</a>
					<a href='https://www.instagram.com/paper_kingdoom/' aria-label='Visit our Instagram page'>
						<Image src={instagram} alt='Instagram' className={style.logos} />
					</a>
					<a href='mailto:nasifullinamir064@gmail.com' aria-label='Email us'>
						<Image src={gmail} alt='Email' className={style.logos} />
					</a>
				</nav>
			</div>
		</footer>
	)
}
