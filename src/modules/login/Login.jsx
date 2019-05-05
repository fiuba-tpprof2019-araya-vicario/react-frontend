import React from 'react'
import { connect } from 'react-redux'
import { loginUser, clearErrors } from './authReducer'
import { Row, Col, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { Campo } from '../../utils/Campo'
import { CustomAlert } from '../../utils/CustomAlert'
import { GoogleLogin } from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

export class Login extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.clearErrors()
  }

  getErroresRender() {
    let render = []
    if (this.props.errorMessage) {
      render.push(<CustomAlert key={'alert'} rowKey={'rowkey'} bsStyle="danger" message={this.props.errorMessage} />)
    }
    return render
  }

  render() {
    return (<form onSubmit={event => {
      event.preventDefault() // Previene el submit default del form
      this.props.login(event.target.usuario.value, event.target.password.value)
    }}>
      <Row>
        <br />
        <Col md={6} mdOffset={3}>
          <Row>
            <Col md={12}>
              <h4>Completá tus datos para ingresar al sistema</h4>
            </Col>
          </Row>
          {this.getErroresRender()}
          {/* <Row>
            <Col lg={12}>
              <Campo controlKey="username" controlId="usuario" size="small" type="text" label="Usuario" />
            </Col>
            <Col lg={12}>
              <Campo controlKey="userpass" controlId="password" size="small" type="password" label="Contraseña" />
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
            <GoogleLogin
              clientId="636655126926-250fpte02kdkjrqmsf78k4nii7ofngmq.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Row>
        </Col>
      </Row>
    </form>)
  }
}

const mapDispatch = (dispatch) => ({
  login: (email, password) => {
    dispatch(loginUser(email, password))
  },
  clearErrors: () => {
    dispatch(clearErrors())
  }
})

const mapStateToProps = (state) => {
  return {
    errorMessage: state.authReducer.error.message,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Login))
