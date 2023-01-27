import { COLORS } from '@/constants/constants'
import Image from 'next/image'

interface PropsType {
  src: string
  altText?: string
  width?: number
  height?: number
}
const CircledImage = ({ src, altText, width, height }: PropsType) => {
  return (
    <Image
      src={src}
      width={width || 24}
      height={height || 24}
      alt={altText || src}
      style={{
        borderRadius: width ? width / 2 : 10,
        objectFit: 'contain',
        border: `1px solid ${COLORS.gray}`,
      }}
    />
  )
}

export default CircledImage
