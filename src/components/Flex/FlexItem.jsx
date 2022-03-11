import React from 'react'

import View from '../View'

const FlexItem = ({
  as = 'div',
  flex = '',
  cross = '',
  styles = {},
  children,
  ...props
}) => {
  return (
    <View
      {...props}
      as={as}
      styles={{
        flex,
        alignSelf: cross,
        ...styles,
      }}
    >
      {children}
    </View>
  )
}

export default FlexItem
