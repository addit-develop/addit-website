import * as Styles from './matchDetail-st'
import { default as React, useCallback, useState, useEffect } from 'react'
import { MatchDetailDataType } from '@/types'

interface PropsType {
  matchData: MatchDetailDataType | undefined
}

interface lineupPlayerType {
  player: {
    grid: string
    id: number
    name: string
    number: number
    pos: string
  }
}

const MatchLineup = ({ matchData }: PropsType) => {
  const [startXIData, setStartXIData] = useState<[lineupPlayerType[][], lineupPlayerType[][]]>([
    [],
    [],
  ])

  useEffect(() => {
    const newStartXIData: [lineupPlayerType[][], lineupPlayerType[][]] = [[], []]
    var i: number = 0
    while (i < 2) {
      const rawData = matchData?.lineups[i].startXI
      const formationArray = matchData?.lineups[i].formation.split('-')
      formationArray?.forEach((x: number) => {
        newStartXIData[i].push(rawData?.splice(1, x))
      })
      i++
    }
    setStartXIData(newStartXIData)
  }, [matchData])

  const getPlayerRating = useCallback(
    (teamIndex: number, playerId: number) =>
      matchData?.players[teamIndex].players.find((x: any) => x.player.id === playerId).statistics[0]
        .games.rating,
    [matchData]
  )

  const getPlayerElement = useCallback(
    (teamIndex: number, data: lineupPlayerType) => (
      <Styles.playerStarting>
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

  return (
    <React.Fragment>
      <Styles.LineupContainer>
        <Styles.SubTitle>Lineup</Styles.SubTitle>
        <Styles.Lineup>
          <Styles.startingXI>
            <Styles.startingXIRow>
              {getPlayerElement(0, matchData?.lineups[0]?.startXI[0])}
            </Styles.startingXIRow>
            {startXIData[0].map((x) => (
              <Styles.startingXIRow>{x.map((y) => getPlayerElement(0, y))}</Styles.startingXIRow>
            ))}
          </Styles.startingXI>
          <Styles.startingXI reverse>
            <Styles.startingXIRow>
              {getPlayerElement(1, matchData?.lineups[1].startXI[0])}
            </Styles.startingXIRow>
            {startXIData[1].map((x) => (
              <Styles.startingXIRow>{x.map((y) => getPlayerElement(1, y))}</Styles.startingXIRow>
            ))}
          </Styles.startingXI>
        </Styles.Lineup>
        <Styles.SubPlayerContainer>
          <Styles.SubPlayerList>
            {matchData?.lineups[0]?.substitutes.map((x: lineupPlayerType) => (
              <Styles.playerSub>
                <div>{x.player.number}</div>
                <div>{x.player.name}</div>
              </Styles.playerSub>
            ))}
          </Styles.SubPlayerList>
          <Styles.SubPlayerList>
            <Styles.SubPlayerList>
              {matchData?.lineups[1]?.substitutes.map((x: lineupPlayerType) => (
                <Styles.playerSub>
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
