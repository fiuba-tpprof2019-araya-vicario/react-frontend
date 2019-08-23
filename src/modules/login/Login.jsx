import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Center from 'react-center';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import CustomAlert from '../../utils/CustomAlert';
import { loginWithGoogle, clearErrors } from './authReducer';
import Title from '../../utils/Title';
import { loginMessages } from '../../utils/messages';

export class Login extends React.Component {
  static propTypes = {
    loginWithGoogle: PropTypes.func,
    clearErrors: PropTypes.func,
    errorMessage: PropTypes.string
  };

  constructor() {
    super();
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    this.props.loginWithGoogle(response);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  getErroresRender() {
    const render = [];

    if (this.props.errorMessage) {
      render.push(
        <CustomAlert
          key="alert"
          rowKey="rowkey"
          bsStyle="danger"
          message={this.props.errorMessage}
        />
      );
    }

    return render;
  }

  render() {
    return (
      <Row>
        <br />
        <Col md={4} mdOffset={4}>
          {this.getErroresRender()}
          <Row>
            <Title
              title={loginMessages.TITLE}
              subtitle={loginMessages.SUBTITLE}
            />
          </Row>
          <Row>
            <Center>
              <GoogleLogin
                clientId="942857236809-n8qa3b9nlijciqlf41eeglnnubb3ukja.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                autoLoad={false}
                uxMode="popup"
                // TODO: SACAR PARA VALIDAR SOLO MAIL FIUBA
                // hostedDomain='fi.uba.ar'
                cookiePolicy="single_host_origin"
              >
                <span> Login with Google</span>
              </GoogleLogin>
              {/* <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={logout}
            >
            </GoogleLogout> */}
            </Center>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapDispatch = (dispatch) => ({
  loginWithGoogle: (response) => {
    dispatch(loginWithGoogle(response));
  },
  clearErrors: () => {
    dispatch(clearErrors());
  }
});

const mapStateToProps = (state) => ({
  errorMessage: state.authReducer.error.message,
  isAuthenticated: state.authReducer.isAuthenticated
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(Login)
);
