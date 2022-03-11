import React from 'react'
import { Routes as BrowserRoutes, Route, useLocation } from 'react-router-dom'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

import './routes.css'

const createComponent = (Component) => (Component ? <Component /> : null)

const renderRoutes = (routes = [], filter = () => true) =>
  routes.filter(filter).map(({ path, component, children }) => (
    <Route key={path} path={path} element={createComponent(component)}>
      {!!children?.length && renderRoutes(children, filter)}
    </Route>
  ))

const Routes = ({ routes = [], loading = false, filter = () => true }) => {
  const location = useLocation()

  return loading ? (
    'loading...'
  ) : (
    <React.Suspense fallback={<div>loading...</div>}>
      <SwitchTransition>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <BrowserRoutes location={location}>
            {renderRoutes(routes, filter)}
            <Route path="*" element={<div>Not found</div>} />
          </BrowserRoutes>
        </CSSTransition>
      </SwitchTransition>
    </React.Suspense>
  )
}

export default Routes
