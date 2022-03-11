import React from 'react'
import _ from 'lodash'

import View from '../View'

const getter = (value) =>
  _.isNumber(_.toNumber(value)) ? `span ${value}` : value

const GridItem = ({
  as = 'div',
  block = false,
  columns = 1,
  column = 1,
  row = 1,
  styles = {},
  children,
  ...props
}) => {
  return (
    <View
      {...props}
      as={as}
      styles={{
        gridColumn: ({ responsive }) =>
          getter(responsive(block ? columns : column)),
        gridRow: ({ responsive }) => getter(responsive(row)),
        ...styles,
      }}
    >
      {children}
    </View>
  )
}

export default GridItem
