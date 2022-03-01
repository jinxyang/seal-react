import { mapValues, omitBy, last, reverse } from 'lodash'
import json2mq from 'json2mq'

const breakpointGenerator = (config = {}) => {
  const keys = Object.keys(config).sort((a, b) => config[a] - config[b])
  const values = reverse(keys).reduce((points, key) => {
    const mix = config[key]
    const max = last(points)?.[1]?.[0] ?? Infinity
    return [...points, [key, [mix, max - 1]]]
  }, [])

  const queryStrings = mapValues(
    Object.fromEntries(values),
    ([minWidth, maxWidth]) =>
      json2mq(
        omitBy(
          { minWidth, maxWidth },
          (value) => value === 0 || value === Infinity,
        ),
      ),
  )
  return {
    queryStrings,
    values,
    defaultPoint: last(keys),
  }
}

export default breakpointGenerator
