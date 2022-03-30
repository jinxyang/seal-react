import React from 'react'

import View from '../View'

const Picture = ({
  src,
  width = null,
  height = null,
  align = 'baseline',
  styles = {},
}) => {
  return src ? (
    <View
      as="img"
      src={src}
      styles={{ width, height, verticalAlign: align, ...styles }}
    />
  ) : null
}

export default Picture
