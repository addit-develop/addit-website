import dayjs from 'dayjs'
import { useCallback } from 'react'

const useTimeConverter = () => {
  const UNIXtimeConverter = useCallback((UNIX_timestamp: number) => {
    return dayjs(new Date(UNIX_timestamp))
      .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .format('D MMM YYYY | HH:mm')
      .toString()
  }, [])

  return { UNIXtimeConverter }
}

export default useTimeConverter
