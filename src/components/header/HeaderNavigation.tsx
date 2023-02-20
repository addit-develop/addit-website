import { COLORS, SHADOWS } from '@/constants/constants'
import { loginRequestAction, logoutRequestAction } from '@/store/actions/userAction'
import { RootState } from '@/store/reducers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const NavigationContainer = styled.div<{ menuOpen: boolean }>`
  background-color: ${COLORS.white};
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  font-family: 'Manrope';
  color: #666666;
  @media only screen and (max-width: 810px) {
    z-index: 9;
    width: 100%;
    height: fit-content;
    display: ${(props) => (props.menuOpen ? 'flex' : 'none')};
    flex-direction: column;
    padding: 24px;
    border-bottom: 1px solid ${COLORS.lightgray};
    text-align: center;
    position: absolute;
    top: 72px;
    left: 0;
  }
`

const UserName = styled.div`
  white-space: nowrap;
`

const NavigationMenu = styled.div`
  height: 20px;
  font-weight: 600;
  font-size: 16px;
  width: fit-content;
  cursor: pointer;
  @media only screen and (max-width: 810px) {
    height: 40px;
  }
`

const LogInOutButton = styled.div`
  width: 80px;
  padding: 10px;
  text-align: center;
  font-family: 'Manrope';
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #222;
  border-radius: 8px;
  box-shadow: ${SHADOWS.default};
  cursor: pointer;
  @media only screen and (max-width: 810px) {
    width: 100%;
  }
`

interface Props {
  menuOpen: boolean
}

const HeaderNavigation = ({ menuOpen }: Props) => {
  const dispatch = useDispatch()
  const { me, logOutDone } = useSelector((state: RootState) => state.userReducer)
  const router = useRouter()

  useEffect(() => {
    if (logOutDone) router.reload()
  }, [logOutDone])

  const logIn = useCallback(async () => {
    const loginUrl = await loginRequestAction()
    if (loginUrl) {
      router.push(loginUrl)
    }
  }, [])

  const logout = useCallback(() => {
    dispatch(logoutRequestAction())
    if (logOutDone) {
      router.replace('/')
    }
  }, [])

  return (
    <NavigationContainer menuOpen={menuOpen}>
      {me && <UserName>{`Logged in as ${me}`}</UserName>}
      <NavigationMenu>
        <Link href="/Contact">Contact</Link>
      </NavigationMenu>
      <NavigationMenu>
        <Link href="/About">About</Link>
      </NavigationMenu>
      {me ? (
        <LogInOutButton onClick={logout}>Log Out</LogInOutButton>
      ) : (
        <LogInOutButton onClick={logIn}>Log In</LogInOutButton>
      )}
    </NavigationContainer>
  )
}

export default HeaderNavigation
