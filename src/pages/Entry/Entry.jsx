import React from 'react'

import { useGlobalState } from 'contexts'
import { APIs } from 'config'
import { fields } from 'meta'
import { joinPath } from 'utils'
import { ConfigProvider } from 'components'

import Layout from '../Layout'
import Login from '../Login'

const Entry = () => {
  const [{ token }] = useGlobalState()

  const fetchOptions = React.useMemo(() => {
    return {
      initialState: {
        code: 0,
        data: {},
        message: '',
      },
      transformRequest: (input, init) => {
        const [apiType, path] = ['default', ...input.split('::')].slice(-2)
        const baseUrl = APIs[apiType]
        const newInput =
          input.indexOf('http') === 0 ? input : joinPath(baseUrl, path)
        return [newInput, init]
      },
      transformResponse: async (responseOrResult) => {
        const result =
          responseOrResult instanceof Response
            ? await responseOrResult.json()
            : responseOrResult
        if (result.code !== 0) {
          throw new Error(result.message)
        }
        return result
      },
      transformError: (error, { setToast }) => {
        setToast(error.message, 'error')
        return {
          code: 1,
          data: {},
          message: error.message,
        }
      },
    }
  }, [])

  return (
    <ConfigProvider
      fields={fields}
      fetchOptions={fetchOptions}
      toastOptions={{ hover: true }}
    >
      {token ? <Layout /> : <Login />}
    </ConfigProvider>
  )
}

export default Entry
