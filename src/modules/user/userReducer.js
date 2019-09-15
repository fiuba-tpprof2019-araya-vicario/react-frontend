import axios from 'axios';
import { push } from 'react-router-redux';
import _ from 'lodash';
import { getConfig, api } from '../../api/apiInterfaceProvider';

const HYDRATE_USERS = 'HYDRATE_USERS';
const HYDRATE_USER_BY_ID = 'HYDRATE_USER_BY_ID';
const HYDRATE_ORGANISMOS = 'HYDRATE_ORGANISMOS';
const QUERY_ERROR = 'QUERY_ERROR';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const SUCCESSFUL = 'SUCCESSFUL';
const CLEAR_USER_RESULT = 'CLEAR_USER_RESULT';
const CLEAR_ALERT = 'CLEAR_ALERT';
const REMOVE_ROL = 'REMOVE_ROL';
const ADD_ROL = 'ADD_ROL';
const USER_EDITED = 'USER_EDITED';
const PATCH_USER = 'PATCH_USER';

const initialState = {
  results: [],
  alert: null,
  profiles: [],
  activeUser: {},
  activeSearch: false
};

export const clearUserResult = () => ({
  type: CLEAR_USER_RESULT
});

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const queryError = (err) => ({
  type: QUERY_ERROR,
  err
});

export const internalError = (err) => ({
  type: INTERNAL_ERROR,
  err
});

export const successful = (text) => ({
  type: SUCCESSFUL,
  text
});

// normal action creators
export const organismosTodos = (data) => ({
  type: HYDRATE_ORGANISMOS,
  data
});

export const users = (data) => ({
  type: HYDRATE_USERS,
  data
});

export const userEdited = () => ({
  type: USER_EDITED
});

export const userById = (data) => ({
  type: HYDRATE_USER_BY_ID,
  data
});

export const removerRol = (data) => ({
  type: REMOVE_ROL,
  data
});

export const agregarRol = (data) => ({
  type: ADD_ROL,
  data
});

export const patchUser = (data) => ({
  type: PATCH_USER,
  data
});

// thunks
export const clearUsers = () => (dispatch) => {
  dispatch(clearUserResult());
};

export const getUserById = (id) => (dispatch) => {
  const config = getConfig();

  axios
    .all([
      axios.get(`${api.users}/${id}`, config),
      axios.get(api.profiles, config)
    ])
    .then(
      axios.spread((user, profiles) => ({
        user: user.data.data,
        profiles: profiles.data.data
      }))
    )
    .then((data) => {
      dispatch(userById(data));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const getUsers = (name, email) => (dispatch) => {
  const config = getConfig();
  let queryString = '';

  if (name !== '') queryString += `?name=${name}`;
  if (email !== '')
    queryString += queryString === '' ? `?email=${email}` : `&email=${email}`;

  axios
    .get(api.users + queryString, config)
    .then((response) => {
      dispatch(users(response.data.data));
    })
    .catch((err) => {
      if (err.response && err.response.status) {
        dispatch(queryError(err));
      } else {
        dispatch(internalError(err));
      }
    });
};

export const updateUser = (userId, name, email) => (dispatch) => {
  const config = getConfig();
  const body = {};

  if (name) body.name = name;
  if (email) body.email = email;

  axios
    .patch(`${api.users}/${userId}`, body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(getUserById(userId));
      dispatch(successful('El user se actualizó correctamente'));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const createUser = (name, email) => (dispatch) => {
  const config = getConfig();
  const body = {
    name,
    email
  };

  axios
    .post(api.users, body, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(push(`/${api.claveUsers}/${data.id}`));
    })
    .catch((err) => {
      if (err.response && err.response.status) {
        dispatch(queryError(err));
      } else {
        dispatch(internalError(err));
      }
    });
};

export const obtenerOrganismos = () => (dispatch) => {
  const config = getConfig();

  axios
    .get(api.organismos, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(organismosTodos(data));
    })
    .catch((err) => {
      if (err.response && err.response.status) {
        dispatch(queryError(err));
      } else {
        dispatch(internalError(err));
      }
    });
};

export const removeProfile = (idUser, idRol) => (dispatch) => {
  const config = getConfig();

  axios
    .delete(`${api.users}/${idUser}/${api.claveRoles}/${idRol}`, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(removerRol(idRol));
      dispatch(successful('El rol se eliminó correctamente'));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const editUser = (idUser, profiles) => (dispatch) => {
  const config = getConfig();
  const body = { profiles };

  axios
    .put(`${api.users}/${idUser}`, body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(userEdited());
      dispatch(successful('El usuario se agregó correctamente'));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const addProfile = (idUser, idRol) => (dispatch) => {
  const config = getConfig();
  const body = { rol_id: idRol };

  axios
    .post(`${api.users}/${idUser}/${api.claveRoles}`, body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(agregarRol(idRol));
      dispatch(successful('El rol se agregó correctamente'));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

const fetchUsersTable = (data) =>
  data.map((rowObject) => ({
    id: rowObject.id,
    name: `${rowObject.name} ${rowObject.surname}`,
    email: rowObject.email
  }));

const getRolRemover = (rolId, activeUser) => {
  const rolesActuales = activeUser.roles;
  const nuevosRoles = _.differenceBy(rolesActuales, [{ id: rolId }], 'id');

  return nuevosRoles;
};

const getRolAdd = (nuevoRolId, roles, profiles) => {
  // eslint-disable-next-line radix
  const nuevoRol = _.find(profiles, { id: parseInt(nuevoRolId) });

  roles.push(nuevoRol);

  return roles;
};

const fetchRoles = (data) =>
  data.map((rowObject) => ({
    id: rowObject.id,
    name: rowObject.name,
    description: rowObject.description
  }));

const fetchUser = (data) => {
  const profiles = data.Profiles.map((rowObject) => ({
    id: rowObject.id,
    name: rowObject.name,
    description: rowObject.description
  }));

  return {
    id: data.id,
    name: `${data.name} ${data.surname}`,
    email: data.email,
    profiles
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_ORGANISMOS:
      return {
        ...state,
        results: []
      };
    case HYDRATE_USERS:
      return {
        ...state,
        results: fetchUsersTable(action.data),
        activeSearch: true
      };
    case HYDRATE_USER_BY_ID:
      return {
        ...state,
        results: [],
        activeUser: fetchUser(action.data.user),
        profiles: fetchRoles(action.data.profiles)
      };
    case REMOVE_ROL:
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          roles: getRolRemover(action.data, state.activeUser)
        }
      };
    case ADD_ROL:
      return {
        ...state,
        activeUser: {
          ...state.activeUser,
          roles: getRolAdd(action.data, state.activeUser.roles, state.profiles)
        }
      };
    case QUERY_ERROR:
      return {
        ...state,
        alert: {
          style: 'danger',
          message: action.err.message,
          onDismiss: clearAlert
        }
      };
    case INTERNAL_ERROR:
      return {
        ...state,
        alert: {
          style: 'danger',
          message: 'Ocurrió un error inesperado',
          onDismiss: clearAlert
        }
      };
    case SUCCESSFUL:
      return {
        ...state,
        alert: { style: 'success', message: action.text, onDismiss: clearAlert }
      };
    case CLEAR_ALERT:
      return { ...state, alert: null };
    case CLEAR_USER_RESULT:
      return { ...state, results: [], activeSearch: false };
    default:
      return state;
  }
};
