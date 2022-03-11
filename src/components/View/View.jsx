import React from 'react'
import styled from 'styled-components'

import useStyle from '../../hooks/useStyle'

const StyledView = styled.div(({ $style }) => $style)

const View = ({ as = 'div', styles = {}, children, ...props }) => {
  const style = useStyle(styles)

  return (
    <StyledView {...props} as={as} $style={style}>
      {children}
    </StyledView>
  )
}

export default View
