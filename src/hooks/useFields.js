import { useConfigState } from '../components/ConfigProvider'

const useFields = (type = '', defaultName = '', keys = []) => {
  const [{ fields }] = useConfigState()

  return keys
    .map((keyOrWithName) => {
      const [name, keyWithProps] = keyOrWithName.includes('.')
        ? keyOrWithName.split('.')
        : [defaultName, keyOrWithName]
      const [key, props] = Array.isArray(keyWithProps)
        ? keyWithProps
        : [keyWithProps, {}]
      const field = fields?.[name]?.[type]?.[key]
      if (!field) return null

      return typeof props === 'function' ? props(field) : { ...field, ...props }
    })
    .filter(Boolean)
}

export default useFields
