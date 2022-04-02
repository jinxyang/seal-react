import React from 'react'
import { RadarChart as Chart } from 'echarts/charts'
import {
  GridComponent,
  LegendPlainComponent,
  TooltipComponent,
} from 'echarts/components'

import { useConfigState } from '../ConfigProvider'
import useChart from '../../hooks/useChart'
import View from '../View'
import Flex from '../Flex'
import optionGenerator from './optionGenerator'

const RadarChart = ({
  resizeNode,
  darkMode = null,
  value = [],
  option: customOption = {},
  config = {},
}) => {
  const [{ mode }] = useConfigState()
  const [chart, setChart] = useChart(
    Chart,
    [GridComponent, LegendPlainComponent, TooltipComponent],
    resizeNode,
  )

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

export default RadarChart
