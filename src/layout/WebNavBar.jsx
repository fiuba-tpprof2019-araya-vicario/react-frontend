/* eslint-disable react/jsx-indent */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import { GoogleLogout } from 'react-google-login';
import { logout, myProfile } from '../modules/login/authReducer';
// import { CLIENT_ID } from '../api/api';
import { CREDENTIALS } from '../utils/services/references';
import WithAuth from '../utils/WithAuthorization';

export class WebNavBar extends React.Component {
  static propTypes = {
    home: PropTypes.func,
    logout: PropTypes.func,
    myProfile: PropTypes.func,
    name: PropTypes.string,
    isAuthenticated: PropTypes.bool
  };

  render() {
    return (
      <Navbar fluid inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={this.props.home}>
              <span className="glyphicon glyphicon-home" /> FIUBA
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.props.isAuthenticated
            ? [
                <Nav key="1" navbar>
                  <WithAuth requiredCredentials={CREDENTIALS.CREATE_PROJECTS}>
                    <LinkContainer to="/my_projects">
                      <NavItem eventKey={1}>Mi proyecto</NavItem>
                    </LinkContainer>
                  </WithAuth>
                  <WithAuth
                    requiredCredentials={CREDENTIALS.EDIT_TUTOR_REQUESTS}
                  >
                    <LinkContainer to="/my_tutorials">
                      <NavItem eventKey={2}>Mis tutorías</NavItem>
                    </LinkContainer>
                  </WithAuth>
                  <WithAuth requiredCredentials={CREDENTIALS.GET_PROJECTS}>
                    <LinkContainer to="/ideas">
                      <NavItem eventKey={3}>Ideas</NavItem>
                    </LinkContainer>
                  </WithAuth>
                  <WithAuth requiredCredentials={CREDENTIALS.APPROVE_PROJECTS}>
                    <LinkContainer to="/commissions">
                      <NavItem eventKey={3}>Comisión Curricular</NavItem>
                    </LinkContainer>
                  </WithAuth>
                  {/* <WithAuthorization
                    requiredCredentials={CREDENTIALS.GET_PROJECTS}
                  >
                    <LinkContainer to="/requests">
                      <NavItem eventKey={3}>Mis Solicitudes</NavItem>
                    </LinkContainer>
                  </WithAuthorization> */}
                  <WithAuth requiredCredentials={CREDENTIALS.GET_PROJECTS}>
                    <LinkContainer to="/requirements">
                      <NavItem eventKey={4}>Requerimientos</NavItem>
                    </LinkContainer>
                  </WithAuth>
                  <WithAuth requiredCredentials={CREDENTIALS.EDIT_USERS}>
                    <LinkContainer to="/users">
                      <NavItem eventKey={5}>Usuarios</NavItem>
                    </LinkContainer>
                  </WithAuth>
                  <WithAuth requiredCredentials={CREDENTIALS.EDIT_USERS}>
                    <LinkContainer to="/dashboard">
                      <NavItem eventKey={6}>Tablero de control</NavItem>
                    </LinkContainer>
                  </WithAuth>
                  <LinkContainer to="/public">
                    <NavItem eventKey={8}>Portal público</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/contact">
                    <NavItem eventKey={9}>Contacto</NavItem>
                  </LinkContainer>
                </Nav>,
                <Nav key="2" pullRight>
                  <NavDropdown
                    eventKey={10}
                    title={this.props.name}
                    id="logged-user-dropdown"
                  >
                    <MenuItem eventKey={10.1} onClick={this.props.myProfile}>
                      <i className="fa fa-user-circle" /> Mi perfil
                    </MenuItem>
                    {/* <MenuItem eventKey={9.1}> */}
                    {/* <GoogleLogout
                        clientId={CLIENT_ID}
                        onLogoutSuccess={this.props.logout}
                      >
                        <i className="fa fa-sign-out" /> Cerrar sesión
                      </GoogleLogout> */}
                    <MenuItem eventKey={10.2} onClick={this.props.logout}>
                      <i className="fa fa-sign-out" /> Cerrar sesión
                    </MenuItem>
                    {/* </MenuItem> */}
                  </NavDropdown>
                </Nav>
              ]
            : [
                <Nav key="1" navbar>
                  <LinkContainer to="/public">
                    <NavItem eventKey={3}>Portal público</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/contact">
                    <NavItem eventKey={4}>Contacto</NavItem>
                  </LinkContainer>
                </Nav>,
                <Nav key="2" pullRight>
                  <NavItem eventKey={10} href="http://www.fi.uba.ar/">
                    {'Página oficial FIUBA '}
                    <i className="fa fa-arrow-circle-right" />
                  </NavItem>
                </Nav>
              ]}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  name: state.authReducer.user.name
});

const mapDispatch = (dispatch) => ({
  logout: () => {
    dispatch(logout());
  },
  myProfile: () => {
    dispatch(myProfile());
  },
  home: () => {
    dispatch(push('/'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatch
)(WebNavBar);
