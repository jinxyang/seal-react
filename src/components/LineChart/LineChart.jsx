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
import Flex from '../Flex'
import mergeLabels from './mergeLabels'
import optionGenerator from './optionGenerator'

const LineChart = ({
  darkMode = false,
  value = [],
  option: customOption = {},
  zoom = false,
  config = {},
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
    return optionGenerator(
      darkMode,
      mergeLabels(value, sorters),
      customOption,
      config,
    )
  }, [config, customOption, darkMode, sorters, value])

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
    // TODO: end = 100?
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

  return (
    <View styles={{ position: 'relative', height: '100%' }}>
      <View
        ref={setChart}
        styles={{ opacity: value.length ? 1 : 0, height: '100%' }}
      />
      {!value.length && (
        <Flex
          main="center"
          cross="center"
          styles={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          暂无数据
        </Flex>
      )}
    </View>
  )
}

export default LineChart
