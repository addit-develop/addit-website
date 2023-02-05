import { COLORS } from '@/constants/constants'
import styled from 'styled-components'

const Bar = styled.div<{ data: number[] }>`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  padding: 4px 0px;
  & div {
    text-align: center;
    line-height: 24px;
    color: ${COLORS.white};
    font-size: 14px;
    font-weight: 500;
    min-width: 20px;
  }
  & #win {
    flex: ${(props) => props.data[0]};
    background-color: ${COLORS.blue};
    border-radius: 5px 0 0 5px;
  }
  & #draw {
    flex: ${(props) => props.data[1]};
    background-color: ${COLORS.darkgray};
  }
  & #lose {
    flex: ${(props) => props.data[2]};
    background-color: ${COLORS.red};
    border-radius: 0 5px 5px 0;
  }
`

interface PropsType {
  data: number[]
}

const PercentageBar = ({ data }: PropsType) => {
  return (
    <Bar data={data}>
      <div id="win">{data[0]}</div>
      <div id="draw">{data[1]}</div>
      <div id="lose">{data[2]}</div>
    </Bar>
  )
}

export default PercentageBar
