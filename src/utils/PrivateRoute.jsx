import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

export class PrivateRoute extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func,
    requiredCredentials: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    grantedCredentials: PropTypes.array
  };

  allowedToShow = () => {
    const { requiredCredentials, grantedCredentials } = this.props;

    if (!requiredCredentials) {
      return true;
    }

    return (
      !requiredCredentials ||
      (Array.isArray(requiredCredentials)
        ? !requiredCredentials.some(
            (credential) => !grantedCredentials.includes(credential)
          )
        : grantedCredentials.includes(requiredCredentials))
    );
  };

  whereToRedirect = () => {
    if (!this.props.isAuthenticated) {
      return <Redirect to={{ pathname: '/login', state: '/roles' }} />;
    } else if (!this.allowedToShow()) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        component={this.props.component}
      />
    );
  };

  render() {
    return this.whereToRedirect();
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  grantedCredentials: state.authReducer.user.credentials
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
