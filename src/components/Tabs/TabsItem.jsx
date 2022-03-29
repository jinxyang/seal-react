import React from 'react'

import View from '../View'

const TabsItem = ({ active = false, onClick = () => {}, children }) => {
  return (
    <View
      styles={{
        flex: '0 0 auto',
        padding: [0.25, 1.5],
        backgroundColor: ({ theme }) => active && theme.colors.primary.default,
        borderRadius: 0.75,
        transition: 'all 250ms ease',
        whiteSpace: 'nowrap',
        cursor: active ? 'default' : 'pointer',
        color: ({ theme }) => (active ? '#fff' : theme.colors.primary.default),
        ':hover': {
          backgroundColor: ({ theme }) =>
            !active && theme.colors.transparent[1],
        },
      }}
      onClick={onClick}
    >
      {children}
    </View>
  )
}

export default TabsItem
