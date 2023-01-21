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

export type NationType = {
  code: string
  name: string
  flag: string
}
