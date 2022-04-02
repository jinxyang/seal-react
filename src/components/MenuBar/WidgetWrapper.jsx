import React from 'react'

import View from '../View'

const WidgetWrapper = ({ onClick = null, children }) => {
  return (
    <View
      styles={{
        padding: [0.3, 0.6],
        ...(onClick && {
          cursor: 'pointer',
          transition: 'all 200ms ease',
          ':hover': {
            borderRadius: 0.5,
            backgroundColor: 'transparent[0]',
          },
        }),
      }}
      onClick={onClick}
    >
      {children}
    </View>
  )
}

export default WidgetWrapper
