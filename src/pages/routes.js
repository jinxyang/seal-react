import React from 'react'

const routes = [
  {
    path: '/',
    component: React.lazy(() => import('./Dashboard')),
  },
  {
    path: '/users',
    component: React.lazy(() => import('./User/UserList')),
    permission: 'user',
  },
  {
    path: '/users/:userId',
    component: React.lazy(() => import('./User/UserDetail')),
    permission: 'user',
  },
]

export default routes
