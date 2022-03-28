import React from 'react'
import _ from 'lodash'

const Tooltip = ({ param = {}, value: rawValue = [], list = [] }) => {
  const { componentIndex, value } = param
  const { name, labelName, valueName } = rawValue[componentIndex]

  const items = list.length
    ? [
        ..._.map(list, ([key, label], index) => ({
          label,
          value: value[index],
        })),
      ]
    : [
        { label: labelName, value: value[0] },
        { label: valueName, value: value[1] },
      ]
  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 'bold' }}>{name}</div>
      {_.map(items, (item) => (
        <div key={item.label}>
          {_.isFunction(item.label) ? item.label(item) : item.label}:{' '}
          {item.value}
        </div>
      ))}
    </div>
  )
}

export default Tooltip
