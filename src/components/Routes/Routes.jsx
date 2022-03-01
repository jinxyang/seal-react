import React from 'react'
import { Routes as BrowserRoutes, Route } from 'react-router-dom'

const createComponent = (Component) => (Component ? <Component /> : null)

const renderRoutes = (routes = [], filter = () => true) =>
  routes.filter(filter).map(({ path, component, children }) => (
    <Route key={path} path={path} element={createComponent(component)}>
      {!!children?.length && renderRoutes(children)}
    </Route>
  ))

const Routes = ({ routes = [], loading = false, filter = (v) => v }) => {
  return React.useMemo(
    () =>
      loading ? (
        'loading...'
      ) : (
        <React.Suspense fallback={<div>loading...</div>}>
          <BrowserRoutes>
            {renderRoutes(routes, filter)}
            <Route path="*" element={<div>Not found</div>} />
          </BrowserRoutes>
        </React.Suspense>
      ),
    [filter, loading, routes],
  )
}

export default Routes
