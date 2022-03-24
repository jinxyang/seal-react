import React from 'react'

const useStateRef = () => {
  const [state, setState] = React.useState({})
  const setRef = React.useCallback((ref) => {
    setState(ref)
  }, [])
  return [state, setRef]
}

export default useStateRef
