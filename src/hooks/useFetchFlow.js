import React from 'react'
import _ from 'lodash'
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

const useFetch = (services = [], callbackOrDelay, delay = 0) => {
  const [{ fetchOptions }] = useConfigState()
  const setToast = useToast()

  const { initialState, transformRequest, transformResponse, transformError } =
    React.useMemo(() => {
      return { ...defaultOptions, ...fetchOptions }
    }, [fetchOptions])

  const [list, setList] = React.useState([])

  const stateList = React.useMemo(() => {
    return _.map(list, (item) => item[0])
  }, [list])

  const abort = React.useCallback(() => {
    _.forEach(list, (item) => item?.[1]?.abort?.())
  }, [list])

  const start = React.useCallback(
    async (payloads = []) => {
      await sleep(typeof callbackOrDelay === 'number' ? callbackOrDelay : delay)

      for await (const [index, service] of _.toPairs(services)) {
        list?.[index]?.[1]?.abort?.()

        const newController = new AbortController()
        setList((list) => {
          const newList = [...list]
          newList[index] = [
            {
              ...initialState,
              loading: true,
              loaded: list[index]?.[0].loaded ?? false,
            },
            newController,
          ]
          return newList
        })

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
        } = service(payloads[index])

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
        setList((list) => {
          const newList = [...list]
          newList[index] = [newState]
          return newList
        })
      }
      // typeof callbackOrDelay === 'function' && callbackOrDelay(stateList)
    },
    [
      callbackOrDelay,
      delay,
      initialState,
      list,
      services,
      setToast,
      transformError,
      transformRequest,
      transformResponse,
    ],
  )

  React.useEffect(() => {
    return () => {
      abort()
    }
  }, [abort])

  return [stateList, start, abort]
}

export default useFetch
