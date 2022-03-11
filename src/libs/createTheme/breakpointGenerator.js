import _ from 'lodash'
import json2mq from 'json2mq'

const breakpointGenerator = (config = {}) => {
  const descPairs = _.orderBy(_.toPairs(config), (pair) => pair[1], ['desc'])
  const [values, queryStrings] = _.reduce(
    descPairs,
    ([values, queryStrings], [key, minWidth]) => {
      const maxWidth = _.last(values)?.[1]?.[0] ?? Infinity
      const newValues = [...values, [key, [minWidth, maxWidth]]]
      const newQueryStrings = {
        ...queryStrings,
        [key]: json2mq(
          _.omitBy(
            { minWidth, maxWidth },
            (value) => value === 0 || value === Infinity,
          ),
        ),
      }
      return [newValues, newQueryStrings]
    },
    [[], {}],
  )

  return {
    queryStrings,
    values,
  }
}

export default breakpointGenerator
