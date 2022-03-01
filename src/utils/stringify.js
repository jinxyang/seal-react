const stringify = (value) => {
  return typeof value === 'string' || typeof value === 'number'
    ? value
    : JSON.stringify(value)
}

export default stringify
