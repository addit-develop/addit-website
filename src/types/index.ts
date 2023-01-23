type scoreType = {
  home: number | null
  away: number | null
}

export type fixtureType = {
  fixture: any
  league: any
  teams: {
    home: any
    away: any
  }
  goals: scoreType
  score: {
    halftime: scoreType
    fulltime: scoreType
    extratime: scoreType
    penalty: scoreType
  }
}

export type leagueType = {
  id: number
  name: string
  type: string
  logo: string
}

export type countryType = {
  code: string
  name: string
  flag: string
}

export type playerType = {
  id: number
  name: string
  firstname: string
  lastname: string
  age: number
  birth: {
    date: string
    place: string
    country: string
  }
  nationality: string
  height: string
  weight: string
  injured: boolean
  photo: string
}

export type statisticsType = {
  team: any
  league: any
  games: any
  substitutes: any
  shots: any
  goals: any
  passes: any
  tackles: any
  duels: any
  dribbles: any
  fouls: any
  cards: any
  penalty: any
}

export type playerDataType = {
  player: playerType
  statistics: statisticsType[]
}

export type teamType = {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

export type FixtureBlockType = {
  id: number
  date: string
  teams: {
    home: {
      name: string
      logo: string
    }
    away: {
      name: string
      logo: string
    }
  }
  score: scoreType
  status: string
  elapse: number | null
}

export type LeagueBlockType = {
  id: number
  name: string
  logo: string
  fixtures: FixtureBlockType[]
}

export type BlockDataType = {
  id: string
  type: string
  isReady: boolean
  data: any[]
}
