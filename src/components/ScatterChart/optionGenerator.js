import React from 'react'
import { renderToString } from 'react-dom/server'
import _ from 'lodash'
// import Color from 'color'

import Tooltip from './Tooltip'

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
  yAxisNameFormatter: () => null,
}

const optionGenerator = (
  darkMode,
  value = [],
  customOption = {},
  customConfig = {},
) => {
  if (value.length < 2) return {}

  const {
    xAxisNameFormatter,
    yAxisNameFormatter,
    tooltips = [],
  } = { ...defaultConfig, ...customConfig }

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

  const tooltip = {
    formatter: (param) =>
      renderToString(<Tooltip param={param} value={value} list={tooltips} />),
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
    color: textColor,
  }
  const splitLine = {
    show: true,
    lineStyle: {
      color: lineColor,
      type: [4, 4],
      cap: 'round',
    },
  }
  const xAxis = {
    type: 'value',
    name:
      xAxisNameFormatter({
        name: value[0].labelName,
        unit: value[0].labelUnit,
      }) ?? value[0].labelName,
    nameTextStyle,
    axisLine,
    axisTick,
    axisLabel,
    splitLine,
  }
  const yAxis = {
    type: 'value',
    name:
      yAxisNameFormatter({
        name: value[0].valueName,
        unit: value[0].valueUnit,
      }) ?? value[0].valueName,
    nameTextStyle,
    axisLine,
    axisTick,
    axisLabel,
    splitLine,
  }

  const series = _.map(value, ({ name, list = [] }, index) => {
    return {
      type: 'scatter',
      name,
      data: _.map(list, (item) => [
        ..._.map(tooltips.length ? tooltips : [['label'], ['value']], ([key]) =>
          _.get(item, key),
        ),
        item.name,
      ]),
    }
  })

  const option = {
    color: colors,
    legend,
    tooltip,
    xAxis,
    yAxis,
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
