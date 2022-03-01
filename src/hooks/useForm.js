import React from 'react'

import useFetch from './useFetch'
import useFields from './useFields'

const defaultOptions = {
  defaultValues: {},
  silent: false,
  onSubmitted: () => {},
}

const useForm = (
  service = () => {},
  [name, list],
  customOptions = defaultOptions,
) => {
  const { defaultValues, silent, onSubmitted } = React.useMemo(() => {
    return { ...defaultOptions, ...customOptions }
  }, [customOptions])

  const [initialValues, setInitialValues] = React.useState()
  const [values, setValues] = React.useState(defaultValues)
  const [errors, setErrors] = React.useState({})
  const [errorShow, setErrorShow] = React.useState(false)
  const fields = useFields('inputs', name, list)

  const [state, submit, abort] = useFetch(service, onSubmitted)

  const hasError = React.useMemo(() => {
    return !!Object.values(errors).length
  }, [errors])

  const handleSubmit = React.useCallback(async () => {
    setErrorShow(hasError && !silent)
    if (hasError) return
    submit(values)
  }, [hasError, silent, submit, values])

  const handleReset = React.useCallback(() => {
    setValues(initialValues)
  }, [initialValues])

  return [
    {
      fields,
      values,
      errorShow,
      onInit: setInitialValues,
      onChange: setValues,
      onError: setErrors,
      onSubmit: handleSubmit,
    },
    {
      hasError,
      reset: handleReset,
      state,
      abort,
    },
  ]
}

export default useForm
