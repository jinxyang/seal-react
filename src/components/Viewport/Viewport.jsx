import React from 'react'

import View from '../View'

const Viewport = ({ zIndex = '', styles = {}, children }) => {
  // TODO: 性能优化，是否可以统一管理样式状态
  return (
    <View
      styles={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        ...styles,
      }}
    >
      {children}
    </View>
  )
}

export default Viewport
