import React from 'react'
import styled from 'styled-components'

import styles from '../../styles'
import useStyle from '../../hooks/useStyle'

const StyledBox = styled.div`
  ${({ $style }) => $style};
`

const styleProps = Object.values(styles)

const Box = (props) => {
  const { children } = props

  const style = useStyle(styleProps, props)

  return <StyledBox $style={style}>{children}</StyledBox>
}

export default Box
