import React from 'react'

import View from '../View'

const TabsItem = ({ active = false, onClick = () => {}, children }) => {
  return (
    <View
      styles={{
        flex: '0 0 auto',
        padding: [0.25, 1.5],
        backgroundColor: ({ theme }) =>
          active && theme.colors.primary.transparent[6],
        borderRadius: 0.75,
        transition: 'all 250ms ease',
        whiteSpace: 'nowrap',
        cursor: active ? 'default' : 'pointer',
        ':hover': {
          color: ({ theme }) => !active && theme.colors.primary.default,
        },
      }}
      onClick={onClick}
    >
      {children}
    </View>
  )
}

export default TabsItem
