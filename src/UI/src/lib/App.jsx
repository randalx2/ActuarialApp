import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Actuarials from './routes/Actuarials'
import NewActuarial from './routes/NewActuarial'
import UpdateActuarial from './routes/UpdateActuarial'
import { ActContext } from '.'

function App({ ...props }) {
  const actProps = useContext(ActContext)
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Actuarials {...props} />
        </Route>
        <Route
          path={`/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials/create-actuarial`}>
          <NewActuarial />
        </Route>
        <Route
          path={`/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials/update-actuarial/:actuarialId`}>
          <UpdateActuarial />
        </Route>
        <Route
          path={`/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials`}>
          <Actuarials {...props} />
        </Route>
      </Switch>
    </div>
  )
}

export default App
