import React from 'react'
import { RadarChart as Chart } from 'echarts/charts'
import {
  GridComponent,
  LegendPlainComponent,
  TooltipComponent,
} from 'echarts/components'

import useChart from '../../hooks/useChart'
import View from '../View'
import optionGenerator from './optionGenerator'

const RadarChart = ({ value = [], option: customOption = {}, config = {} }) => {
  const [chart, setChart] = useChart(Chart, [
    GridComponent,
    LegendPlainComponent,
    TooltipComponent,
  ])

  const option = React.useMemo(() => {
    return optionGenerator(value, customOption, config)
  }, [config, customOption, value])

  React.useEffect(() => {
    console.log('RadarChart:', option)
    chart?.setOption?.(option)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart, option])

  return <View ref={setChart} styles={{ height: '100%' }} />
}

export default RadarChart
