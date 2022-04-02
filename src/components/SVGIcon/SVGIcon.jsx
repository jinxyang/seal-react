import React from 'react'
import _ from 'lodash'

import View from '../View'
import useStyle from '../../hooks/useStyle'

const SVGIcon = ({
  path,
  size = null,
  color = null,
  styles = {},
  viewBox = '0 0 24 24',
}) => {
  const { color: fill, fontSize } = useStyle({
    color: color ?? 'primary.default',
    fontSize: size ?? 1,
  })

  return (
    <View
      as="svg"
      width={fontSize}
      height={fontSize}
      x="0"
      y="0"
      viewBox={viewBox}
      styles={{
        display: 'inline-block',
        verticalAlign: 'middle',
        transition: 'all 200ms ease',
        ...styles,
      }}
    >
      {_.map(_.isArray(path) ? path : [path], (path, index) => {
        const [d, selfFill] = _.isArray(path) ? path : [path]
        return <path key={index} d={d} fill={selfFill || fill} />
      })}
    </View>
  )
}

export default SVGIcon
