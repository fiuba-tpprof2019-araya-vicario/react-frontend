import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { intersection } from 'lodash';

class WithAuthorization extends Component {
  static propTypes = {
    requiredCredentials: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string
    ]),
    grantedCredentials: PropTypes.array,
    children: PropTypes.node
  };

  allowedToShow() {
    const { requiredCredentials, grantedCredentials } = this.props;

    return Array.isArray(requiredCredentials)
      ? intersection(grantedCredentials, requiredCredentials).length ===
          requiredCredentials.length
      : grantedCredentials.includes(requiredCredentials);
  }

  render() {
    return this.allowedToShow() ? this.props.children : null;
  }
}

const mapStateToProps = (state) => ({
  grantedCredentials: state.authReducer.user.credentials
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(WithAuthorization)
);
