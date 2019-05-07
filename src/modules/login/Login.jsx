import React from 'react';
import { connect } from 'react-redux';
import { loginWithGoogle, loginUser, clearErrors } from './authReducer';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { CustomAlert } from '../../utils/CustomAlert';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const logout = (response) => {
  console.log(response);
};

export class Login extends React.Component {
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
    let render = [];
    if (this.props.errorMessage) {
      render.push(<CustomAlert key={'alert'} rowKey={'rowkey'} bsStyle="danger" message={this.props.errorMessage} />);
    }
    return render;
  }

  render() {
    return (
      <Row>
        <br />
        <Col md={6} mdOffset={3}>
          {this.getErroresRender()}
          <Row>
            <Col md={12}>
              <h4>Registrarse con google para ingresar al sistema</h4>
            </Col>
          </Row>
          {/* <Row>
            <Col lg={12}>
              <Field controlKey="username" controlId="usuario" size="small" type="text" label="Usuario" />
            </Col>
            <Col lg={12}>
              <Field controlKey="userpass" controlId="password" size="small" type="password" label="Contraseña" />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Button bsStyle="primary" bsSize="small" type="submit">
                Ingresar
              </Button>
            </Col>
          </Row> */}
          <Row>
            <Col md={12}>
              <GoogleLogin
                //O9-Abf_SAvuo7XobCtpC3_K2
                clientId="942857236809-n8qa3b9nlijciqlf41eeglnnubb3ukja.apps.googleusercontent.com"
                buttonText='Login'
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                autoLoad={false}
                uxMode='popup'
                hostedDomain='fi.uba.ar'
                cookiePolicy={'single_host_origin'}
              >
                <span> Login with Google</span>
              </GoogleLogin>
              {/* <GoogleLogout
              buttonText="Logout"
              onLogoutSuccess={logout}
            >
            </GoogleLogout> */}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const mapDispatch = (dispatch) => ({
  loginWithGoogle: (email, password) => {
    dispatch(loginWithGoogle(email, password));
  },
  clearErrors: () => {
    dispatch(clearErrors());
  }
});

const mapStateToProps = (state) => {
  return {
    errorMessage: state.authReducer.error.message,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps, mapDispatch)(Login));
