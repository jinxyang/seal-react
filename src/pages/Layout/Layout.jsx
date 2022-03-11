import React from 'react'
import { Link } from 'react-router-dom'

import Pages from 'pages'
import { Flex, Button } from 'components'
import { useGlobalState } from 'contexts'

const Layout = () => {
  const { logout } = useGlobalState()[1]

  return (
    <Flex>
      <Flex.Item>
        <Flex direction="column">
          <Link to="/">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Button onClick={logout}>Logout</Button>
        </Flex>
      </Flex.Item>
      <Flex.Item flex="1">
        <Pages />
      </Flex.Item>
    </Flex>
  )
}

export default Layout
