import { NextComponentType } from 'next'
import { useCallback, useState, useEffect } from 'react'
import Link from 'next/link'
import { AdditLongLogo, CrossIcon, MenuIcon } from '@/assets/icons'
import { COLORS } from '@/constants/constants'
import HeaderNavigation from './HeaderNavigation'
import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 24px;
  box-sizing: border-box;
  border-bottom: 1px solid ${COLORS.lightgray};
  @media only screen and (max-width: 810px) {
    padding: 16px;
  }
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

const Header: NextComponentType = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const openMenu = useCallback(() => {
    setMenuOpen(!menuOpen)
  }, [menuOpen])

  return (
    <HeaderContainer>
      <Link href="/">
        <HeaderTitle>
          <AdditLongLogo width={105} height={28} />
          <div>for Football</div>
        </HeaderTitle>
      </Link>
      <OpenMenuButton id="menu" onClick={openMenu}>
        {menuOpen ? (
          <CrossIcon width="32" height="32" fill={COLORS.darkgray} viewBox="0 0 40 40" />
        ) : (
          <MenuIcon width="32" height="32" fill={COLORS.darkgray} viewBox="0 0 40 40" />
        )}
      </OpenMenuButton>
      <HeaderNavigation menuOpen={menuOpen} />
    </HeaderContainer>
  )
}

export default Header
