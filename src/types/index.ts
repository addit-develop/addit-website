type ScoreType = {
  home: number | null
  away: number | null
}

export type FixtureType = {
  fixture: any
  league: any
  teams: {
    home: any
    away: any
  }
  goals: ScoreType
  score: {
    halftime: ScoreType
    fulltime: ScoreType
    extratime: ScoreType
    penalty: ScoreType
  }
}

export type LeagueType = {
  id: number
  name: string
  type: string
  logo: string
}

export type CountryType = {
  code: string
  name: string
  flag: string
}

export type PlayerType = {
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

export type StatisticsType = {
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

export type PlayerDataType = {
  player: PlayerType
  statistics: StatisticsType[]
}

export type TeamType = {
  id: number
  name: string
  code: string
  country: string
  founded: number
  national: boolean
  logo: string
}

export type TeamStatType = {
  played: number
  win: number
  draw: number
  lose: number
  goals: {
    for: number
    against: number
  }
}

export type StandingDataType = {
  rank: number
  team: TeamType
  points: number
  goalsDiff: number
  form: string
  status: string
  description: string
  all: TeamStatType
  home: TeamStatType
  away: TeamStatType
  update: string
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
  score: ScoreType
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

export type MatchDetailDataType = {
  fixture: any
  league: any
  teams: any
  goals: any
  score: any
  events: any[]
  lineups: any[]
  statistics: any[]
  players: any[]
}
