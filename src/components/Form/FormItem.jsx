import React from 'react'
import _ from 'lodash'

import defaultValidator from '../../utils/validator'
import Grid from '../Grid'
import Flex from '../Flex'

const FormItem = ({
  gap = 1,
  block = false,
  column = 1,
  row = 1,
  styles = {},
  value,
  label = '',
  rules = [],
  errorShow = false,
  validator = defaultValidator,
  onError = () => {},
  children,
}) => {
  const message = React.useMemo(() => {
    return rules.length ? validator(value, rules) : ''
  }, [rules, validator, value])

  const required = React.useMemo(() => {
    return !!rules.find(({ required }) => required)
  }, [rules])

  React.useEffect(() => {
    onError(message)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return (
    <Grid.Item block={block} column={column} row={row} styles={styles}>
      <Flex
        direction="column"
        gap={({ responsive }) => _.toInteger(responsive(gap) / 4)}
      >
        <Flex.Item>
          <label>
            {required && <span>*</span>}
            {label}
          </label>
        </Flex.Item>
        <Flex.Item>{children}</Flex.Item>
        {errorShow && message && <Flex.Item>{message}</Flex.Item>}
      </Flex>
    </Grid.Item>
  )
}

export default FormItem
