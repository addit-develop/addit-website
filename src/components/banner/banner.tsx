import { NextComponentType } from 'next'
import Image from 'next/image'
import logo from '@/assets/logo_long.svg'

const Banner: NextComponentType = () => {
  return (
    <div>
      <Image src={logo} alt="addit_full_logo" width={60} height={30} />
      this is banner
    </div>
  )
}
export default Banner
