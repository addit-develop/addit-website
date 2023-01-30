import dayjs from 'dayjs'
import { useMemo } from 'react'

const useCurrentSeason = () => {
  const today = useMemo(() => dayjs(), [])
  const currentSeason = today.month() > 7 ? today.year() : today.year() - 1
  return { currentSeason }
}

export default useCurrentSeason
