import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  clearUsers,
  getUsers,
  obtenerOrganismos
} from './userReducer';
import SearchUserForm from './SearchUserForm';
import UserTable from './UserTable';
import Title from '../../utils/Title';
import { userMessages } from '../../utils/messages';

// import CrearUsuarioModal from './CrearUsuarioModal';

export class UserIndex extends React.Component {
  static propTypes = {
    activeSearch: PropTypes.bool,
    users: PropTypes.func,
    results: PropTypes.array
  };

  // constructor() {
  //   super();
  //   this.abrirModalCrearUsuario = this.abrirModalCrearUsuario.bind(this);
  // }

  componentDidMount() {
    // this.props.obtenerOrganismos();
  }

  // openModalCreateUser() {
  //   this.crearUsuarioModal.wrappedInstance.abrirModal();
  // }

  render() {
    const { activeSearch, results, users } = this.props;

    return (
      <Fragment>
        <Title title={userMessages.TITLE} />
        {/* <Row>
          <Col lg={4} md={4} sm={4} xs={4}>
            <br />
            <Button
              bsStyle="success"
              bsSize="xsmall"
              className="pull-right"
              onClick={this.abrirModalCrearUsuario}
            >
              <i className="fa fa-plus" aria-hidden="true">
                &nbsp;
              </i>
              Nuevo usuario
            </Button>
          </Col>
        </Row> */}
        <SearchUserForm getUsuarios={users} />
        <UserTable activeSearch={activeSearch} users={results} />
        {/*
        <CrearUsuarioModal
          ref={(modal) => {
            this.crearUsuarioModal = modal;
          }}
        /> */}
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  clearResult: () => {
    dispatch(clearUsers());
  },
  clearAlert: () => {
    dispatch(clearAlert());
  },
  obtenerOrganismos: () => {
    dispatch(obtenerOrganismos());
  },
  users: (name, email) => {
    dispatch(getUsers(name, email));
  }
});

const mapStateToProps = (state) => ({
  results: state.userReducer.results,
  activeSearch: state.userReducer.activeSearch
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(UserIndex)
);
