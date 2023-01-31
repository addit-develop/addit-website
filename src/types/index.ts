type ScoreType = {
  home: number | null
  away: number | null
}

export type FixtureType = {
  fixture: {
    id: number
    referee: string | null
    timezone: string
    date: string
    timestamp: number | null
    periods: {
      first: number | null
      second: number | null
    }
    venue: {
      id: number
      name: string
      city: string
    }
    status: {
      long: string
      short: string
      elapsed: number | null
    }
  }
  league: LeagueType & { season: number; round: string }
  teams: {
    home: TeamType & { winner: boolean }
    away: TeamType & { winner: boolean }
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
  position?: string
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

export type SeasonType = {
  year: number
  start: string
  end: string
  current: boolean
  coverage: Object
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

export type LeagueBlockType = {
  id: number
  name: string
  logo: string
  fixtures: FixtureType[]
}

export type BlockDataType = {
  id: string
  type: string
  isReady: boolean
  data: any
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

export type MatchPredictionDataType = {
  predictions: any
  league: any
  teams: any
  comparision: any
  h2h: FixtureType[]
}
import { OutputData } from '@editorjs/editorjs'
export type Comment = {
  content: string
  email: string
  time: number | string
  like: number
}

export type Post = {
  id: number
  title: string
  email: string
  hashtags: string[]
  data: OutputData
  snippet: string
  comments: Comment[]
  likes: number
  views: number
}
