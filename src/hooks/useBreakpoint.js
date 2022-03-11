import React from 'react'
import _ from 'lodash'

const getPoints = (values = [], width) =>
  values
    .filter(([key, [min]]) => width >= min)
    .map(([key]) => key)
    .join(',')

const useBreakpoint = (values = [], getWidth = () => window.innerWidth) => {
  const [points, setPoints] = React.useState(getPoints(values, getWidth()))

  React.useEffect(() => {
    const handler = _.throttle(() => {
      setPoints(getPoints(values, getWidth()))
    }, 200)

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return React.useMemo(() => {
    return points.length ? points.split(',') : [_.last(values)[0]]
  }, [points, values])
}

export default useBreakpoint
