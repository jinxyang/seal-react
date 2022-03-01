import React from 'react'

import defaultValidator from '../../utils/validator'
import Grid from '../Grid'
import Flex from '../Flex'

const FormItem = ({
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
    <Grid.Item>
      <Flex direction="column" gap={0.25}>
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
