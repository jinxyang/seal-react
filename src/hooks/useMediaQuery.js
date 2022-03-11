import React from 'react'

const useMediaQuery = (mediaQueryString) => {
  // TODO: 兼容breakpoint
  const mql = React.useMemo(() => {
    return window.matchMedia(mediaQueryString)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [matches, setMatches] = React.useState(!!mql.matches)

  React.useLayoutEffect(() => {
    const handler = () => setMatches(!!mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return matches
}

export default useMediaQuery
