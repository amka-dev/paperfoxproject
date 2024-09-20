import style from './header.module.scss'
import logo from '../../assets/logo.png'
import Image from 'next/image'

export const Header = () => {
	return (
		<header className={style.header}>
			<div className={style.menu}>
				<a href='https://www.etsy.com/shop/PaperFoxProject' aria-label='Visit our Etsy shop'>
					<Image src={logo} alt='PaperFoxProject Logo' className={style.logo} />
				</a>
				<nav className={style.nav}>
					<a href='#about'>
						<span>About</span>
					</a>
					<a href='#contacts'>
						<span>Contacts</span>
					</a>
				</nav>
			</div>
		</header>
	)
}
