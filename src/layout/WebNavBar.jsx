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
          <Nav>
            <LinkContainer to={'/contact'}>
              <NavItem eventKey={3}>Contacto</NavItem>
            </LinkContainer>
          </Nav>
          {this.props.isAuthenticated && (
            <div id="navs">
              <Nav>
                <LinkContainer to={'/appServer'}>
                  <NavItem eventKey={1}>App Servers</NavItem>
                </LinkContainer>
                <LinkContainer to={'/file'}>
                  <NavItem eventKey={2}>Archivos</NavItem>
                </LinkContainer>
              </Nav>
              <Nav pullRight>
                <NavDropdown title={this.props.name} id="logged-user-dropdown">
                  <MenuItem onClick={this.props.logout}>
                    <i class="fa fa-sign-out" />
                    &nbsp; Cerrar sesión
                  </MenuItem>
                </NavDropdown>
              </Nav>
            </div>
          )}
          <Nav pullRight>
            <a className='linkNavbar' href='http://www.fi.uba.ar/'>
              <i className="fa fa-sign-out"/>
              &nbsp; Página oficial FIUBA
            </a>   
          </Nav>
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
