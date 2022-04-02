import React from 'react'
import _ from 'lodash'

import { useConfigState } from '../components/ConfigProvider'
import useResponsive from './useResponsive'

const prefixes = [
  ':', // for Pseudo-classes & Pseudo-elements
  '&', // for Selectors
  '.', // for Selectors
  '#', // for Selectors
  '@', // for At-rules
]
const equals = [
  'from', // attr for keyframes
  'to', // attr for keyframes
]
const suffixes = [
  '%', // attr for keyframes
]

const doubles =
  (prop, unit = 'px') =>
  (times, { theme }) => {
    return _.isNumber(times) ? _.get(theme, prop) * times + unit : times
  }

const multipleDoubles =
  (getter, separator = ' ') =>
  (value, utils) => {
    return _.isArray(value)
      ? _.map(value, getter(?, utils)).join(separator)
      : getter(value, utils)
  }

const getFontSize = doubles('font.size')
const getSpace = doubles('space')
const getRadius = doubles('radius')
const getColor = (value, { theme }) => _.get(theme.colors, value) ?? value
const getBorder = doubles('border', 'px solid')

const callbacks = {
  top: getSpace,
  right: getSpace,
  bottom: getSpace,
  left: getSpace,
  gap: multipleDoubles(getSpace),
  margin: multipleDoubles(getSpace),
  marginTop: getSpace,
  marginRight: getSpace,
  marginBottom: getSpace,
  marginLeft: getSpace,
  padding: multipleDoubles(getSpace),
  paddingTop: getSpace,
  paddingRight: getSpace,
  paddingBottom: getSpace,
  paddingLeft: getSpace,
  borderRadius: multipleDoubles(getRadius),
  fontSize: getFontSize,
  color: getColor,
  background: getColor,
  backgroundColor: getColor,
  border: getBorder,
  borderTop: getBorder,
  borderRight: getBorder,
  borderBottom: getBorder,
  borderLeft: getBorder,
  borderColor: getColor,
  letterSpacing: getFontSize,
}

const getPropValue = (value, prop, responsive = (v) => v) => {
  if (
    _.includes(equals, prop) ||
    _.some(prefixes, _.startsWith(prop, ?)) ||
    _.some(suffixes, _.endsWith(prop, ?))
  ) {
    return _.mapValues(value, getPropValue(?, ?, responsive))
  }

  return responsive(value)
}

const getStyleValue = (value, prop, utils = {}) => {
  if (_.isObject(value) && !_.isFunction(value) && !_.isArray(value)) {
    return _.mapValues(value, getStyleValue(?, ?, utils))
  }

  return (
    _.find(
      [value, callbacks[prop]],
      _.isFunction,
    )?.(..._.dropWhile([value, utils], _.isFunction)) ??
    _.get(utils.theme, value) ??
    value ??
    false
  )
}

const useStyle = (styles = {}) => {
  const responsive = useResponsive()
  const [{ theme }] = useConfigState()

  return React.useMemo(() => {
    return _.flow(
      _.mapValues(?, (value, prop) => {
        const propValue = getPropValue(value, prop, responsive)
        const styleValue = getStyleValue(propValue, prop, {
          theme,
          responsive,
        })
        return styleValue
      }),
      _.omitBy(?, _.isBoolean),
    )(styles)
  }, [responsive, styles, theme])
}

export default useStyle
