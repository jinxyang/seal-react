import React from 'react'
import moment from 'moment'

import View from '../View'

const weeksName = {
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
}

const Clock = ({ styles = {} }) => {
  const [date, setDate] = React.useState('')

  React.useEffect(() => {
    const timerId = setInterval(() => {
      setDate(
        moment().format('YYYY-MM-DD HH:mm:ss') +
          ' 星期' +
          weeksName[moment().day()],
      )
    }, 1000)

    return () => {
      clearInterval(timerId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View
      styles={{
        fontVariantNumeric: 'tabular-nums',
        fontWeight: 500,
        userSelect: 'none',
        ...styles,
      }}
    >
      {date}
    </View>
  )
}

export default Clock
