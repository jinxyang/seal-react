import React from 'react'

import { useStorage } from 'hooks'

import reducer from './reducer'
import { UPDATE_USER } from './types'

const initialState = {
  user: { name: 'jinx' },
}

const GlobalContext = React.createContext(initialState)

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const [token, setToken] = useStorage('token', null, true)

  const actions = React.useMemo(() => {
    return {
      login: (token) => {
        setToken(token)
      },
      logout: () => {
        setToken(null)
      },
      updateUser: (user = {}) => {
        dispatch({
          type: UPDATE_USER,
          user,
        })
      },
    }
  }, [setToken])

  return (
    <GlobalContext.Provider value={[{ ...state, token }, actions]}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalState = () => React.useContext(GlobalContext)
