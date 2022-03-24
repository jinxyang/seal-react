import React from 'react'
import _ from 'lodash'

import { useConfigState } from '../components/ConfigProvider'

const useResponsive = () => {
  const [{ breakpoints }] = useConfigState()

  return React.useCallback(
    (value) => {
      if (_.isFunction(value) || _.isArray(value) || !_.isObject(value)) {
        return value
      } else if (breakpoints[0] in value) {
        return value[breakpoints[0]]
      } else {
        return value[_.find(breakpoints, (key) => key in value)]
      }
    },
    [breakpoints],
  )
}

export default useResponsive
