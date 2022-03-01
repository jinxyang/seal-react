import React from 'react'
import styled from 'styled-components'

import useStyle from '../../hooks/useStyle'

const StyledGridItem = styled.div`
  ${({ $style }) => $style};
`

const styleConfig = [
  [
    'column',
    [
      'grid-column-end',
      (column) => (typeof column === 'number' ? `span ${column}` : column),
    ],
  ],
  [
    'row',
    ['grid-row-end', (row) => (typeof row === 'number' ? `span ${row}` : row)],
  ],
]

const GridItem = (props) => {
  const { as = 'div', children } = props
  const style = useStyle(styleConfig, props)
  return (
    <StyledGridItem as={as} $style={style}>
      {children}
    </StyledGridItem>
  )
}

export default GridItem
