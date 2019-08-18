import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../modules/login/authReducer';

export class WebNavBar extends React.Component {
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
          {this.props.isAuthenticated && (
            <div id="navs">
              <Nav>
                <LinkContainer to={'/my_projects'}>
                  <NavItem eventKey={1}>Mi proyecto</NavItem>
                </LinkContainer>
                <LinkContainer to={'/requests'}>
                  <NavItem eventKey={2}>Mis Solicitudes</NavItem>
                </LinkContainer>
                <LinkContainer to={'/requirements'}>
                  <NavItem eventKey={3}>Requerimientos</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <NavDropdown title={this.props.name} id="logged-user-dropdown">
                  <MenuItem onClick={this.props.logout}>
                    <i className="fa fa-sign-out" />
                    &nbsp; Cerrar sesión
                  </MenuItem>
                </NavDropdown>
              </Nav>
            </div>
          )}
          <Nav>
            <LinkContainer to={'/contact'}>
              <NavItem eventKey={4}>Contacto</NavItem>
            </LinkContainer>
          </Nav>
          {!this.props.isAuthenticated && (
            <Nav pullRight>
              <NavItem eventKey={10} href='http://www.fi.uba.ar/'>
                Página oficial FIUBA&nbsp;
                <i className="fa fa-arrow-circle-right"/>
              </NavItem>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    name: state.authReducer.user.name
  };
};

const mapDispatch = dispatch => ({
  logout: () => {
    dispatch(logout());
  },
  home: () => {
    dispatch(push('/'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatch
)(WebNavBar);
