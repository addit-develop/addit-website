import { LeagueType } from '@/types'
import React, { useState } from 'react'
import MenuBar from '../common/menuBar'
import LeagueFixtures from './leagueFixtures'
import LeagueStanding from './leagueStanding'
import LeagueStats from './leagueStats'
interface PropsType {
  league: LeagueType
}
const LeagueDetailBody = ({ league }: PropsType) => {
  const menu = ['Table', 'Fixtures', 'Stats']
  const [selectedMenu, setSelectedMenu] = useState<string>('Table')
  const [season, setSeason] = useState<number>(2022)
  return (
    <React.Fragment>
      <MenuBar menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      {selectedMenu === 'Table' ? (
        <LeagueStanding league={league} />
      ) : selectedMenu === 'Fixtures' ? (
        <LeagueFixtures league={league} />
      ) : (
        <LeagueStats league={league} season={season} />
      )}
    </React.Fragment>
  )
}
export default LeagueDetailBody
