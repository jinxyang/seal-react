import React from 'react'
import _ from 'lodash'
import { ScatterChart as Chart } from 'echarts/charts'
import {
  GridComponent,
  LegendPlainComponent,
  TooltipComponent,
  ToolboxComponent,
  VisualMapComponent,
} from 'echarts/components'

import { useConfigState } from '../ConfigProvider'
import useChart from '../../hooks/useChart'
import View from '../View'
import Flex from '../Flex'
import optionGenerator from './optionGenerator'

const ScatterChart = ({
  darkMode = false,
  value = [],
  option: customOption = {},
  config = {},
}) => {
  const [{ mode }] = useConfigState()
  const [chart, setChart] = useChart(Chart, [
    GridComponent,
    LegendPlainComponent,
    TooltipComponent,
    ToolboxComponent,
    VisualMapComponent,
  ])
  const isEmpty = React.useMemo(() => {
    return !value.length || _.every(value, ({ list }) => !list?.length)
  }, [value])

  const option = React.useMemo(() => {
    return optionGenerator(
      darkMode ?? mode === 'dark',
      value,
      customOption,
      config,
    )
  }, [config, customOption, darkMode, mode, value])

  React.useEffect(() => {
    chart?.setOption?.(option)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, option])

  return (
    <View styles={{ position: 'relative', height: '100%' }}>
      <View
        ref={setChart}
        styles={{ opacity: !isEmpty ? 1 : 0, height: '100%' }}
      />
      {isEmpty && (
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

export default ScatterChart
