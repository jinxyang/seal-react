import React from 'react'

import { defaultTheme } from '../../libs/createTheme'
import useBreakpoint from '../../hooks/useBreakpoint'
import PortalToasts from '../PortalToasts'

const ConfigContext = React.createContext({})

const ConfigProvider = ({
  mode = 'dark',
  theme = defaultTheme,
  fetchOptions = {},
  fields = {},
  inputSize = 10,
  inputComponents = {},
  outputComponents = {},
  toastOptions = {},
  chartOptions = {},
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
      theme: {
        ...theme,
        colors: theme.colors[mode],
      },
      toastOptions,
      chartOptions,
    }
  }, [
    breakpoints,
    chartOptions,
    fetchOptions,
    fields,
    inputComponents,
    inputSize,
    mode,
    outputComponents,
    theme,
    toastOptions,
  ])

  React.useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <ConfigContext.Provider value={[state, { setToasts }]}>
      {children}
      <PortalToasts list={toasts} onClose={handleToastClose} />
    </ConfigContext.Provider>
  )
}

export default ConfigProvider

export const useConfigState = () => React.useContext(ConfigContext)
