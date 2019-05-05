import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter, Switch } from 'react-router-dom'
import { Grid } from 'react-bootstrap'

import { Home } from '../layout/Home'
import Login from '../modules/login/Login'
import WebNavBar from '../layout/WebNavBar'
import PrivateRoute from '../utils/PrivateRoute'
import AppServerIndex from '../modules/appServerAdmin/AppServerIndex'
import AppServerDetail from '../modules/appServerAdmin/AppServerDetail'
import FileIndex from '../modules/fileAdmin/FileIndex'
import { persistor } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import { Cargando } from '../utils/Cargando'

class App extends React.Component {

  constructor() {
    super()
    this.state = { theme: 'Light' }
  }

  render() {
    return (
      <div>
        <WebNavBar />
        <PersistGate loading={<Cargando />} persistor={persistor}>
          <Grid fluid >
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute exact={true} path="/" permiso={true} component={Home} />
              <PrivateRoute exact={true} path="/appServer" permiso={true} component={AppServerIndex} />
              <PrivateRoute exact={false} path="/appServer/:id" permiso={true} component={AppServerDetail} />
              <PrivateRoute exact={true} path="/appServer" permiso={true} component={AppServerIndex} />
              <PrivateRoute exact={true} path="/file" permiso={true} component={FileIndex} />
            </Switch>
          </Grid>
        </PersistGate>
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

export default withRouter(connect(mapStateToProps)(App))