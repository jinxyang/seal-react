import React from 'react'
import { throttle, last } from 'lodash'

const getPoints = (values = [], width) =>
  values.filter(([key, [min]]) => width >= min).map(([key]) => key)

const useBreakpoint = (values = [], getWidth = () => window.innerWidth) => {
  const [points, setPoints] = React.useState(getPoints(values, getWidth()))

  React.useEffect(() => {
    const handler = throttle(() => {
      setPoints(getPoints(values, getWidth()))
    }, 200)

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return points.length ? points : [last(values)[0]]
}

export default useBreakpoint
