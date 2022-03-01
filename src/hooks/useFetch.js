import React from 'react'
import { stringify, parse } from 'query-string'

import { useConfigState } from '../components/ConfigProvider'
import sleep from '../utils/sleep'

import useToast from './useToast'

const defaultOptions = {
  initialState: {},
  transformRequest: (...args) => args,
  transformResponse: async (response) => await response.json(),
  transformError: () => {},
}

const useFetch = (service = () => {}, callbackOrDelay, delay = 0) => {
  const [{ fetchOptions }] = useConfigState()
  const setToast = useToast()

  const { initialState, transformRequest, transformResponse, transformError } =
    React.useMemo(() => {
      return { ...defaultOptions, ...fetchOptions }
    }, [fetchOptions])

  const [[state, controller], setState] = React.useState([
    {
      ...initialState,
      loading: false,
      loaded: false,
    },
    {},
  ])

  const start = React.useCallback(
    async (...payload) => {
      controller.abort?.()

      const newController = new AbortController()
      setState(([state]) => [
        {
          ...initialState,
          loading: true,
          loaded: state.loaded,
        },
        newController,
      ])

      const {
        url = '',
        method = 'GET',
        headers = {
          'Content-Type': 'application/json; charset=utf-8',
        },
        params = {},
        data = {},
        transformRequest: customTransformRequest = (...args) => args,
        transformResponse: customTransformResponse = (response) => response,
        ...others
      } = service(...payload)

      const [path, inlineQueries = ''] = url.split('?')
      const queries = stringify({ ...params, ...parse(inlineQueries) })

      const input = path + (queries ? `?${queries}` : '')
      const init = {
        method,
        headers,
        signal: newController.signal,
        ...others,
      }

      if (method.toUpperCase() !== 'GET') {
        init.body = data instanceof FormData ? data : JSON.stringify(data)
      }

      const newRequest = new Request(
        ...customTransformRequest(
          ...transformRequest(input, init, { setToast }),
        ),
      )

      await sleep(typeof callbackOrDelay === 'number' ? callbackOrDelay : delay)

      let newState = {}
      try {
        const response = await fetch(newRequest)
        const resultState = await transformResponse(
          (await customTransformResponse(response, { setToast })) ??
            initialState,
          { setToast },
        )

        if (!response.ok) throw new Error(response.statusText)

        newState = {
          ...resultState,
          loading: false,
          loaded: true,
        }
      } catch (error) {
        newState = {
          ...initialState,
          ...transformError(error, { setToast }),
          loading: false,
          loaded: true,
        }
      }
      setState([newState, {}])
      typeof callbackOrDelay === 'function' && callbackOrDelay(newState)
      return newState
    },
    [
      callbackOrDelay,
      controller,
      delay,
      initialState,
      service,
      setToast,
      transformError,
      transformRequest,
      transformResponse,
    ],
  )

  React.useEffect(() => {
    return () => {
      controller.abort?.()
    }
  }, [controller])

  return [state, start, () => controller.abort?.()]
}

export default useFetch
