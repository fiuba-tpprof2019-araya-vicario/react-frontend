import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
import { PersistGate } from 'redux-persist/integration/react';
import { Home } from '../layout/Home';
import { clearAlert } from '../modules/login/authReducer';
import Log from '../modules/login/Login';
import NavBar from '../layout/WebNavBar';
import Private from '../utils/PrivateRoute';
import MyProject from '../modules/myProject/MyProjectIndex';
import MyTutorials from '../modules/myTutorials/MyTutorialsIndex';
import MyUser from '../modules/myUser/MyUserIndex';
import User from '../modules/user/UserIndex';
import Idea from '../modules/idea/IdeasIndex';
import IdeaView from '../modules/idea/IdeasDetail';
import UserView from '../modules/user/UserDetail';
import MyTutorialsDetail from '../modules/myTutorials/MyTutorialsDetail';
import Commission from '../modules/commission/CommissionsIndex';
import CommissionDetail from '../modules/commission/CommissionsDetail';
import Contact from '../modules/contact/ContactIndex';
// import Request from '../modules/request/RequestIndex';
import Requirement from '../modules/requirement/RequirementIndex';
import Dashboard from '../modules/dashboard/DashboardIndex';
import { persistor } from '../redux/store';
import CustomAlert from '../utils/CustomAlert';
import LoadingModal from '../utils/LoadingModal';
import './App.css';
import Loading from '../utils/Loading';
import { CREDENTIALS } from '../utils/services/references';

class App extends React.Component {
  static propTypes = {
    alert: PropTypes.object,
    execute: PropTypes.func,
    loading: PropTypes.bool
  };

  alertRender() {
    const { alert, execute } = this.props;
    const render = [];

    if (alert) {
      render.push(
        <Fragment key="margin">
          <br />
        </Fragment>
      );
      render.push(
        <CustomAlert
          key="alert"
          rowKey="centralAlert"
          bsStyle={alert.style}
          message={alert.message}
          onDismiss={() =>
            alert.onDismiss ? execute(alert.onDismiss) : execute(clearAlert)
          }
        />
      );
    }

    return render;
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        {this.alertRender()}
        <LoadingModal show={this.props.loading} />
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Grid fluid style={{ width: '95%' }}>
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
                requiredCredentials={CREDENTIALS.EDIT_TUTOR_REQUESTS}
                component={MyTutorials}
              />
              <Private
                exact={false}
                path="/my_tutorials/:id"
                requiredCredentials={CREDENTIALS.EDIT_TUTOR_REQUESTS}
                component={MyTutorialsDetail}
              />
              {/* <Private
                exact
                path="/requests"
                requiredCredentials={CREDENTIALS.GET_PROJECTS}
                component={Request}
              /> */}
              <Private
                exact
                path="/commissions"
                requiredCredentials={CREDENTIALS.APPROVE_PROJECTS}
                component={Commission}
              />
              <Private
                exact={false}
                path="/commissions/:id"
                requiredCredentials={CREDENTIALS.APPROVE_PROJECTS}
                component={CommissionDetail}
              />
              <Private
                exact
                path="/requirements"
                requiredCredentials={CREDENTIALS.GET_PROJECTS}
                component={Requirement}
              />
              <Private
                exact
                path="/ideas"
                requiredCredentials={CREDENTIALS.GET_PROJECTS}
                component={Idea}
              />
              <Private
                exact={false}
                path="/ideas/:id"
                requiredCredentials={CREDENTIALS.GET_PROJECTS}
                component={IdeaView}
              />
              <Private
                exact
                path="/users"
                requiredCredentials={CREDENTIALS.EDIT_USERS}
                component={User}
              />
              <Private
                exact
                path="/my_user"
                requiredCredentials={CREDENTIALS.GET_PROJECTS}
                component={MyUser}
              />
              <Private
                exact={false}
                path="/users/:id"
                requiredCredentials={CREDENTIALS.EDIT_USERS}
                component={UserView}
              />
              <Private
                exact
                path="/dashboard"
                requiredCredentials={CREDENTIALS.EDIT_USERS}
                component={Dashboard}
              />
              <Route exact path="/contact" component={Contact} />
            </Switch>
          </Grid>
        </PersistGate>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  alert: state.authReducer.alert,
  loading: state.authReducer.loading
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
