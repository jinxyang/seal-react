import React from 'react'
import { nanoid } from 'nanoid'

import { useConfigState } from '../components/ConfigProvider'

const useToast = () => {
  const { setToasts } = useConfigState()[1]

  const setToast = React.useCallback(
    (text = '', typeOrOptions) => {
      setToasts((list) => {
        const [prev, next] = list

        const options =
          typeof typeOrOptions === 'string'
            ? { type: typeOrOptions }
            : typeOrOptions

        const newToast = {
          id: nanoid(),
          show: true,
          text,
          ...options,
        }

        return list.length
          ? [{ ...(next ?? prev), show: false }, newToast]
          : [newToast]
      })
    },
    [setToasts],
  )

  return setToast
}

export default useToast
