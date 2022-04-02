import React from 'react'

import View from '../View'

const Picture = ({
  block = false,
  src = '',
  width = null,
  height = null,
  align = 'baseline',
  alt = '',
  styles = {},
  ...props
}) => {
  return (
    <View
      {...props}
      as="img"
      src={src}
      alt={alt}
      styles={{
        display: block && 'block',
        width,
        height,
        verticalAlign: align,
        ...styles,
      }}
    />
  )
}

export default Picture
