import axios from 'axios';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { internalError, queryError, successful } from '../login/authReducer';

const HYDRATE_USERS = 'HYDRATE_USERS';
const HYDRATE_USER_BY_ID = 'HYDRATE_USER_BY_ID';
const USER_EDITED = 'USER_EDITED';

const users = (data) => ({
  type: HYDRATE_USERS,
  data
});

const userEdited = () => ({
  type: USER_EDITED
});

const userById = (data) => ({
  type: HYDRATE_USER_BY_ID,
  data
});

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

export default (
  state = {
    results: [],
    profiles: [],
    careers: [],
    activeUser: {},
    activeSearch: false
  },
  action
) => {
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
    default:
      return state;
  }
};
