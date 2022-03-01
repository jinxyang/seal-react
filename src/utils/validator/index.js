import checkers from './checkers'

const typeOf = (value) => {
  const string = Object.prototype.toString.call(value)
  return string.substring(8, string.length - 1).toLowerCase()
}

const validator = (value, rules) => {
  const type = rules.find(({ type }) => !!type)?.type ?? typeOf(value)
  const message = checkers[type]?.(value, rules) ?? ''
  return message
}

export default validator
