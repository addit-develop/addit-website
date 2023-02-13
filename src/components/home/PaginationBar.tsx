import { COLORS } from '@/constants/constants'
import styled from 'styled-components'

const Bar = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
`

const PageNumber = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${(props) => (props.selected ? COLORS.blue : COLORS.lightgray)};
  color: ${(props) => (props.selected ? COLORS.white : COLORS.black)};
  cursor: pointer;
`

interface Props {
  page: number
  setPage: (page: number) => void
}

const PaginationBar = ({ page, setPage }: Props) => {
  return (
    <Bar>
      {[1, 2, 3, 4, 5].map((number) => (
        <PageNumber key={number} selected={number === page} onClick={() => setPage(number)}>
          {number}
        </PageNumber>
      ))}
    </Bar>
  )
}

export default PaginationBar
