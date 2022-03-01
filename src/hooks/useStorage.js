import React from 'react'
import { nanoid } from 'nanoid'

import parse from '../utils/parse'
import stringify from '../utils/stringify'

const useStorage = (keyName, defaultValue, watch = false) => {
  const currentId = React.useRef(nanoid())
  const [value, setValue] = React.useState(() => {
    return parse(localStorage.getItem(keyName)) ?? defaultValue
  })

  const dispatch = React.useCallback((value) => {
    const event = new Event('proStorage')
    event.id = currentId.current
    event.key = keyName
    event.newValue = value
    window.dispatchEvent(event)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clear = React.useCallback(() => {
    localStorage.removeItem(keyName)
    dispatch(null)
    setValue(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const set = React.useCallback(
    (value) => {
      if (value === null || value === undefined) {
        clear()
      } else {
        localStorage.setItem(keyName, stringify(value))
        dispatch(value)
        setValue(value)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clear, dispatch],
  )

  const handler = React.useCallback(
    ({ id, key, newValue }) => {
      key === keyName && id !== currentId.current && set(newValue)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [set],
  )

  React.useEffect(() => {
    if (!watch) return
    window.addEventListener('proStorage', handler)
    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('proStorage', handler)
      window.removeEventListener('storage', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [value, set, clear]
}

export default useStorage
