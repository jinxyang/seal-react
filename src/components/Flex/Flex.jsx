import React from 'react'
import styled from 'styled-components'

import useStyle from '../../hooks/useStyle'

const StyledFlex = styled.div`
  ${({ $style }) => $style};
`

const styleConfig = [
  ['inline', ['display', (inline) => (inline ? 'inline-flex' : 'flex')]],
  ['direction', 'flex-direction'],
  'gap',
  ['wrap', 'flexWrap'],
  ['justify', 'justifyContent'],
  ['content', 'alignContent'],
  ['align', 'alignItems'],
  'width',
  'height',
  'padding',
]

const Flex = (props) => {
  const { as = 'div', flex, children } = props
  const style = useStyle(styleConfig, props)

  return (
    <StyledFlex as={as} $style={style}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { flex, ...child.props })
          : child,
      )}
    </StyledFlex>
  )
}

export default Flex
