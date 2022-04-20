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
  seal,
  styles = {},
  children,
  ...props
}) => {
  return (
    <View
      {...props}
      as={as}
      seal={seal}
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
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { seal: child.props.seal ?? seal })
          : child,
      )}
    </View>
  )
}

export default Flex
