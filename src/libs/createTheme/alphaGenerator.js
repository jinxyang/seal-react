import Color from 'color'
import _ from 'lodash'

const alphaGenerator = (param, ...funcs) => {
  const color = Color(param)

  return _.flow(
    _.map(?, (_, index) =>
      color
        .alpha(((index + 1) * 0.05).toFixed(2))
        .rgb()
        .toString(),
    ),
    ...funcs,
  )(Array.from({ length: 19 }))
}

export default alphaGenerator
