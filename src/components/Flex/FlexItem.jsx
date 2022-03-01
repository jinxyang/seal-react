import React from 'react'
import styled from 'styled-components'

import useStyle from '../../hooks/useStyle'

const StyledFlexItem = styled.div`
  ${({ $style }) => $style};
`

const styleConfig = [
  'flex',
  ['align', 'align-self'],
  'order',
  'width',
  'height',
  'maxWidth',
  'maxHeight',
]

const FlexItem = (props) => {
  const { as = 'div', children } = props
  const style = useStyle(styleConfig, props)
  return (
    <StyledFlexItem as={as} $style={style}>
      {children}
    </StyledFlexItem>
  )
}

export default FlexItem
