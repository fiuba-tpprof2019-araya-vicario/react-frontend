import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class WithAuthorization extends Component {
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

    if (!requiredCredentials) {
      return true;
    }

    return Array.isArray(requiredCredentials)
      ? !requiredCredentials.some(
          (credential) => !grantedCredentials.includes(credential)
        )
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
