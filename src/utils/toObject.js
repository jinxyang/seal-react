const defaultOptions = {
  prop: 'id',
  formatter: (v) => v,
}
const toObject = (array = [], options = defaultOptions) => {
  const { prop, formatter } = { ...defaultOptions, ...options }
  return array.reduce((object, item) => {
    const newItem = formatter(item, object)
    return {
      ...object,
      ...(newItem && { [item[prop]]: newItem }),
    }
  }, {})
}

export default toObject
