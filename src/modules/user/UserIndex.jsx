import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  clearAlert,
  // clearUsers,
  getUsers
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
    results: PropTypes.array,
    clearAlert: PropTypes.func
    // clearResult: PropTypes.func
  };

  componentDidMount() {
    // this.props.clearResult();
    this.props.clearAlert();
  }

  render() {
    const { activeSearch, results, users } = this.props;

    return (
      <Fragment>
        <Title title={userMessages.TITLE} />
        <SearchUserForm getUsuarios={users} />
        <UserTable activeSearch={activeSearch} users={results} />
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  // clearResult: () => {
  //   dispatch(clearUsers());
  // },
  clearAlert: () => {
    dispatch(clearAlert());
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
