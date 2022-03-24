import React from 'react'
import _ from 'lodash'

import Flex from '../Flex'
import TabsItem from './TabsItem'

const Tabs = ({
  value,
  options = [],
  direction,
  onChange = () => {},
  children,
}) => {
  return (
    <Flex
      gap={0.3}
      direction={direction}
      blur
      styles={{
        flex: '0 0 auto',
        padding: 0.3,
        backgroundColor: ({ theme }) => theme.colors.primary.transparent[15],
        borderRadius: 1,
      }}
    >
      {children
        ? _.map(
            React.Children.toArray(children),
            (child) =>
              React.isValidElement(child) &&
              React.cloneElement(child, {
                active: child.props.value === value,
                styles: {
                  flex: 1,
                  ...child.styles,
                },
                onClick: () => onChange(child.props.value),
              }),
          )
        : _.map(options, (item) => (
            <TabsItem
              key={item.value}
              active={item.value === value}
              onClick={() => onChange(item.value)}
            >
              {item.label}
            </TabsItem>
          ))}
    </Flex>
  )
}

export default Tabs
