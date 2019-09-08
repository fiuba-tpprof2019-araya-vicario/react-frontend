import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { filter } from 'lodash';
import { PersistGate } from 'redux-persist/integration/react';
import { Home } from '../layout/Home';
import Log from '../modules/login/Login';
import NavBar from '../layout/WebNavBar';
import Private from '../utils/PrivateRoute';
import MyProject from '../modules/myProject/MyProjectIndex';
import MyTutorials from '../modules/myTutorials/MyTutorialsIndex';
import MyTutorialsDetail from '../modules/myTutorials/MyTutorialsDetail';
import Contact from '../modules/contact/ContactIndex';
import Request from '../modules/request/RequestIndex';
import Requirement from '../modules/requirement/RequirementIndex';
import { persistor } from '../redux/store';
import CustomAlert from '../utils/CustomAlert';
import './App.css';
import Loading from '../utils/Loading';
import { CREDENTIALS } from '../utils/services/references';

class App extends React.Component {
  static propTypes = {
    alerts: PropTypes.array,
    execute: PropTypes.func
  };

  alertRender() {
    const render = [];
    const alert = this.props.alerts[0];

    if (alert) {
      render.push(
        <div key="margin">
          <br />
        </div>
      );
      render.push(
        <CustomAlert
          key="alert"
          rowKey="centralAlert"
          bsStyle={alert.style}
          message={alert.message}
          onDismiss={() =>
            alert.onDismiss && this.props.execute(alert.onDismiss)
          }
        />
      );
    }

    return render;
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.alertRender()}
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Grid fluid>
            <Switch>
              <Route path="/login" component={Log} />
              <Private exact path="/" component={Home} />
              <Private
                exact
                path="/my_projects"
                requiredCredentials={CREDENTIALS.CREATE_PROJECTS}
                component={MyProject}
              />
              <Private
                exact
                path="/my_tutorials"
                // requiredCredentials={CREDENTIALS.EDIT_TUTOR_REQUESTS}
                component={MyTutorials}
              />
              <Private
                exact={false}
                path="/my_tutorials/:id"
                // requiredCredentials={CREDENTIALS.EDIT_TUTOR_REQUESTS}
                component={MyTutorialsDetail}
              />
              <Private
                exact
                path="/requests"
                requiredCredentials={CREDENTIALS.GET_PROJECTS}
                component={Request}
              />
              <Private
                exact
                path="/requirements"
                requiredCredentials={CREDENTIALS.GET_PROJECTS}
                component={Requirement}
              />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </Grid>
        </PersistGate>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  alerts: filter(state, (reducer) => reducer && reducer.alert).map(
    (reducer) => reducer && reducer.alert
  )
});

const mapDispatch = (dispatch) => ({
  execute: (f) => {
    dispatch(f());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(App)
);
