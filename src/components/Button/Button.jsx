import React from 'react'
import styled from 'styled-components'

import useStyle from '../../hooks/useStyle'

const StyledButton = styled.button`
  ${({ $style }) => $style};

  color: inherit;
  font: inherit;
`

const styleConfig = [['block', ['width', (block) => block && '100%']]]

const Button = (props) => {
  const {
    type = 'button',
    disabled = false,
    onClick = () => {},
    children,
  } = props
  const style = useStyle(styleConfig, props)
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      $style={style}
    >
      {children}
    </StyledButton>
  )
}

export default Button
