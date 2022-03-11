const generator = (
  global = {},
  category = {},
  { inputComponentMap, outputComponentMap },
) => {
  const model = { ...global.model, ...category.model }
  const getFields = (fieldType) => {
    const componentMap =
      fieldType === 'inputs' ? inputComponentMap : outputComponentMap

    return Object.keys(model).reduce((map, key) => {
      const { type, label, key: defaultKey } = model[key]

      const globalField = {
        key: defaultKey || key,
        label,
        component: componentMap[type],
        ...global[fieldType]?.[key],
      }

      const props = category[fieldType]?.[key]
      if (!props)
        return {
          ...map,
          [key]: globalField,
        }

      const field = typeof props === 'function' ? props(globalField) : props

      return {
        ...map,
        [key]: {
          ...globalField,
          ...field,
        },
      }
    }, {})
  }

  return {
    model,
    inputs: getFields('inputs'),
    outputs: getFields('outputs'),
  }
}

export default generator
