const requiredChecker = ([prevPass, rule, value]) => {
  if (!prevPass || !rule.required) {
    return [prevPass, rule, value]
  }
  const newValue = String(value).trim()
  return [!!newValue, rule, newValue]
}

const urlChecker = ([prevPass, rule, value]) => {
  if (!prevPass) {
    return [prevPass, rule, value]
  }
  const pass = value ? value.indexOf('http://') === 0 : true
  return [pass, rule, value]
}

const checker = (value, rules = []) => {
  const errorRule = rules.find((rule) => {
    const [pass] = [true, rule, value] |> requiredChecker |> urlChecker
    return !pass
  })
  return errorRule?.message
}

export default checker
