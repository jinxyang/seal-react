const dropProp = (object, propOrFilter = () => true) => {
  if (typeof propOrFilter === 'function') {
    return Object.fromEntries(
      Object.entries(object).filter(([key, value]) =>
        propOrFilter({ key, value }),
      ),
    )
  } else {
    const { [propOrFilter]: _, ...newObject } = object
    return newObject
  }
}

export default dropProp
