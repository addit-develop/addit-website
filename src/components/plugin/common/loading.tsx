import React, { useRef, useEffect } from 'react'
import * as animationData from '../../../data/football-loading.json'
import lottie from 'lottie-web'
import styled from 'styled-components'
import { COLORS } from '@/constants/constants'

const Container = styled.div`
  z-index: 99999999;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.white};
  & > div {
    width: 300px;
    height: 300px;
  }
`

const Loading = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      })
    }
  }, [])

  return (
    <React.Fragment>
      <Container>
        <div ref={containerRef} />
      </Container>
    </React.Fragment>
  )
}

export default Loading
