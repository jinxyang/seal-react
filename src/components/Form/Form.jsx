import React from 'react'
import { get } from 'lodash'

import toObject from '../../utils/toObject'
import dropProp from '../../utils/dropProp'
import { useConfigState } from '../ConfigProvider'
import Grid from '../Grid'

import FormItem from './FormItem'
import builtInComponents from './components'

const Form = ({
  fields = [],
  values = {},
  errorShow = false,
  onInit = () => {},
  onChange = () => {},
  onError = () => {},
  onSubmit = () => {},
  children,
  // for Grid
  columns = 1,
  gap = 1,
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
    onError(dropProp(errors, ({ value }) => !!value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors])

  React.useEffect(() => {
    const defaultValues = {
      ...toObject(
        fields.filter(({ value }) => !!value),
        { prop: 'key', formatter: ({ value }) => value },
      ),
      ...values,
    }
    onInit(defaultValues)
    onChange(defaultValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid
      as="form"
      columns={columns}
      gap={gap}
      asProps={{
        onSubmit: handleSubmit,
      }}
    >
      {fields.map((field) => {
        const {
          component = '',
          key = '',
          label = '',
          render,
          rules = [],
          validator,
          ...props
        } = typeof field === 'function' ? field(values) : field

        const Input =
          render?.(values) ?? typeof component === 'string'
            ? inputs[component]
            : component
        if (!Input) return null

        const value = get(values, key)

        return (
          <FormItem
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
      <Grid.Item>{children}</Grid.Item>
    </Grid>
  )
}

export default Form
