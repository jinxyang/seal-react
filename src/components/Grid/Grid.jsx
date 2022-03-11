import React from 'react'

import View from '../View'

const Grid = ({
  as = 'div',
  inline = false,
  columns,
  rows,
  gap = 1,
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
          responsive(inline) ? 'inline-grid' : 'grid',
        gridTemplateColumns: ({ responsive }) =>
          columns && `repeat(${responsive(columns)}, 1fr)`,
        gridTemplateRows: ({ responsive }) =>
          rows && `repeat(${responsive(rows)}, 1fr)`,
        gap,
        ...styles,
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { columns })
          : child,
      )}
    </View>
  )
}

export default Grid
