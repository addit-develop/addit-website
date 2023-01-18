import { NextComponentType } from 'next'
import Image from 'next/image'
import logo from '@/assets/logo_long.svg'
import styles from './header.module.css'

const Header: NextComponentType = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Image src={logo} alt="addit_full_logo" width={119} height={32} />
        <div>for Football</div>
      </div>
      <div className={styles.header__navigation}>
        <div className={styles.header__navigation__button}>Contact</div>
        <div className={styles.header__navigation__button}>About</div>
        <div className={styles.header__navigation__button}>Signout</div>
      </div>
    </div>
  )
}
export default Header
