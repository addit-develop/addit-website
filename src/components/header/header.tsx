import { NextComponentType } from 'next'
import { useCallback, useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { AdditLongLogo, CrossIcon, MenuIcon } from '@/assets/icons'
import { changeColorMode, COLORS } from '@/constants/constants'
import HeaderNavigation from './HeaderNavigation'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 24px;
  box-sizing: border-box;
  border-bottom: 1px solid ${COLORS.lightgray};
  gap: 24px;
  @media only screen and (max-width: 810px) {
    padding: 16px;
  }
`
const TitleContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`
const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  font-family: 'Manrope';
  font-size: 20px;
  font-weight: 800;
  color: #666666;
  line-height: 1em;
  cursor: pointer;
  @media only screen and (max-width: 810px) {
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 18px;
  }
`

const OpenMenuButton = styled.div`
  display: none;
  @media only screen and (max-width: 810px) {
    display: flex;
    height: 32px;
    width: 32px;
  }
`
const ThemeButton = styled.button`
  display: flex;
  height: 32px;
  width: 32px;
`

const Header: NextComponentType = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const menu = useRef<HTMLDivElement>(null)

  const openMenu = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  const changeTheme = useCallback(() => {
    setDarkMode(!darkMode)
    changeColorMode()
    console.log(COLORS)
  }, [darkMode])

  useEffect(() => {
    const clickOutside = (e: any) => {
      // 메뉴 열려 있고 메뉴의 바깥쪽을 눌렀을 때 창 닫기
      if (menuOpen && !menu.current?.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', clickOutside)

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside)
    }
  }, [menuOpen])

  return (
    <HeaderContainer>
      <TitleContainer>
        <Link href="/">
          <HeaderTitle>
            <AdditLongLogo width={105} height={28} />
            <div>for Football</div>
          </HeaderTitle>
        </Link>
      </TitleContainer>
      <ThemeButton onClick={changeTheme}>
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32">
            <path
              fill="#fff"
              d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480 936Z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32">
            <path
              fill="#8C7B72"
              d="M480 776q-83 0-141.5-58.5T280 576q0-83 58.5-141.5T480 376q83 0 141.5 58.5T680 576q0 83-58.5 141.5T480 776ZM70 606q-12.75 0-21.375-8.675Q40 588.649 40 575.825 40 563 48.625 554.5T70 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T170 606H70Zm720 0q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T790 546h100q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T890 606H790ZM479.825 296Q467 296 458.5 287.375T450 266V166q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 166v100q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625Zm0 720q-12.825 0-21.325-8.62-8.5-8.63-8.5-21.38V886q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T510 886v100q0 12.75-8.675 21.38-8.676 8.62-21.5 8.62ZM240 378l-57-56q-9-9-8.629-21.603.37-12.604 8.526-21.5 8.896-8.897 21.5-8.897Q217 270 226 279l56 57q8 9 8 21t-8 20.5q-8 8.5-20.5 8.5t-21.5-8Zm494 495-56-57q-8-9-8-21.375T678.5 774q8.5-9 20.5-9t21 9l57 56q9 9 8.629 21.603-.37 12.604-8.526 21.5-8.896 8.897-21.5 8.897Q743 882 734 873Zm-56-495q-9-9-9-21t9-21l56-57q9-9 21.603-8.629 12.604.37 21.5 8.526 8.897 8.896 8.897 21.5Q786 313 777 322l-57 56q-8 8-20.364 8-12.363 0-21.636-8ZM182.897 873.103q-8.897-8.896-8.897-21.5Q174 839 183 830l57-56q8.8-9 20.9-9 12.1 0 20.709 9Q291 783 291 795t-9 21l-56 57q-9 9-21.603 8.629-12.604-.37-21.5-8.526Z"
            />
          </svg>
        )}
      </ThemeButton>
      <OpenMenuButton id="menu" onClick={openMenu}>
        {menuOpen ? (
          <CrossIcon width="32" height="32" fill={COLORS.darkgray} viewBox="0 0 40 40" />
        ) : (
          <MenuIcon width="32" height="32" fill={COLORS.darkgray} viewBox="0 0 40 40" />
        )}
      </OpenMenuButton>
      <HeaderNavigation ref={menu} menuOpen={menuOpen} />
    </HeaderContainer>
  )
}

export default Header
