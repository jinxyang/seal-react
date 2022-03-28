import _ from 'lodash'
// import Color from 'color'

const colors = [
  '#1890ff',
  '#52c41a',
  '#13c2c2',
  '#fa8c16',
  '#a0d911',
  '#cbb0e3',
]

const optionGenerator = (value = [], customOption = {}, customConfig = {}) => {
  console.log(1, value)
  if (!value.length) return {}

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
      inactiveBorderWidth: 0,
    })),
  }

  const radar = {
    indicator: _.flow(
      _.map(?, 'list'),
      (lists) => _.zip(...lists),
      _.map(
        ?,
        _.flow(
          _.maxBy(?, 'value'),
          _.omit(?, 'unit'),
          _.mapKeys(?, (value, key) => (key === 'value' ? 'max' : key)),
        ),
      ),
    )(value),
  }

  const series = [
    {
      type: 'radar',
      data: _.map(value, ({ name, list = [] }) => {
        return {
          name,
          value: _.map(list, ({ value }) => value),
        }
      }),
    },
  ]

  return {
    legend,
    radar,
    series,
    animationDuration: 500,
    animationEasing: (k) => k * k * k,
    ...customOption,
  }
}

export default optionGenerator
