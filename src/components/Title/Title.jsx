import React from 'react'

import Flex from '../Flex'
import View from '../View'
import Picture from '../Picture'

const asStyles = {
  h1: {
    gap: 0.8,
    icon: {
      height: ({ theme }) => theme.font.size * 2.25,
    },
    text: {
      fontSize: 2,
    },
  },
  h2: {
    gap: 0.7,
    icon: {
      height: ({ theme }) => theme.font.size * 1.75,
    },
    text: {
      fontSize: 1.5,
    },
  },
  h3: {
    gap: 0.6,
    icon: {
      height: ({ theme }) => theme.font.size * 1.5,
    },
    text: {
      fontSize: 1.25,
    },
  },
  h4: {
    gap: 0.5,
    icon: {
      height: ({ theme }) => theme.font.size * 1.25,
    },
    text: {
      fontSize: 1,
    },
  },
  h5: {
    gap: 0.4,
    icon: {
      height: ({ theme }) => theme.font.size * 1,
    },
    text: {
      fontSize: 0.9,
    },
  },
  h6: {
    icon: {
      height: ({ theme }) => theme.font.size * 0.9,
    },
    gap: 0.3,
    text: {
      fontSize: 0.8,
    },
  },
}

const Title = ({
  as = 'h4',
  prefix = null,
  color = 'inherit',
  styles = {},
  children,
}) => {
  return (
    <Flex cross="center" gap={asStyles[as]?.gap}>
      {prefix && (
        <Flex.Item
          flex="0 0 auto"
          styles={{ ...asStyles[as]?.icon, overflow: 'hidden' }}
        >
          {React.isValidElement(prefix) ? (
            prefix
          ) : (
            <Picture src={prefix} height="100%" styles={{ display: 'block' }} />
          )}
        </Flex.Item>
      )}
      <View
        as={as}
        styles={{
          ...asStyles[as]?.text,
          margin: 0,
          color,
          fontWeight: 'bold',
          ...styles,
        }}
      >
        {children}
      </View>
    </Flex>
  )
}

export default Title
