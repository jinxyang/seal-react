import React from 'react'
import _ from 'lodash'

import Flex from '../Flex'
import View from '../View'

const Title = ({
  hide = false,
  icon,
  theme = 0,
  color = 'primary',
  children,
}) => {
  const styles = React.useMemo(() => {
    return [
      {
        padding: [0.25, 1],
        backgroundColor: ({ theme }) => theme.colors[color].transparent[1],
        borderRadius: 1,
        boxShadow: ({ theme }) =>
          `1px 2px 6px ${theme.colors[color].transparent[10]}`,
      },
      {
        color: `${color}.default`,
        fontSize: 1,
        fontWeight: 'bold',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex
      gap={0.5}
      cross="center"
      styles={{
        alignSelf: 'flex-start',
        opacity: hide ? 0 : 1,
        marginTop: '-20px',
        marginRight: hide ? 0.5 : 2,
        marginBottom: 0.5,
        marginLeft: -0.5,
        whiteSpace: 'nowrap',
        ...styles[theme],
      }}
    >
      {icon &&
        (_.isString(icon) ? (
          <View
            as="img"
            src={icon}
            styles={{
              width: 40,
              padding: 0.5,
              backgroundColor: `${color}.default`,
              borderRadius: 1,
            }}
          />
        ) : (
          icon
        ))}
      <Flex.Item>{children}</Flex.Item>
    </Flex>
  )
}

const OutlineBox = ({
  icon,
  title = '',
  theme = 1,
  border = 4,
  color = 'primary',
  borderRadius = 2,
  children,
}) => {
  return (
    <View styles={{ position: 'relative' }}>
      <Flex
        gap={0}
        styles={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius,
          boxShadow: ({ theme }) =>
            `${border - 1}px ${border - 1}px 1px ${
              theme.colors.secondary.default
            }`,
        }}
      >
        <Flex direction="column" gap={0} styles={{ flex: '0 0 auto' }}>
          <Title hide icon={icon} theme={theme} color={color}>
            {title}
          </Title>
          {/* 左边框 */}
          <Flex.Item
            flex={1}
            styles={{
              borderLeft: border,
              borderBottom: border,
              borderColor: `${color}.default`,
              borderRadius: [0, 0, 0, borderRadius],
            }}
          ></Flex.Item>
        </Flex>
        {/* 左边框 */}
        <Flex.Item
          flex={1}
          styles={{
            paddingRight: 1,
            border,
            borderLeft: 0,
            borderColor: `${color}.default`,
            borderRadius: [0, borderRadius, borderRadius, 0],
          }}
        />
      </Flex>
      <Flex
        direction="column"
        gap={0}
        styles={{ position: 'relative', zIndex: 1 }}
      >
        <Title icon={icon} theme={theme} color={color}>
          {title}
        </Title>
        <View styles={{ marginTop: -0.5 }}>{children}</View>
      </Flex>
    </View>
  )
}

export default OutlineBox
