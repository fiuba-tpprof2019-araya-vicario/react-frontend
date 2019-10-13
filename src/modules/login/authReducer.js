import axios from 'axios';
import { push } from 'react-router-redux';
import { api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';

const QUERY_ERROR = 'QUERY_ERROR';
const CLEAR_ALERT = 'CLEAR_ALERT';
const SUCCESSFUL = 'SUCCESSFUL';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const LOGIN_ERROR = 'LOGIN_ERROR';
const CLEAR_ERRORS = 'CLEAR_ERRORS';
const POST_IDEA = 'POST_IDEA';

const initialState = {
  token: {},
  user: {},
  error: { message: '' },
  alert: null,
  isAuthenticated: false
};

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const queryError = (err) => ({
  type: QUERY_ERROR,
  err
});

export const loginError = (err) => ({
  type: LOGIN_ERROR,
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

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const login = (data) => ({
  type: LOGIN_USER,
  data
});

export const logout = () => ({
  type: LOGOUT_USER
});

export const loginUser = (username, password) => (dispatch) => {
  const body = { username, password };

  axios
    .post(api.login, body)
    .then((res) => res.data)
    .then((data) => {
      dispatch(login({ token: data.token, user: { email: username } }));
      dispatch(push('/'));
    })
    .catch((err) => {
      dispatch(loginError(err));
    });
};

export const loginWithGoogle = (response) => (dispatch) => {
  const body = {
    id_token: response.Zi.id_token,
    email: response.profileObj.email,
    name: response.profileObj.name
  };

  axios
    .post(api.login, body)
    .then((res) => res.data)
    .then(({ data }) => {
      console.log(data);
      dispatch(
        login({
          token: data.token,
          user: {
            id: data.id,
            email: body.email,
            name: body.name,
            credentials: data.credentials,
            careers: data.careers,
            projectId: data.projectId
          }
        })
      );
      dispatch(push('/'));
    })
    .catch((err) => {
      dispatch(loginError(err));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.data.token,
        user: action.data.user,
        error: {},
        isAuthenticated: true
      };
    case POST_IDEA:
      return {
        ...state,
        user: {
          ...state.user,
          projectId: action.data
        }
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        alert: null,
        error: {},
        isAuthenticated: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: {},
        error: {
          message: 'Los datos son incorrectos. Verificalos y volvé a intentar.'
        },
        isAuthenticated: false
      };
    case CLEAR_ERRORS:
      return { ...state, error: {}, alert: null };
    case QUERY_ERROR:
      return {
        ...state,
        alert: {
          message: utilsMessages.QUERY_ERROR,
          style: 'danger',
          onDismiss: clearAlert
        }
      };
    case CLEAR_ALERT:
      return { ...state, alert: null };
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
    case TOGGLE_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
