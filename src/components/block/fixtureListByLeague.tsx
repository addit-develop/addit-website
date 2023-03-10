import { COLORS } from '@/constants/constants'
import { default as React } from 'react'
import styled from 'styled-components'
import { FixtureListBlockType } from '@/types'

import LeagueGroupedFixtures from '../plugin/match/leagueGroupedFixtures'

const BlockContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: ${COLORS.white};
  border-radius: 10px;
  box-shadow: 0px 0.6px 1.8px -0.63px rgba(0, 0, 0, 0.05),
    0px 1.8px 5.4px -1.3px rgba(0, 0, 0, 0.05), 0px 4.8px 14.3px -1.9px rgba(0, 0, 0, 0.05),
    0px 15px 45px -2.5px rgba(0, 0, 0, 0.05);
`

interface Props {
  data: FixtureListBlockType[]
}

const FixtureListByLeague = ({ data }: Props) => {
  return (
    <React.Fragment>
      <BlockContainer>
        {data &&
          data.map((x) => (
            <LeagueGroupedFixtures key={x.id} fixtures={x.fixtures} forBlock={true} />
          ))}
      </BlockContainer>
    </React.Fragment>
  )
}

export default FixtureListByLeague
