import { OutputData } from '@editorjs/editorjs'

export type BlockDataType = {
  id?: string
  type: string
  isReady?: boolean
  data: any
}

export type CommentType = {
  content: string
  email: string
  time: number
  like: number
}

export type CountryType = {
  code: string
  name: string
  flag: string
}

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

export type FixtureListBlockType = {
  id: number
  name: string
  logo: string
  fixtures: FixtureType[]
}

export type FixtureStatsType = {
  games: {
    appearences?: number
    lineups: number
    minutes: number
    number: number | null
    position: string
    rating: number
    captain: boolean
  }
  offsides?: string
  substitutes: {
    in: number
    out: number
    bench: number
  }
  shots: {
    total: number
    on: number
  }
  goals: {
    total: number
    conceded: number
    assists: number
    saves: number | null
  }
  passes: {
    total: number
    key: number
    accuracy: any
  }
  tackles: {
    total: number
    blocks: number
    interceptions: number
  }
  duels: {
    total: number | null
    won: number | null
  }
  dribbles: {
    attempts: number
    success: number
    past: number | null
  }
  fouls: {
    drawn: number
    committed: number
  }
  cards: {
    yellow: number
    yellowred: number
    red: number
  }
  penalty: {
    won: number | null
    commited: number | null
    scored: number
    missed: number
    saved: number | null
  }
}

export type LeagueType = {
  id: number
  name: string
  type: string
  logo: string
}

export type LeagueBlockDataType = {
  tab: string
  leagueData:
    | {
        league: LeagueType
        season: number
        data: any
      }
    | undefined
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
  players: { team: any; players: PlayerMatchStatsType[] }[]
}

export type MatchPredictionDataType = {
  predictions: any
  league: any
  teams: any
  comparision: any
  h2h: FixtureType[]
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

export type PlayerDataType = {
  player: PlayerType
  statistics: StatisticsType[]
}

export type PlayerDataShortedType = {
  player: {
    id: number
    name: string
    photo: string
    nationality: string
  }
  statistics: { team: { id: number; logo: string; name: string } }[]
}

export type PlayerShortType = {
  id: number
  name: string
  age: number
  number: number
  position: string
  photo: string
}

export type PlayerMatchStatsType = {
  player: {
    id: number
    name: string
    photo: string
  }
  statistics: FixtureStatsType[]
}

export type PostType = {
  id: number
  title: string
  email: string
  hashtags: string[]
  data: OutputData
  snippet: string
  mainImage: string | null
  comments: CommentType[]
  likes: number
  views: number
}

export type PostSummaryType = {
  id: number
  title: string
  email: string
  snippet: string
  time: number
  mainImage: string | null
}

export type SeasonType = {
  year: number
  start: string
  end: string
  current: boolean
  coverage: Object
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

export interface StatisticsType extends FixtureStatsType {
  team: {
    id: number
    name: string
    logo: string
  }
  league: LeagueType & { country: string; season: number }
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

export type TeamBlockDataType = {
  tab: string
  teamData:
    | {
        team: TeamStatisticType
        data: any
      }
    | undefined
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

export type TransferType = {
  player: {
    id: number
    name: string
  }
  update: string
  transfers: {
    date: string
    type: string
    teams: {
      in: {
        id: number
        name: string
        logo: string
      }
      out: {
        id: number
        name: string
        logo: string
      }
    }
  }[]
}
type HomeAwayTotal = {
  home: number
  away: number
  total: number
}

export type TeamStatisticType = {
  league: LeagueType
  team: TeamType
  form: string
  fixtures: {
    played: HomeAwayTotal
    wins: HomeAwayTotal
    draws: HomeAwayTotal
    loses: HomeAwayTotal
  }
  goals: any
  biggest: any
  clean_sheet: HomeAwayTotal
  failed_to_score: HomeAwayTotal
  penalty: any
  lineups: { formation: string; played: number }[]
  cards: any
}
