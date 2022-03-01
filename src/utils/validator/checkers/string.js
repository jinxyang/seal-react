const typeChecker = ([prevPass, rule, value]) => {
  if (!prevPass || !rule.type) {
    return [prevPass, rule, value]
  }
  return [typeof value === 'string', rule, value]
}

const requiredChecker = ([prevPass, rule, value]) => {
  if (!prevPass || !rule.required) {
    return [prevPass, rule, value]
  }
  const newValue = value.trim()
  return [!!newValue, rule, newValue]
}

const lengthChecker = ([prevPass, rule, value]) => {
  if (!prevPass || !rule.length) {
    return [prevPass, rule, value]
  }
  const min = Array.isArray(rule.length) ? rule.length[0] : rule.length
  const max = Array.isArray(rule.length) ? rule.length[1] ?? Infinity : Infinity
  if (value.length < min || value.length > max) {
    return [false, rule, value]
  }
  return [true, rule, value]
}

const checker = (value, rules = []) => {
  const errorRule = rules.find((rule) => {
    const [pass] =
      [true, rule, value] |> typeChecker |> requiredChecker |> lengthChecker
    return !pass
  })
  return errorRule?.message
}

export default checker
