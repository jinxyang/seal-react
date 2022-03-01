import React from 'react'
import { isFunction, find, dropWhile } from 'lodash'

import { useConfigState } from '../components/ConfigProvider'

const styleValueCallbacks = {
  gap: (multiples = 1, theme) => theme.size * multiples + 'px',
  padding: (multiples = 0, theme) => theme.size * multiples + 'px',
}

const toPair = (array, defaultValue = null) =>
  Array.isArray(array) ? array : [array, defaultValue]

const useStyle = (config = [], props = {}) => {
  const [{ breakpoints, theme }] = useConfigState()

  const getPropValue = React.useCallback(
    (value) => {
      if (typeof value !== 'object') {
        return value
      } else if (breakpoints[0] in value) {
        return value[breakpoints[0]]
      } else {
        return value[find(breakpoints, (key) => key in value)]
      }
    },
    [breakpoints],
  )

  const getStyleValue = React.useCallback(
    (attr, value, callback) => {
      return (
        find(
          [value, callback, styleValueCallbacks[attr]],
          isFunction,
        )?.(...dropWhile([value, theme], isFunction)) ?? value
      )
    },
    [theme],
  )

  const style = React.useMemo(() => {
    return Object.fromEntries(
      config
        .map((item) => {
          // TODO: 默认值设计
          const [propKey, option] = toPair(item, [])
          // TODO: 无别名情况处理(styleAttr = callback)
          const [styleAttr = propKey, callback] = toPair(option)
          // ? 伪类||伪元素
          if (!(styleAttr in document.documentElement.style)) return null

          const propValue = getPropValue(props[propKey])
          const styleValue =
            getStyleValue(styleAttr, propValue, callback) ?? false

          return typeof styleValue !== 'boolean' && [styleAttr, styleValue]
        })
        .filter(Boolean),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPropValue, getStyleValue, props])

  return style
}

export default useStyle
