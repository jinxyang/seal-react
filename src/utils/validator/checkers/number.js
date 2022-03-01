const typeChecker = ([prevPass, rule, value]) => {
  if (!prevPass || !rule.type) {
    return [prevPass, rule, value]
  }
  return [typeof value === 'number', rule, value]
}

const checker = (value, rules = []) => {
  const errorRule = rules.find((rule) => {
    const [pass] = [true, rule, value] |> typeChecker
    return !pass
  })
  return errorRule?.message
}

export default checker
