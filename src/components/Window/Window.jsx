import React from 'react'
import styled from 'styled-components'

const StyledWindow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ $zIndex }) => $zIndex};
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Window = ({ zIndex = 1, children }) => {
  return <StyledWindow $zIndex={zIndex}>{children}</StyledWindow>
}

export default Window
