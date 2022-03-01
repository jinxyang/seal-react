import React from 'react'
import styled from 'styled-components'

import { useConfigState } from '../ConfigProvider'

const StyledInput = styled.input`
  width: ${({ $block }) => ($block ? '100%' : 'auto')};
  color: inherit;
  font: inherit;
  text-align: ${({ $align }) => $align};
`

const Password = ({
  value = '',
  placeholder = '',
  disabled = false,
  size = 0,
  block = false,
  align = 'left',
  autoSize = false,
  autoComplete = 'off',
  onChange = () => {},
}) => {
  const [{ inputSize }] = useConfigState()

  return (
    <StyledInput
      $block={block}
      $align={autoSize ? 'center' : align}
      type="password"
      value={value}
      size={autoSize ? value?.length || 1 : size || inputSize}
      autoComplete={autoComplete}
      placeholder={autoSize ? '' : placeholder}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default Password
