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

const optionGenerator = (value = [], customOption = {}, customConfig = {}) => {
  if (value.length < 2) return {}

  const {
    xAxisNameFormatter,
    yAxisNameFormatter,
    tooltips = [],
  } = { ...defaultConfig, ...customConfig }

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
  const visualMap = [
    {
      top: 10,
      right: 0,
      dimension: 0,
      min: 0,
      max: 1,
      itemWidth: 20,
      itemHeight: 100,
      calculable: true,
      precision: 2,
      text: ['1'],
      inRange: {
        symbolSize: [5, 40],
      },
      outOfRange: {
        symbolSize: [5, 40],
        color: ['rgba(0, 0, 0, .1)'],
      },
      controller: {
        inRange: {
          color: [colors[0]],
        },
        outOfRange: {
          color: ['rgba(0, 0, 0, .1)'],
        },
      },
    },
  ]
  const xAxis = {
    type: 'value',
    name:
      xAxisNameFormatter({
        name: value[0].labelName,
        unit: value[0].labelUnit,
      }) ?? value[0].labelName,
  }
  const yAxis = {
    type: 'value',
    name:
      yAxisNameFormatter({
        name: value[0].valueName,
        unit: value[0].valueUnit,
      }) ?? value[0].valueName,
  }

  const series = _.map(value, ({ name, list = [] }, index) => {
    return {
      type: 'scatter',
      name,
      data: _.map(list, (item) =>
        _.map(tooltips.length ? tooltips : [['label'], ['value']], ([key]) =>
          _.get(item, key),
        ),
      ),
      lineStyle: {
        color: colors[index],
        // width: 3,
        // cap: 'round',
        // shadowColor: Color(colors[index]).fade(0.2).string(),
        // shadowBlur: 6,
        // shadowOffsetX: -1,
        // shadowOffsetY: 3,
      },
    }
  })

  const option = {
    legend,
    tooltip,
    visualMap,
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
