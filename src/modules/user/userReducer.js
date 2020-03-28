import axios from 'axios';
import { push } from 'react-router-redux';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { internalError, queryError, successful } from '../login/authReducer';

const HYDRATE_USERS = 'HYDRATE_USERS';
const HYDRATE_USER_BY_ID = 'HYDRATE_USER_BY_ID';
const CLEAR_USER_RESULT = 'CLEAR_USER_RESULT';
const USER_EDITED = 'USER_EDITED';
const PATCH_USER = 'PATCH_USER';

const initialState = {
  results: [],
  alert: null,
  profiles: [],
  careers: [],
  activeUser: {},
  activeSearch: false
};

export const clearUserResult = () => ({
  type: CLEAR_USER_RESULT
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

export const patchUser = (data) => ({
  type: PATCH_USER,
  data
});

export const clearUsers = () => (dispatch) => {
  dispatch(clearUserResult());
};

export const getUserById = (id) => (dispatch) => {
  const config = getConfig();

  axios
    .all([
      axios.get(`${api.users}/${id}`, config),
      axios.get(api.profiles, config),
      axios.get(api.careers, config)
    ])
    .then(
      axios.spread((user, profiles, careers) => ({
        user: user.data.data,
        profiles: profiles.data.data,
        careers: careers.data.data
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

export const editUser = (idUser, profiles, careers) => (dispatch) => {
  const config = getConfig();
  const body = { profiles, careers };

  axios
    .put(`${api.users}/${idUser}`, body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(userEdited());
      dispatch(successful('El usuario se editó correctamente'));
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

const fetchCareers = (data) =>
  data.map((rowObject) => ({
    id: rowObject.id,
    name: rowObject.name,
    description: rowObject.description
  }));

const fetchProfiles = (data) =>
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

  const careers = data.Careers.map((rowObject) => ({
    id: rowObject.id,
    name: rowObject.name,
    description: rowObject.description
  }));

  return {
    id: data.id,
    name: `${data.name} ${data.surname}`,
    email: data.email,
    profiles,
    careers
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_USERS:
      return {
        ...state,
        results: fetchUsersTable(action.data),
        activeSearch: true
      };
    case HYDRATE_USER_BY_ID:
      return {
        ...state,
        activeUser: fetchUser(action.data.user),
        profiles: fetchProfiles(action.data.profiles),
        careers: fetchCareers(action.data.careers)
      };
    case CLEAR_USER_RESULT:
      return { ...state, results: [], activeSearch: false };
    default:
      return state;
  }
};
