import { COLORS } from '@/constants/constants'
import React from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 8px;
  background-color: ${COLORS.white};
  margin-bottom: 2px;
`

export const MenuList = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border-radius: 20px;
  background-color: ${COLORS.lightgray};
`

export const MenuItem = styled.button<{ selected?: boolean }>`
  flex-shrink: 0;
  flex: 1;
  padding: 3px 0px;
  text-align: center;
  font-size: 16px;
  border-radius: 16px;
  color: ${(props) => (props.selected ? COLORS.black : COLORS.darkgray)};
  background-color: ${(props) => (props.selected ? COLORS.white : 'none')};
  box-shadow: ${(props) => (props.selected ? '1px 1px 2px 0px rgba(0, 0, 0, 0.25)' : 'none')};
`

export const ArrowButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface PropsType {
  selectedMenu: string
  setSelectedMenu: (menu: string) => void
  menu: string[]
}

const MenuBar = ({ menu, selectedMenu, setSelectedMenu }: PropsType) => {
  return (
    <React.Fragment>
      <Container>
        <MenuList>
          {menu.map((m, i) => {
            return (
              <MenuItem
                key={i}
                selected={selectedMenu === m}
                onClick={() => {
                  setSelectedMenu(m)
                }}
              >
                {m}
              </MenuItem>
            )
          })}
        </MenuList>
      </Container>
    </React.Fragment>
  )
}
export default MenuBar
