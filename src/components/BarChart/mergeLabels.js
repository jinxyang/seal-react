import _ from 'lodash'

const mergeLabels = (value = [], sorters = {}) => {
  const labelsByUnit = _.reduce(
    value,
    (labelsByUnit, { labelUnit = '', list = [] }) => {
      const sorter = sorters[labelUnit]
      const orderByArgs = _.isArray(sorter) ? sorter : [sorter]
      return {
        ...labelsByUnit,
        [labelUnit]: _.orderBy(
          [
            ...new Set([
              ...(labelsByUnit[labelUnit] ?? []),
              ..._.map(list, 'label'),
            ]),
          ],
          ...orderByArgs,
        ),
      }
    },
    {},
  )
  return _.map(value, (item) => {
    const mergedLabels = labelsByUnit[item.labelUnit]
    if (!mergedLabels) return item
    const values = _.keyBy(item.list, 'label')
    return {
      ...item,
      list: _.map(mergedLabels, (label) => ({
        value: values[label]?.value ?? null,
        label,
      })),
    }
  })
}

export default mergeLabels
