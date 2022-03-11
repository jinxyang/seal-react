import React from 'react'
import _ from 'lodash'

import { useConfigState } from '../ConfigProvider'

const defaultOptions = {
  duration: 3000,
  hover: false,
}

const icons = {
  normal: '-_-',
  success: '^_^',
  error: '0_0',
  warn: '~_~',
}

const Toast = ({
  show = false,
  text = '',
  type = 'normal',
  duration,
  hover,
  onClick = () => true,
  onClose = () => {},
  children,
}) => {
  const timer = React.useRef(null)
  const [{ toastOptions }] = useConfigState()

  const options = React.useMemo(() => {
    return {
      ...defaultOptions,
      ...toastOptions,
      ...(_.isNumber(duration) && { duration }),
      ...(_.isBoolean(hover) && { hover }),
    }
  }, [duration, hover, toastOptions])

  const setTimer = React.useCallback(() => {
    options.duration > 0 &&
      (timer.current = setTimeout(onClose, options.duration))
  }, [onClose, options.duration])

  const clearTimer = React.useCallback(() => {
    timer.current && clearTimeout(timer.current)
  }, [])

  const handleClick = React.useCallback(
    (e) => {
      onClick(e) && onClose()
    },
    [onClick, onClose],
  )

  const handleMouseEnter = React.useCallback(() => {
    options.hover && clearTimer()
  }, [clearTimer, options.hover])

  const handleMouseLeave = React.useCallback(() => {
    options.hover && setTimer()
  }, [options.hover, setTimer])

  React.useEffect(() => {
    show ? setTimer() : clearTimer()
    return clearTimer
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  return (
    show && (
      <span
        onClick={(e) => handleClick(e)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>
          <span>{icons[type]}</span>
          {text}
        </span>
        {children && <span>{children}</span>}
      </span>
    )
  )
}

export default Toast
