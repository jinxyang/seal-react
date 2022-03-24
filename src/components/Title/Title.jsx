import React from 'react'

import View from '../View'

const Title = ({ prefix, children }) => {
  return (
    <View>
      <View styles={{ opacity: 0.8, fontSize: 1.1 }}>{children}</View>
    </View>
  )
}

export default Title
