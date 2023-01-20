import styled from 'styled-components'

export const Modal = styled.div`
  z-index: 9999999;
  width: 49vh;
  height: 98vh;
  min-width: 360px;
  position: fixed;
  right: 1vh;
  bottom: 1vh;
  display: ${(props) => (props.closed ? 'none' : 'flex')};
  flex-direction: column;
  align-items: stretch;
  justify-content: start;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 0.8px 2.4px -0.6px rgba(0, 0, 0, 0.05), 0px 2.4px 7.2px -1.2px rgba(0, 0, 0, 0.05),
    0px 6.4px 19px -1.9px rgba(0, 0, 0, 0.05), 0px 20px 60px -2.5px rgba(0, 0, 0, 0.05);
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    right: 0;
    bottom: 0;
    border-radius: 10px 10px 0 0;
    border-top: 1px solid #c4c4c4;
    background: #fff;
    overflow: hidden;
  }
`

export const DragLine = styled.div`
  order: 0;
  display: none;
  width: 40px;
  height: 4px;
  border-radius: 2px;
  margin: 10px auto 0;
  background-color: #c4c4c4;
  @media only screen and (max-width: 600px) {
    display: flex;
  }
`

export const SearchContainer = styled.div`
  order: 1;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  background: #ffffff;
  align-items: center;
  justify-content: start;
  padding: 0 8px 0 16px;
  @media only screen and (max-width: 600px) {
    order: 5;
    height: 48px;
    padding: 8px 16px;
  }
`

export const SearchInput = styled.input`
  border-radius: 10px 0 0 0;
  width: 100%;
  height: 24px;
  margin: 12px 0;
  line-height: 24px;
  font-size: 16px;
  &::placeholder {
    color: #c4c4c4;
  }
`

export const ClearButton = styled.button`
  display: none;
  width: 20px;
  height: 20px;
`

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  margin-left: 8px;
`

export const SearchMenuContainer = styled.div`
  order: 2;
  display: flex;
  width: 100%;
  height: 44px;
  border: 0 0 1px 0 solid #c4c4c4;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  gap: 24px;
  overflow: scroll;
  padding: 8px 0 8px 16px;
  border-bottom: 1px solid #c4c4c4;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 600px) {
    order: 4;
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid #f2f2f2;
  }
`

export const SearchMenu = styled.div`
  display: flex;
  width: fit-content;
  height: 28px;
  line-height: 28px;
  font-size: 14px;
  color: ${(props) => (props.selected ? '#3981bf' : '#8a8a8a')};
  border-bottom: ${(props) => (props.selected ? '1px solid #3981bf' : 'none')};
  font-weight: 500;
  cursor: pointer;
`

export const ContentContainer = styled.div`
  order: 3;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding: 8px 0;
  background-color: #f2f2f2;
  overflow: hidden;
  @media only screen and (max-width: 600px) {
    padding: 0;
    margin-top: 10px;
  }
`

export const ModalMenuContainer = styled.div`
  order: 6;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  background: #ffffff;
  align-items: center;
  justify-content: start;
  gap: 8px;
  padding: 12px 8px 16px 16px;
  border-top: 1px solid #c4c4c4;
  @media only screen and (max-width: 600px) {
    padding: 0px 16px 16px 12px;
    border: none;
  }
`

export const AddButton = styled.button`
  display: flex;
  text-align: center;
  line-height: 40px;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: ${(props) => (props.disabled ? '#c4c4c4' : '#3981bf')};
  padding: 2px 0;
  font-size: 16px;
  color: #f2f2f2;
  font-weight: bold;
  @media only screen and (max-height: 720px) {
    height: 36px;
    border-radius: 18px;
    line-height: 36px;
  }
`

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`
