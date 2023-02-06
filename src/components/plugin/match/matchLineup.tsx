import * as Styles from './matchDetail-st'
import { default as React, useCallback, useState, useEffect } from 'react'
import { MatchDetailDataType, PlayerMatchStatsType } from '@/types'
import { useDispatch } from 'react-redux'
import { changeModalPage } from '@/store/actions/pageAction'

interface PropsType {
  matchData: MatchDetailDataType | undefined
  forBlock?: boolean
}

interface lineupPlayerType {
  player: {
    grid: string
    id: number
    name: string
    number: number
    pos: string
  }
  statistics?: PlayerMatchStatsType
}

const MatchLineup = ({ matchData, forBlock = false }: PropsType) => {
  const dispatch = useDispatch()

  const [startXIData, setStartXIData] = useState<[lineupPlayerType[][], lineupPlayerType[][]]>([
    [],
    [],
  ])
  const [substituesData, SetSubstitutesData] = useState<[lineupPlayerType[], lineupPlayerType[]]>([
    [],
    [],
  ])

  useEffect(() => {
    const newStartXIData: [lineupPlayerType[], lineupPlayerType[]] = [[], []]
    const newSubstituesData: [lineupPlayerType[], lineupPlayerType[]] = [[], []]
    const StartXIFormationData: [lineupPlayerType[][], lineupPlayerType[][]] = [[], []]
    const getStatistics = (teamId: number, playerId: number) => {
      return matchData?.players[teamId].players.find(
        (x: PlayerMatchStatsType) => x.player.id === playerId
      )
    }

    var i: number = 0
    while (i < 2) {
      //lineup 데이터에 statistics 정보를 추가
      matchData?.lineups[i].startXI.forEach((x: lineupPlayerType) => {
        newStartXIData[i].push({ ...x, statistics: getStatistics(i, x.player.id) })
      })
      matchData?.lineups[i].substitutes.forEach((x: lineupPlayerType) => {
        newSubstituesData[i].push({ ...x, statistics: getStatistics(i, x.player.id) })
      })
      //lineup 데이터를 포메이션에 따라 2차원 배열로 재정렬
      StartXIFormationData[i].push(newStartXIData[i].splice(0, 1))
      const formationArray = matchData?.lineups[i].formation.split('-')
      formationArray?.forEach((x: number) => {
        StartXIFormationData[i].push(newStartXIData[i].splice(0, x))
      })
      i++
    }
    SetSubstitutesData(newSubstituesData)
    setStartXIData(StartXIFormationData)
  }, [matchData])

  const getPlayerRating = useCallback(
    (teamIndex: number, playerId: number) =>
      matchData?.players[teamIndex].players.find((x: any) => x.player.id === playerId)
        ?.statistics[0].games.rating,
    [matchData]
  )

  const getPlayerElement = useCallback(
    (teamIndex: number, data: lineupPlayerType) => (
      <Styles.playerStarting onClick={() => moveToPlayerMatchStat(data.statistics, teamIndex)}>
        <Styles.playerRating starting>
          {getPlayerRating(teamIndex, data?.player.id)}
        </Styles.playerRating>
        <Styles.playerImage
          src={`https://media.api-sports.io/football/players/${data?.player.id}.png`}
        />
        {`${data?.player.number} ${data?.player.name.split(' ').at(-1)}`}
      </Styles.playerStarting>
    ),
    [matchData]
  )

  const moveToPlayerMatchStat = useCallback(
    (playerData: PlayerMatchStatsType | undefined, teamId: number) => {
      dispatch(
        changeModalPage('playerMatchDetail', 'Matches', {
          playerData: playerData,
          fixtureData: {
            fixture: matchData?.fixture,
            league: matchData?.league,
            teams: matchData?.teams,
            goals: matchData?.goals,
            score: matchData?.score,
          },
          teamData: matchData?.lineups[teamId].team,
        })
      )
    },
    [matchData]
  )

  return (
    <React.Fragment>
      <Styles.LineupContainer>
        <Styles.SubTitle>Lineup</Styles.SubTitle>
        <Styles.Lineup forBlock={forBlock}>
          <Styles.startingXI forBlock={forBlock}>
            {startXIData[0].map((x, i) => (
              <Styles.startingXIRow forBlock={forBlock} key={i}>
                {x.map((y) => getPlayerElement(0, y))}
              </Styles.startingXIRow>
            ))}
          </Styles.startingXI>
          <Styles.startingXI reverse forBlock={forBlock}>
            {startXIData[1].map((x, i) => (
              <Styles.startingXIRow forBlock={forBlock} key={i}>
                {x.map((y) => getPlayerElement(1, y))}
              </Styles.startingXIRow>
            ))}
          </Styles.startingXI>
        </Styles.Lineup>
        <Styles.SubPlayerContainer>
          <Styles.SubPlayerList>
            {substituesData[0].map((x: lineupPlayerType) => (
              <Styles.playerSub
                key={x.player.id}
                onClick={() => moveToPlayerMatchStat(x.statistics, 0)}
              >
                <div>{x.player.number}</div>
                <div>{x.player.name}</div>
              </Styles.playerSub>
            ))}
          </Styles.SubPlayerList>
          <Styles.SubPlayerList>
            <Styles.SubPlayerList>
              {substituesData[1].map((x: lineupPlayerType) => (
                <Styles.playerSub
                  key={x.player.id}
                  onClick={() => moveToPlayerMatchStat(x.statistics, 1)}
                >
                  <div>{x.player.number}</div>
                  <div>{x.player.name}</div>
                </Styles.playerSub>
              ))}
            </Styles.SubPlayerList>
          </Styles.SubPlayerList>
        </Styles.SubPlayerContainer>
      </Styles.LineupContainer>
    </React.Fragment>
  )
}

export default MatchLineup
