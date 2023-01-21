import { NextComponentType } from 'next'
import Image from 'next/image'
import logo from '@/assets/logo_long.svg'
import styles from './header.module.css'
import { useCallback, useState } from 'react'

const Header: NextComponentType = () => {
  const [menuState, setMenuState] = useState(false)

  const openMenu = useCallback(() => {
    setMenuState(!menuState)
  }, [menuState])

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__title}>
          <Image className={styles.header__logo} src={logo} alt="addit_full_logo" />
          <div>for Football</div>
        </div>
        <div className={styles.header__navigation__button} id="menu" onClick={openMenu}>
          {menuState ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="32"
              viewBox="0 0 40 40"
              className={styles.icon}
            >
              <path d="m10.542 30.958-1.5-1.5 9.5-9.458-9.5-9.458 1.5-1.5 9.458 9.5 9.458-9.5 1.5 1.5-9.5 9.458 9.5 9.458-1.5 1.5-9.458-9.5Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="32"
              width="32"
              viewBox="0 0 40 40"
              className={styles.icon}
            >
              <path d="M5.417 29.375v-2.083h29.166v2.083Zm0-8.333v-2.084h29.166v2.084Zm0-8.334v-2.083h29.166v2.083Z" />
            </svg>
          )}
        </div>
      </div>
      <div
        className={styles.header__navigation}
        style={menuState ? { display: 'flex' } : { display: 'none' }}
      >
        <div className={styles.header__navigation__menu}>Contact</div>
        <div className={styles.header__navigation__menu}>About</div>
        <div className={styles.header__navigation__menu}>Signout</div>
      </div>
    </div>
  )
}
export default Header
