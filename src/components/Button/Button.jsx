import React from 'react'

import View from '../View'

const Button = ({
  type = 'button',
  disabled = false,
  block = false,
  styles = {},
  onClick = () => {},
  children,
  ...props
}) => {
  return (
    <View
      {...props}
      as="button"
      styles={{
        width: block && '100%',
        whiteSpace: 'nowrap',
        ...styles,
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </View>
  )
}

export default Button
