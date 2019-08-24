import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { intersection } from 'lodash';

class WithAuthorization extends Component {
  static propTypes = {
    permission: PropTypes.string,
    permissionsList: PropTypes.array,
    children: PropTypes.node
  };

  allowedToShow() {
    const { permission, permissionsList } = this.props;

    return Array.isArray(permission)
      ? intersection(permissionsList, permission).length === permission.length
      : permissionsList.includes(permission);
  }

  render() {
    return this.allowedToShow() ? this.props.children : null;
  }
}

const mapStateToProps = (state) => ({
  permissionsList: state.authReducer.permisos
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WithAuthorization)
);
