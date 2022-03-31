import _ from 'lodash'

const defaultConfig = {
  colors: ['#1890ff', '#52c41a', '#13c2c2', '#fa8c16', '#a0d911', '#cbb0e3'],
}

const optionGenerator = (
  darkMode,
  value = [],
  customOption = {},
  customConfig = {},
) => {
  if (!value.length) return {}
  const { colors } = { ...defaultConfig, ...customConfig }
  const lineColor = darkMode ? 'rgba(255, 255, 255, .2)' : 'rgba(0, 0, 0, .2)'

  const legend = {
    data: _.map(value, ({ name }, index) => ({
      name,
      textStyle: {
        color: colors[index],
        lineHeight: 15,
        padding: [0, 6, 0, 0],
      },
      itemStyle: { color: colors[index], borderWidth: 0 },
      lineStyle: { width: 2 },
      inactiveColor: lineColor,
      inactiveBorderColor: lineColor,
    })),
  }
  const radar = {
    indicator: _.map(value[0].list, (item) =>
      _.pick(item, ['name', 'min', 'max']),
    ),
    // indicator: _.flow(
    //   _.map(?, 'list'),
    //   (lists) => _.zip(...lists),
    //   _.map(
    //     ?,
    //     _.flow(
    //       _.maxBy(?, 'value'),
    //       _.omit(?, 'unit'),
    //       _.mapKeys(?, (value, key) => (key === 'value' ? 'max' : key)),
    //     ),
    //   ),
    // )(value),
  }

  const series = [
    {
      type: 'radar',
      symbol: 'none',
      data: _.map(value, ({ name, list = [] }, index) => {
        return {
          name,
          value: _.map(list, ({ value }) => value),
          itemStyle: {
            color: colors[index],
          },
        }
      }),
    },
  ]

  const option = {
    legend,
    radar,
    series,
    animationDuration: 500,
    animationEasing: (k) => k * k * k,
  }

  return {
    ...option,
    ..._.mapValues(customOption, (value, key) =>
      _.isFunction(value) ? value(option[key]) : value,
    ),
  }
}

export default optionGenerator
