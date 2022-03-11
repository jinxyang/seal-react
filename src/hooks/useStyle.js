import React from 'react'
import _ from 'lodash'

import { useConfigState } from '../components/ConfigProvider'
import useResponsive from './useResponsive'

const prefixes = [':', '&', '.']

const getPropValue = (value, prop, responsive = (v) => v) => {
  if (_.some(prefixes, _.startsWith(prop, ?))) {
    return _.mapValues(value, getPropValue(?, ?, responsive))
  }

  return responsive(value)
}

const doubles =
  (prop) =>
  (times, { theme }) =>
    _.isNumber(times) ? _.get(theme, prop) * times + 'px' : times
const getFontSize = doubles('font.size')
const getSpacing = doubles('spacing')

const callbacks = {
  gap: getSpacing,
  margin: getSpacing,
  padding: getSpacing,
  fontSize: getFontSize,
}

const getStyleValue = (value, prop, utils = {}) => {
  if (!_.isFunction(value) && _.isObject(value)) {
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
    return _.mapValues(styles, (value, prop) => {
      return getStyleValue(getPropValue(value, prop, responsive), prop, {
        theme,
        responsive,
      })
    })
  }, [responsive, styles, theme])
}

export default useStyle
