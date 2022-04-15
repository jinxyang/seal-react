import React from 'react'

import View from '../View'

const FlexItem = ({
  as = 'div',
  flex = '',
  order = 0,
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
        order,
        alignSelf: cross,
        ...styles,
      }}
    >
      {children}
    </View>
  )
}

export default FlexItem
