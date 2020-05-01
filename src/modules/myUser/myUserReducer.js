import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import { internalError, queryError, successful } from '../login/authReducer';

const HYDRATE_USERS = 'HYDRATE_USERS';
const INITIAL_DATA = 'INITIAL_DATA';
const USER_EDITED = 'USER_EDITED';

const users = (data) => ({
  type: HYDRATE_USERS,
  data
});

const userEdited = () => ({
  type: USER_EDITED
});

const initialData = (data) => ({
  type: INITIAL_DATA,
  data
});

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
    .catch((error) => {
      dispatch(queryError(error));
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
    .catch((error) => {
      dispatch(queryError(error));
    });
};

export const editUser = (interests) => (dispatch) => {
  const config = getConfig();
  const body = { interests };

  axios
    .put(api.userInterests, body, config)
    .then(() => {
      dispatch(userEdited());
      dispatch(successful('El usuario se tu perfil correctamente'));
    })
    .catch((error) => {
      dispatch(queryError(error));
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

const fetchInterests = (data) =>
  data.map((rowObject) => ({
    id: rowObject.id,
    name: rowObject.name
  }));

const fetchProfiles = (data) =>
  data.map((rowObject) => ({
    id: rowObject.id,
    name: rowObject.name,
    description: rowObject.description
  }));

const fetchUserInterests = (data, interestsList) =>
  data.map((rowObject) => {
    const { id, name } = interestsList.find(
      (interest) => interest.id === rowObject.interest_id
    );

    return {
      id,
      name,
      original_score: rowObject.original_score
    };
  });

export default (
  state = {
    results: [],
    profiles: [],
    careers: [],
    interests: [],
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
    case INITIAL_DATA:
      return {
        ...state,
        interests: fetchInterests(action.data.interests),
        userInterests: fetchUserInterests(
          action.data.userInterests,
          action.data.interests
        ),
        profiles: fetchProfiles(action.data.profiles),
        careers: fetchCareers(action.data.careers)
      };
    default:
      return state;
  }
};
