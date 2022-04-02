import React from 'react'

import Picture from '../Picture'

const stylesByShape = {
  rounded: {
    borderRadius: 1,
  },
  circle: {
    borderRadius: '50%',
  },
}

const Avatar = ({
  src,
  size = '100%',
  alt = 'Avatar',
  shape = 'square',
  styles = {},
  ...props
}) => {
  return (
    <Picture
      {...props}
      src={src}
      alt={alt}
      width={size}
      height={size}
      styles={{ ...stylesByShape[shape], ...styles }}
    />
  )
}

export default Avatar
