import React from 'react'

import Flex from '../Flex'
import View from '../View'

const boldStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
}

const Card = ({
  blur = false,
  bold = false,
  border = 1,
  borderColor = '',
  bgColor = '',
  styles = {},
  children,
}) => {
  return (
    <Flex
      styles={{
        ...styles,
        position: 'relative',
        border: borderColor && border,
        borderColor: borderColor,
        borderRadius: 1,
      }}
    >
      {bold && (
        <View
          styles={{
            ...boldStyles,
            opacity: 0.4,
            transform: ({ theme }) =>
              `scale(0.9, 1) translate(0, ${theme.space / 2}px)`,
            background: bgColor,
            borderRadius: 1,
          }}
        />
      )}
      {bold && (
        <View
          styles={{
            ...boldStyles,
            opacity: 0.2,
            transform: ({ theme }) =>
              `scale(0.8, 1) translate(0, ${theme.space}px)`,
            background: bgColor,
            borderRadius: 1,
          }}
        />
      )}
      <View
        blur={blur}
        styles={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          background: bgColor,
          borderRadius: 1,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {children}
      </View>
    </Flex>
  )
}

export default Card
