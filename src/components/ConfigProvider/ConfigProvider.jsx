import React from 'react'

import { defaultTheme } from '../../lib/createTheme'
import useBreakpoint from '../../hooks/useBreakpoint'
import PortalToasts from '../PortalToasts'

const ConfigContext = React.createContext({})

const ConfigProvider = ({
  theme = defaultTheme,
  fetchOptions = {},
  fields = {},
  inputSize = 10,
  inputComponents = {},
  outputComponents = {},
  toastOptions = {},
  children,
}) => {
  const [toasts, setToasts] = React.useState([])
  const breakpoints = useBreakpoint(theme.breakpoints.values)

  const handleToastClose = React.useCallback((id) => {
    setToasts((toasts) => {
      return toasts.map((toast) =>
        toast.id === id ? { ...toast, show: false } : toast,
      )
    })
  }, [])

  const state = React.useMemo(() => {
    return {
      breakpoints,
      fetchOptions,
      fields,
      inputComponents,
      inputSize,
      outputComponents,
      theme,
      toastOptions,
    }
  }, [
    breakpoints,
    fetchOptions,
    fields,
    inputComponents,
    inputSize,
    outputComponents,
    theme,
    toastOptions,
  ])

  return (
    <ConfigContext.Provider value={[state, { setToasts }]}>
      {children}
      <PortalToasts list={toasts} onClose={handleToastClose} />
    </ConfigContext.Provider>
  )
}

export default ConfigProvider

export const useConfigState = () => React.useContext(ConfigContext)
