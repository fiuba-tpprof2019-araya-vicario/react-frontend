import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import _ from 'lodash';
import { Home } from '../layout/Home';
import Login from '../modules/login/Login';
import WebNavBar from '../layout/WebNavBar';
import PrivateRoute from '../utils/PrivateRoute';
import MyProjectIndex from '../modules/myProject/MyProjectIndex';
import ContactIndex from '../modules/contact/ContactIndex';
import RequestIndex from '../modules/request/RequestIndex';
import { persistor } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomAlert from '../utils/CustomAlert';
import './App.css';
import Loading from '../utils/Loading';

class App extends React.Component {

  constructor() {
    super();
    this.state = { theme: 'Light' };
  }

  alertRender() {
    let render = [];
    const alert = this.props.alerts[0];
    if (alert) {
      render.push(<div key={'margin'}><br/></div>);
      render.push(<CustomAlert key={'alert'}
        rowKey={'centralAlert'}
        bsStyle={alert.style}
        message={alert.message}
        onDismiss={() => alert.onDismiss && this.props.execute(alert.onDismiss)}
      />);
    } 

    return render;
  }

  render() {
    return (
      <div>
        <WebNavBar />
        {this.alertRender()}
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Grid fluid >
            <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute exact={true} path="/" permiso={true} component={Home} />
              <PrivateRoute exact={true} path="/my_project" permiso={true} component={MyProjectIndex} />
              <PrivateRoute exact={true} path="/file" permiso={true} component={RequestIndex} />
              <Route exact={true} path="/contact" permiso={true} component={ContactIndex} />
            </Switch>
          </Grid>
        </PersistGate>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    alerts: _.filter(state, function(reducer) { return reducer && reducer.alert; })
      .map((reducer)=>reducer && reducer.alert),
  };
};

const mapDispatch = (dispatch) => ({
  execute: (f) => {
    dispatch(f());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatch)(App)); 