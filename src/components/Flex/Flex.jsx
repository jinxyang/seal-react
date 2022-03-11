import React from 'react'

import View from '../View'

const Flex = ({
  as = 'div',
  inline = false,
  direction = '',
  wrap = '',
  gap = 1,
  main = '',
  cross = '',
  align = '',
  styles = {},
  children,
  ...props
}) => {
  return (
    <View
      {...props}
      as={as}
      styles={{
        display: ({ responsive }) =>
          responsive(inline) ? 'inline-flex' : 'flex',
        flexDirection: direction,
        flexWrap: wrap,
        gap,
        justifyContent: main,
        alignItems: cross,
        alignContent: align,
        ...styles,
      }}
    >
      {children}
    </View>
  )
}

export default Flex
