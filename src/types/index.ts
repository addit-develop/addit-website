type scoreType = {
  home: number | null
  away: number | null
}

type teamType = {
  name: string
  logo: string
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

export type NationType = {
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

export type FixtureBlockType = {
  id: number
  date: string
  teams: {
    home: teamType
    away: teamType
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
