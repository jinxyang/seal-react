import React from 'react'
import _ from 'lodash'

import { useConfigState } from '../ConfigProvider'
import Flex from '../Flex'

import WidgetWrapper from './WidgetWrapper'
import Clock from '../Clock'
import DarkMode from '../DarkMode'
import Exit from '../Exit'

const builtInWidgets = {
  Clock,
  DarkMode,
  Exit,
}

const MenuBar = ({ position = 'top', widgets = ['Clock'], children }) => {
  const [{ mode }] = useConfigState()
  return (
    <Flex
      blur
      main="space-between"
      styles={{
        position: 'sticky',
        top: 0,
        padding: 0.2,
        backgroundColor: 'transparent[0]',
        boxShadow: '0 1px 2px rgba(0, 0, 0, .1)',
      }}
    >
      <Flex cross="center" styles={{ flex: 1 }}>
        {children && <Flex.Item>{children}</Flex.Item>}
      </Flex>
      <Flex gap={0} cross="center" wrap="wrap">
        {_.map(widgets, (widget, index) => {
          const [name, { onClick, ...props } = {}] = _.isArray(widget)
            ? widget
            : [widget]

          const Widget = _.isFunction(name) ? name : builtInWidgets[name]
          if (!Widget) return null

          return (
            <WidgetWrapper key={name} onClick={onClick}>
              <Widget {...props} size={1.5} mode={mode} key={name} />
            </WidgetWrapper>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default MenuBar
