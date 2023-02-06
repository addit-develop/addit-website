import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios'
import { useMemo } from 'react'

const useAxios = () => {
  const FIXTURE_API = process.env.NEXT_PUBLIC_BASE_URL
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: FIXTURE_API,
    }) // Axios Instance 생성
    instance.interceptors.request.use(async (config: any) => {
      return {
        ...config,
        headers: {
          ...(config.headers ?? {}),
          'x-rapidapi-host': process.env.NEXT_PUBLIC_X_RapidAPI_Host,
          'x-rapidapi-key': process.env.NEXT_PUBLIC_X_RapidAPI_Key,
        },
      }
    })
    instance.interceptors.response.use(undefined, async (value) => {
      if (value instanceof AxiosError) {
        console.error(
          `AxiosError(${value.response?.status}/${value.code}): ${value.message}\n${value.response?.data}`
        ) // 에러 출력
      } else {
        console.log(value.response)
      }
      return value
    })
    return instance
  }, [])
  return axiosInstance
}

export default useAxios
