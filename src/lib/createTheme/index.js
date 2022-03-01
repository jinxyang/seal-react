import defaultOptions from './defaultOptions'
import breakpointGenerator from './breakpointGenerator'

const createTheme = (customOptions = defaultOptions) => {
  const { breakpoints, ...options } = { ...defaultOptions, ...customOptions }

  return {
    breakpoints: breakpointGenerator(breakpoints),
    ...options,
  }
}

export const defaultTheme = createTheme()

export default createTheme
