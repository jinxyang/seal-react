import React from 'react'
import _ from 'lodash'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

const useChart = (Chart, components = [], node = document.documentElement) => {
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
    const dom = _.isFunction(node) ? node() : node
    echarts.use([Chart, ...components, CanvasRenderer])
    setChart(echarts.init(ref.current))
    const observer = new ResizeObserver(handleResize)
    observer.observe(dom)

    return () => {
      observer.unobserve(dom)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [chart, ref]
}

export default useChart
