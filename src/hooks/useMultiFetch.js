import React from 'react'
import _ from 'lodash'
import { nanoid } from 'nanoid'

import useFetch from './useFetch'

const defaultId = nanoid()

const initialState = {
  loading: false,
  loaded: false,
  list: [],
}

const useMultiFetch = (service = () => {}, callbackOrDelay, delay = 0) => {
  const prevId = React.useRef(defaultId)
  const id = React.useRef(defaultId)

  const [state, setState] = React.useState({
    [defaultId]: {
      loading: false,
      loaded: false,
      list: [],
    },
  })
  const fetch = useFetch(service, { autoAbort: false })[1]

  const start = React.useCallback(
    async (payloadList) => {
      const newId = nanoid()

      id.current = newId

      setState((state) => ({
        ...state,
        [newId]: { loading: true, ...initialState },
      }))

      const list = await Promise.all(_.map(payloadList, fetch))

      setState((state) => ({
        ...state,
        [newId]: { loading: false, loaded: true, list },
      }))
      prevId.current = newId
    },
    [fetch],
  )

  return [state[id.current], start, () => (id.current = prevId.current)]
}

export default useMultiFetch
