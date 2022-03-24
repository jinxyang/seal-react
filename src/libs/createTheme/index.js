import _ from 'lodash'

import defaultOptions from './defaultOptions'

import breakpointGenerator from './breakpointGenerator'
import ladderGenerator from './ladderGenerator'
import alphaGenerator from './alphaGenerator'

const createTheme = (customOptions = defaultOptions) => {
  const { breakpoints, colors, ...options } = {
    ...defaultOptions,
    ...customOptions,
  }

  return {
    breakpoints: breakpointGenerator(breakpoints),
    colors: {
      dark: {
        ..._.mapValues(colors, (color) => ({
          default: color,
          darker: ladderGenerator(color, '#000'),
          lighter: ladderGenerator(color, '#fff', _.reverse),
          transparent: alphaGenerator(color, _.reverse),
        })),
        transparent: alphaGenerator('#fff', _.reverse),
        dark: ladderGenerator('#fff', '#000'),
        light: ladderGenerator('#000', '#fff'),
        // ? useful
        darkTransparent: alphaGenerator('#000'),
        lightTransparent: alphaGenerator('#fff', _.reverse),
      },
    },
    ...options,
  }
}

export const defaultTheme = createTheme()

export default createTheme
