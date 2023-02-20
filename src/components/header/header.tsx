import { NextComponentType } from 'next'
import styles from './header.module.css'
import { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from '@/store/reducers'
import { loginRequestAction, logoutRequestAction } from '@/store/actions/userAction'
import { useRouter } from 'next/router'
import { AdditLongLogo, CrossIcon, MenuIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'

const Header: NextComponentType = () => {
  const dispatch = useDispatch()
  const { me, logOutDone } = useSelector((state: RootState) => state.userReducer)
  const router = useRouter()

  const [menuState, setMenuState] = useState(false)

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_USER_REQUEST,
  //   })
  // }, [])

  const openMenu = useCallback(() => {
    setMenuState(!menuState)
  }, [menuState])

  const logIn = useCallback(async () => {
    const loginUrl = await loginRequestAction()
    if (loginUrl) {
      router.push(loginUrl)
    }
  }, [])

  const logout = useCallback(() => {
    dispatch(logoutRequestAction())
  }, [])

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <Link href="/" className={styles.header__title}>
          <AdditLongLogo width={105} height={28} />
          <div>for Football</div>
        </Link>
        <div className={styles.header__navigation__button} id="menu" onClick={openMenu}>
          {menuState ? (
            <CrossIcon width="32" height="32" fill={COLORS.darkgray} viewBox="0 0 40 40" />
          ) : (
            <MenuIcon width="32" height="32" fill={COLORS.darkgray} viewBox="0 0 40 40" />
          )}
        </div>
      </div>
      <div
        className={styles.header__navigation}
        style={menuState ? { display: 'flex' } : { display: 'none' }}
      >
        {me && <div className={styles.header__navigation__menu}>Logged In as {me}</div>}
        <Link href="/Contact" className={styles.header__navigation__menu}>
          Contact
        </Link>
        <Link href="/About" className={styles.header__navigation__menu}>
          About
        </Link>
        {me ? (
          <div className={styles.header__navigation__signup} onClick={logout}>
            LogOut
          </div>
        ) : (
          <div className={styles.header__navigation__signup} onClick={logIn}>
            LogIn
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
