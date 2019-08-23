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
    permiso: PropTypes.bool
  };

  dondeRedirigir() {
    if (!this.props.isAuthenticated) {
      return <Redirect to={{ pathname: '/login', state: '/roles' }} />;
    } else if (!this.props.permiso) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    return (
      <Route
        exact={this.props.exact}
        path={this.props.path}
        component={this.props.component}
      />
    );
  }

  render() {
    return <div>{this.dondeRedirigir()}</div>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  permisosUsuario: state.authReducer.permisos
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
