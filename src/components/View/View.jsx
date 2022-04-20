import React from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import useStyle from '../../hooks/useStyle'

const StyledView = styled.div(({ $style }) => $style)

const View = (
  { as = 'div', blur = false, seal, styles = {}, children, ...props },
  ref,
) => {
  const style = useStyle({
    backdropFilter: blur && `blur(${_.isBoolean(blur) ? '1px' : blur})`,
    overflow: seal && 'hidden',
    ...styles,
  })

  return (
    <StyledView {...props} ref={ref} as={as} $style={style}>
      {children}
    </StyledView>
  )
}

export default React.forwardRef(View)
