import React from 'react'
import styled from 'styled-components'

import useStyle from '../../hooks/useStyle'

const StyledGrid = styled.div`
  ${({ $style }) => $style};
`

const styleConfig = [
  ['inline', ['display', (inline) => (inline ? 'inline-grid' : 'grid')]],
  ['columns', ['gridTemplateColumns', (columns) => `repeat(${columns}, 1fr)`]],
  'gap',
]

const Grid = (props) => {
  const { as = 'div', asProps = {}, children } = props

  const style = useStyle(styleConfig, props)

  return (
    <StyledGrid as={as} {...asProps} $style={style}>
      {children}
    </StyledGrid>
  )
}

export default Grid
