import countries from '@/data/countriesData.json'

export const useCountryFlag = (country: string) => {
  const foundCountry = countries.find((c) => c.name === country)
  if (foundCountry && foundCountry.flag) return foundCountry.flag
  else return ''
}
