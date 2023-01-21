import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 2px;
  background-color: #f2f2f2;
  overflow: scroll;
`

export const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
`

export const DatePicker = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  border-radius: 20px;
  background-color: #f2f2f2;
`

export const DateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Date = styled.button`
  flex-shrink: 0;
  width: 100px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 16px;
  color: ${(props) => (props.selected ? '#3981BF' : '#8a8a8a')};
  background-color: ${(props) => (props.selected ? '#fff' : 'none')};
  box-shadow: ${(props) => (props.selected ? '1px 1px 2px 0px rgba(0, 0, 0, 0.25)' : 'none')};
`

export const ArrowButton = styled.button`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
`
