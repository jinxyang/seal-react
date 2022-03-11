import _ from 'lodash'

import generator from './generator'

const defaultOptions = {
  inputComponentMap: {},
  outputComponentMap: {},
}

const createFields = (
  global = {},
  categories = {},
  customOptions = defaultOptions,
) => {
  const options = { ...defaultOptions, ...customOptions }
  const globalFields = generator({}, global, options)
  return Object.keys(categories).reduce((fields, name) => {
    return {
      ...fields,
      [name]: _.omit(
        generator(globalFields, categories[name], options),
        'model',
      ),
    }
  }, {})
}

export default createFields
