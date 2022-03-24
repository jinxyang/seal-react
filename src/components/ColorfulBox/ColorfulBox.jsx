import React from 'react'

import Flex from '../Flex'
import View from '../View'

const styles = {
  solid: {
    '@keyframes bg': {
      from: {
        backgroundPosition: '0 0',
      },
      to: {
        backgroundPosition: '100% 100%',
      },
    },

    backgroundImage: ({ theme }) => {
      const primary = theme.colors.primary.transparent[8]
      const secondary = theme.colors.secondary.transparent[8]
      return `linear-gradient(-45deg, ${secondary}, ${primary}, ${secondary})`
    },
    backgroundSize: '300% 300%',
    boxShadow: ({ theme }) =>
      `2px 4px 6px ${theme.colors.primary.transparent[15]}`,
    animation: 'bg 15s linear alternate infinite',
  },
  outline: {
    border: 4,
    borderColor: 'primary.transparent[8]',
    boxShadow: ({ theme }) =>
      `2px 4px 6px ${theme.colors.secondary.transparent[17]}`,
  },
}

const titleStyles = {
  solid: {
    padding: [0.25, 1],
    marginRight: 2,
    fontSize: 1.1,
    fontWeight: 'bold',
    backgroundColor: 'transparent[16]',
    borderRadius: 0.75,
  },
}

const ColorfulBox = ({
  title = '',
  header = null,
  theme = 'solid',
  children,
}) => {
  return (
    <View
      direction="column"
      styles={{
        position: 'relative',
        height: '100%',
      }}
    >
      <Flex
        direction="column"
        gap={0.5}
        styles={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          padding: 1,
          borderRadius: 1,
          ...styles[theme],
        }}
      >
        {(title || header) && (
          <Flex
            main="space-between"
            cross="flex-end"
            styles={{ flex: '0 0 auto' }}
          >
            {title && <View styles={titleStyles[theme]}>{title}</View>}
            {header}
          </Flex>
        )}
        <Flex.Item flex={1}>{children}</Flex.Item>
      </Flex>
    </View>
  )
}

export default ColorfulBox
