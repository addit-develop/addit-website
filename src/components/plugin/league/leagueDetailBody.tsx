import { LeagueType } from '@/types'
import React, { useState } from 'react'
import MenuBar from '../common/menuBar'
import LeagueStanding from './leagueStanding'
import LeagueStats from './leagueStats'
interface PropsType {
  league: LeagueType
}
const LeagueDetailBody = ({ league }: PropsType) => {
  const menu = ['Table', 'Fixtures', 'Stats']
  const [selectedMenu, setSelectedMenu] = useState<string>('Table')
  return (
    <React.Fragment>
      <MenuBar menu={menu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      {selectedMenu === 'Table' ? (
        <LeagueStanding league={league} />
      ) : selectedMenu === 'Fixtures' ? null : (
        <LeagueStats />
      )}
    </React.Fragment>
  )
}
export default LeagueDetailBody
