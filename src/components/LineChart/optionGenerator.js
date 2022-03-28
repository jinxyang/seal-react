import _ from 'lodash'
import Color from 'color'

const colors = [
  '#1890ff',
  '#52c41a',
  '#13c2c2',
  '#fa8c16',
  '#a0d911',
  '#cbb0e3',
]

const defaultConfig = {
  xAxisNameFormatter: () => null,
  xAxisLabelFormatter: () => null,
  yAxisNameFormatter: () => null,
  yAxisLabelFormatter: () => null,
}

const optionGenerator = (
  darkMode = false,
  value = [],
  customOption = {},
  customConfig = {},
) => {
  const config = { ...defaultConfig, ...customConfig }

  const x = _.flow(
    _.uniqBy(?, 'labelUnit'),
    _.map(?, ({ labelName, labelUnit, list }) => ({
      name: labelName,
      unit: labelUnit,
      data: _.map(list, 'label'),
    })),
  )(value)
  const y = _.flow(
    _.uniqBy(?, 'valueUnit'),
    _.map(?, ({ valueName, valueUnit }) => ({
      name: valueName,
      unit: valueUnit,
    })),
  )(value)

  const textColor = darkMode ? '#aaa' : '#555'
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
      inactiveBorderWidth: 0,
    })),
  }
  const toolbox = {
    feature: {
      dataZoom: {
        show: true,
        yAxisIndex: 'none',
        iconStyle: {
          opacity: 0,
        },
        brushStyle: {
          color: 'rgba(0, 0, 0, .1)',
        },
      },
    },
  }
  const nameTextStyle = {
    color: textColor,
  }
  const axisLine = {
    show: false,
  }
  const axisTick = {
    show: false,
  }
  const axisLabel = {
    color: darkMode ? '#aaa' : '#555',
  }
  const splitLine = {
    show: true,
    interval: 4,
    lineStyle: {
      color: lineColor,
      type: [2, 2],
      cap: 'round',
    },
  }
  const tooltip = {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: 'rgba(0, 0, 0, .1)',
        width: 5,
        type: 'solid',
      },
    },
  }
  const xAxis = _.map(x, (axis) => ({
    type: 'category',
    name: config.xAxisNameFormatter(axis),
    nameTextStyle,
    boundaryGap: false,
    axisLabel: {
      formatter: config.xAxisLabelFormatter(axis),
      ...axisLabel,
    },
    axisLine,
    axisTick,
    splitLine,
    data: _.map(axis.data),
  }))
  const yAxis = _.map(y, (axis) => ({
    type: 'value',
    name: config.yAxisNameFormatter(axis) ?? axis.name,
    nameTextStyle,
    axisLine,
    axisTick,
    axisLabel: {
      formatter: config.yAxisLabelFormatter(axis),
      ...axisLabel,
    },
    splitLine,
  }))

  const series = _.map(
    value,
    (
      { name, valueName, valueUnit, labelName, labelUnit, list = [] },
      index,
    ) => {
      return {
        type: 'line',
        name,
        data: _.map(list, 'value'),
        xAxisIndex: _.findIndex(x, ({ name }) => name === labelName),
        yAxisIndex: _.findIndex(y, ({ name }) => name === valueName),
        connectNulls: true,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        clip: false,
        lineStyle: {
          color: colors[index],
          width: 3,
          cap: 'round',
          shadowColor: Color(colors[index]).fade(0.2).string(),
          shadowBlur: 6,
          shadowOffsetX: -1,
          shadowOffsetY: 3,
        },
        itemStyle: {
          color: '#fff',
          borderColor: Color(colors[index]).darken(0.2).string(),
          borderWidth: 1,
          shadowColor: Color(colors[index]).darken(0.2).fade(0.5).string(),
          shadowBlur: 3,
          shadowOffsetX: -1,
          shadowOffsetY: 1,
        },
        emphasis: {
          disabled: false,
          focus: 'self',
        },
      }
    },
  )

  const option = {
    legend,
    tooltip,
    toolbox,
    xAxis,
    yAxis,
    series,
    animationDuration: 500,
    animationEasing: (k) => k * k * k,
  }

  return [
    {
      ...option,
      ..._.mapValues(customOption, (value, key) =>
        _.isFunction(value) ? value(option[key]) : value,
      ),
    },
    { x, y },
  ]
}

export default optionGenerator
