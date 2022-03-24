import _ from 'lodash'
import Color from 'color'

const ladderGenerator = (param, mixParam, ...funcs) => {
  const color = Color(param)

  return _.flow(
    _.map(?, (_, index) =>
      color.mix(Color(mixParam), ((index + 1) * 0.05).toFixed(2)).hex(),
    ),
    _.filter(?, (hex) => hex !== Color(mixParam).hex()),
    ...funcs,
  )(Array.from({ length: 20 }))

  // return _.filter(
  //   _.map(Array.from({ length }), (_, index) => {
  //     const weight = Number(((1 / length) * (length - index)).toFixed(2))
  //     return color.mix(Color(mixParam), weight).hex()
  //   }),
  //   (hex) => hex !== Color(mixParam).hex(),
  // )
}

export default ladderGenerator
