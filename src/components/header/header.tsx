import { NextComponentType } from 'next'
import Image from 'next/image'
import logo from '@/assets/logo_long.svg'
import styles from './header.module.css'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import rootReducer from '@/store/reducers'

type IRootState = ReturnType<typeof rootReducer>

const Header: NextComponentType = () => {
  const dispatch = useDispatch()
  const { logInLoading, logInError } = useSelector((state: IRootState) => state.userReducer)

  const [menuState, setMenuState] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const openMenu = useCallback(() => {
    setMenuState(!menuState)
  }, [menuState])

  const signIn = useCallback(() => {
    setLoggedIn(!loggedIn)
    // dispatch(loginRequestAction())
  }, [loggedIn])

  //   useEffect(() => {
  //     if (logInError) {
  //       alert(logInError)
  //     }
  //   }, [logInError])

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__title}>
          <Image className={styles.header__logo} src={logo} alt="addit_full_logo" />
          <div>for Football</div>
        </Link>
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
        {loggedIn ? (
          <div className={styles.header__navigation__menu} onClick={signIn}>
            Signout
          </div>
        ) : (
          <div className={styles.header__navigation__signup} onClick={signIn}>
            Signup
          </div>
        )}
      </div>
    </div>
  )
}
export default Header
