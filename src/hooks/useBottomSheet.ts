import { useRef, useEffect, useCallback, useState } from 'react'

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number // touchstart에서 터치 포인트의 Y값
  }
  touchMove: {
    prevTouchY?: number // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up' // 유저가 터치를 움직이고 있는 방향
  }
}

interface Props {
  MIN_Y: number
  MAX_Y: number
  CLOSE_Y: number
  closeModal: () => void
}

export const useBottomSheet = ({ MIN_Y, MAX_Y, CLOSE_Y, closeModal }: Props) => {
  const sheet = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
  })

  const [scrollTop, setScrollTop] = useState<number | undefined>(0)

  // Touch Event 핸들러들을 등록한다.
  useEffect(() => {
    const handleScroll = (e: Event) => {
      console.log(scrollTop)
      setScrollTop(content.current?.scrollTop)
    }

    const handleTouchStart = (e: TouchEvent) => {
      console.log(content.current?.scrollTop)
      if (scrollTop || window.innerWidth > 600 || !sheet.current) return null
      const { touchStart, touchMove } = metrics.current

      touchStart.sheetY = sheet.current.getBoundingClientRect().y
      touchStart.touchY = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollTop || window.innerWidth > 600 || !sheet.current) return null
      e.preventDefault()

      const { touchStart, touchMove } = metrics.current
      const currentTouch = e.touches[0]

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down'
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up'
      }

      // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
      const touchOffset = currentTouch.clientY - touchStart.touchY
      let nextSheetY = touchStart.sheetY + touchOffset

      // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
      if (nextSheetY <= MIN_Y) {
        nextSheetY = MIN_Y
      }

      if (nextSheetY >= MAX_Y) {
        nextSheetY = MAX_Y
      }

      // sheet 위치 갱신.
      sheet.current.style.setProperty('transform', `translateY(${nextSheetY - MIN_Y}px)`)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (scrollTop || window.innerWidth > 600 || !sheet.current) return null
      const { touchMove } = metrics.current

      // Snap Animation
      const currentSheetY = sheet.current.getBoundingClientRect().y

      if (currentSheetY > CLOSE_Y && touchMove.movingDirection === 'down') {
        console.log('close')
        closeModal()
      } else {
        sheet.current.style.setProperty('transform', 'translateY(0)')
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
      }
    }

    sheet.current?.addEventListener('touchstart', handleTouchStart)
    sheet.current?.addEventListener('touchmove', handleTouchMove)
    sheet.current?.addEventListener('touchend', handleTouchEnd)
    content.current?.addEventListener('scroll', handleScroll)

    return () => {
      sheet.current?.removeEventListener('touchstart', handleTouchStart)
      sheet.current?.removeEventListener('touchmove', handleTouchMove)
      sheet.current?.removeEventListener('touchend', handleTouchEnd)
      content.current?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { sheet, content }
}
