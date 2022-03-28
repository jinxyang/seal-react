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
  const {
    xAxisNameFormatter,
    yAxisNameFormatter,
    tooltips = [],
  } = { ...defaultConfig, ...customConfig }
  if (value.length < 2) return {}

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
      left: 'right',
      top: '10%',
      dimension: 0,
      min: 0,
      max: 1,
      itemWidth: 30,
      itemHeight: 120,
      calculable: true,
      precision: 2,
      text: ['1'],
      textGap: 30,
      inRange: {
        symbolSize: [10, 70],
      },
      outOfRange: {
        symbolSize: [10, 70],
        color: ['rgba(255,255,255,0.4)'],
      },
      controller: {
        inRange: {
          color: ['#c23531'],
        },
        outOfRange: {
          color: ['#999'],
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
      // symbolSize: (value, params) => {
      //   return value[0] * value[1] * 100
      // },
    }
  })

  return {
    legend,
    tooltip,
    visualMap,
    xAxis,
    yAxis,
    series,
    animationDuration: 500,
    animationEasing: (k) => k * k * k,
    ...customOption,
  }
}

export default optionGenerator
