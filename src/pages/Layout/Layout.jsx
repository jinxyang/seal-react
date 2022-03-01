import React from 'react'

import { Button } from 'components'
import { useGlobalState } from 'contexts'

const Layout = () => {
  const { logout } = useGlobalState()[1]
  return <Button onClick={logout}>Logout</Button>
}

export default Layout
