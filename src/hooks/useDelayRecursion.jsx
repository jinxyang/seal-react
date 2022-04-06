import React from 'react'

const useDelayRecursion = (callback, delay = 0, hook = false) => {
  const trigger = React.useRef(false)
  const timerId = React.useRef(null)

  const stop = React.useCallback(() => {
    timerId.current && clearTimeout(timerId.current)
  }, [])

  const start = React.useCallback(() => {
    stop()
    callback()
    trigger.current = true
  }, [callback, stop])

  React.useEffect(() => {
    if (trigger.current && hook) {
      stop()
      timerId.current = setTimeout(() => callback(), delay)
    }
    return stop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hook])

  return [
    start,
    () => {
      stop()
      trigger.current = false
    },
  ]
}

export default useDelayRecursion
