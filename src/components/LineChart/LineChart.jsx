import React from 'react'
import _ from 'lodash'
import { LineChart as Chart } from 'echarts/charts'
import {
  GridComponent,
  LegendPlainComponent,
  TooltipComponent,
  ToolboxComponent,
} from 'echarts/components'

import useChart from '../../hooks/useChart'
import View from '../View'
import mergeLabels from './mergeLabels'
import optionGenerator from './optionGenerator'

const LineChart = ({
  value = [],
  option: customOption = {},
  zoom = false,
  sorters = {},
  onZoom = () => {},
}) => {
  const [batches, setBatches] = React.useState([])
  const [chart, setChart] = useChart(Chart, [
    GridComponent,
    LegendPlainComponent,
    TooltipComponent,
    ToolboxComponent,
  ])

  const [option, { x }] = React.useMemo(() => {
    return optionGenerator(mergeLabels(value, sorters), customOption)
  }, [customOption, sorters, value])

  React.useEffect(() => {
    if (!batches.length) return
    const batchByUnit = _.reduce(
      _.last(batches),
      (map, { startValue, endValue }, index) => {
        const item = x[index]
        return {
          ...map,
          [item.unit]: [item.data[startValue], item.data[endValue]],
        }
      },
      {},
    )
    onZoom(_.map(value, ({ labelUnit }) => batchByUnit[labelUnit]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batches])

  React.useEffect(() => {
    setBatches([])
  }, [value])

  React.useEffect(() => {
    chart?.setOption?.(option)
    chart?.dispatchAction({
      type: 'dataZoom',
      start: 0,
      end: 100,
    })
    chart?.off?.('datazoom')
    chart?.dispatchAction?.({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: false,
    })
    if (!zoom) return

    chart?.dispatchAction?.({
      type: 'takeGlobalCursor',
      key: 'dataZoomSelect',
      dataZoomSelectActive: true,
    })
    chart?.on?.('datazoom', ({ batch }) => {
      batch && batch.length && setBatches((batches) => [...batches, batch])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, option])

  return <View ref={setChart} styles={{ height: '100%' }} />
}

export default LineChart
