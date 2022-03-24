import React from 'react'
import _ from 'lodash'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

const useChart = (Chart, components = []) => {
  const ref = React.useRef(null)
  const [chart, setChart] = React.useState(null)

  const handleResize = _.debounce(() => {
    setChart((chart) => {
      chart?.resize?.()
      return chart
    })
  }, 300)

  React.useEffect(() => {
    // ? chart, useful?
    if (chart || !ref.current) return

    echarts.use([Chart, ...components, CanvasRenderer])
    setChart(echarts.init(ref.current))
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [chart, ref]
}

export default useChart
