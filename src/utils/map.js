const map = (arrayOrObject, iterator = (e) => e) => {
  if (Array.isArray(arrayOrObject)) {
    return [].map(iterator, arrayOrObject)
  }
  return Object.fromEntries(
    Object.entries(arrayOrObject).map(([key, value]) =>
      iterator(value, key, arrayOrObject),
    ),
  )
}

export default map
