import React from 'react'
import _ from 'lodash'

import { useConfigState } from '../ConfigProvider'
import Grid from '../Grid'
import Flex from '../Flex'

import FormItem from './FormItem'
import builtInComponents from './components'

const Form = ({
  fields = [],
  values = {},
  errorShow = false,
  direction = 'column',
  columns = 1,
  gap = 1,
  styles = {},
  onInit = () => {},
  onChange = () => {},
  onError = () => {},
  onSubmit = () => {},
  children,
  ...props
}) => {
  const [{ inputComponents }] = useConfigState()
  const [errors, setErrors] = React.useState({})

  const inputs = React.useMemo(() => {
    return { ...builtInComponents, ...inputComponents }
  }, [inputComponents])

  const handleChange = React.useCallback(
    (key, value) => {
      onChange({ ...values, [key]: value })
    },
    [onChange, values],
  )

  const handleError = React.useCallback((key, message) => {
    setErrors((errors) => ({ ...errors, [key]: message }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  React.useEffect(() => {
    onError(_.omitBy(errors, _.isString))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  React.useEffect(() => {
    const defaultValues = {
      ..._.reduce(
        fields,
        (values, { key, value }) => ({
          ...values,
          ...(value != null && { [key]: value }),
        }),
        {},
      ),
      ...values,
    }
    onInit(defaultValues)
    onChange(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Flex
      {...props}
      as="form"
      direction={direction}
      gap={gap}
      styles={styles}
      onSubmit={handleSubmit}
    >
      <Grid columns={columns} gap={gap} styles={{ flex: 1 }}>
        {fields.map((field) => {
          // TODO: into FormItem(rename: FormField)
          const {
            component = '',
            key = '',
            label = '',
            render,
            rules = [],
            validator,
            block = false,
            column = 1,
            row = 1,
            styles = {},
            ...props
          } = typeof field === 'function' ? field(values) : field

          const Input =
            render?.(values) ??
            inputs[_.isString(component) && component] ??
            component

          if (!_.isObject(Input)) return null

          const value = _.get(values, key)

          return (
            <FormItem
              gap={gap}
              block={block}
              column={column}
              row={row}
              styles={styles}
              key={key}
              value={value}
              label={label}
              rules={rules}
              errorShow={errorShow}
              validator={validator}
              onError={(message) => handleError(key, message)}
            >
              <Input
                block
                {...props}
                value={value}
                onChange={(value) => handleChange(key, value)}
              />
            </FormItem>
          )
        })}
      </Grid>
      {children}
    </Flex>
  )
}

export default Form
