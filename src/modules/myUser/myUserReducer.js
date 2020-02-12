import axios from 'axios';
import { push } from 'react-router-redux';
import { api, getConfig } from '../../api/apiInterfaceProvider';

const HYDRATE_USERS = 'HYDRATE_USERS';
const QUERY_ERROR = 'QUERY_ERROR';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const SUCCESSFUL = 'SUCCESSFUL';
const CLEAR_USER_RESULT = 'CLEAR_USER_RESULT';
const CLEAR_ALERT = 'CLEAR_ALERT';
const INITIAL_DATA = 'INITIAL_DATA';
const USER_EDITED = 'USER_EDITED';
const PATCH_USER = 'PATCH_USER';

const initialState = {
  results: [],
  alert: null,
  profiles: [],
  careers: [],
  interests: [],
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

export const users = (data) => ({
  type: HYDRATE_USERS,
  data
});

export const userEdited = () => ({
  type: USER_EDITED
});

export const initialData = (data) => ({
  type: INITIAL_DATA,
  data
});

export const patchUser = (data) => ({
  type: PATCH_USER,
  data
});

export const clearUsers = () => (dispatch) => {
  dispatch(clearUserResult());
};

export const getInitialData = () => (dispatch) => {
  const config = getConfig();

  axios
    .all([
      axios.get(api.interests, config),
      axios.get(api.userInterests, config),
      axios.get(api.profiles, config),
      axios.get(api.careers, config)
    ])
    .then(
      axios.spread((interests, userInterests, profiles, careers) => ({
        interests: interests.data.data,
        userInterests: userInterests.data.data,
        profiles: profiles.data.data,
        careers: careers.data.data
      }))
    )
    .then((data) => {
      dispatch(initialData(data));
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
      dispatch(initialData());
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

export const editUser = (idUser, interests) => (dispatch) => {
  const config = getConfig();
  const body = {
    interests: interests.map((interestId) => ({ id: interestId, score: 1 }))
  };

  axios
    .put(api.userInterests, body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(userEdited());
      dispatch(successful('El usuario se tu perfil correctamente'));
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

const fetchInterests = (data, interestsList) =>
  data.map((rowObject) => {
    const { id, name, description } = interestsList.find(
      (interest) => interest.id === rowObject.id
    );

    return {
      id,
      name,
      description,
      score: rowObject.score
    };
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_USERS:
      return {
        ...state,
        results: fetchUsersTable(action.data),
        activeSearch: true
      };
    case INITIAL_DATA:
      return {
        ...state,
        interests: fetchProfiles(action.data.interests),
        userInterests: fetchInterests(
          action.data.userInterests,
          action.data.interests
        ),
        profiles: fetchProfiles(action.data.profiles),
        careers: fetchCareers(action.data.careers)
      };
    case CLEAR_USER_RESULT:
      return { ...state, results: [], activeSearch: false };
    default:
      return state;
  }
};