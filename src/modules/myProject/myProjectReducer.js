import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import references from '../../utils/services/references';
import { getSelectOptionsWithIgnore } from '../../utils/services/funtions';
import axios from 'axios';
import Bluebird from 'bluebird';

const CLEAR_ALERT = 'CLEAR_ALERT';
const GET_TUTORS = 'GET_TUTORS';
const GET_COAUTORS = 'GET_COAUTORS';
const POST_IDEA = 'POST_IDEA';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

const initialState = {
  alert: null,
  loading: false
};

const toggleLoading = ({ loading }) => ({
  type: TOGGLE_LOADING,
  loading
});

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const queryError = err => ({
  type: QUERY_ERROR,
  err
});

export const ideaUploaded = data => ({
  type: POST_IDEA,
  data
});

export const coautorsUploaded = (data, ignoreId) => ({
  type: GET_COAUTORS,
  data,
  ignoreId
});

export const tutorsUploaded = (data, ignoreId) => ({
  type: GET_TUTORS,
  data,
  ignoreId
});

export const getInitialData = (ignoreId) => dispatch => {
  console.log(ignoreId)
  dispatch(toggleLoading({ loading: true }));
  Bluebird.join(getTutors(ignoreId, dispatch),getCoautors(ignoreId, dispatch))
    .then(() => 
      dispatch(toggleLoading({ loading: false }))
    );
};

const getTutors = (ignoreId, dispatch) => {
  let config = getConfig();
  return axios
    .get(api.users+'?profile_id='+references.PROFILES.TUTOR, config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(tutorsUploaded(data, ignoreId));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

const getCoautors = (ignoreId, dispatch) => {
  let config = getConfig();
  return axios
    .get(api.users+'?profile_id='+references.PROFILES.STUDENT, config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(coautorsUploaded(data, ignoreId));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

export const uploadIdea = ({ title, description, autor, tutor_id }) => dispatch => {
  dispatch(toggleLoading({ loading: true }));
  let config = getConfig();
  const body = {
    name: title,
    description,
    autor,
    tutor_id
  };

  axios
    .post(api.projects, body, config)
    .then(res => res)
    .then(() => {
      dispatch(ideaUploaded());
      dispatch(toggleLoading({ loading: false }));
    })
    .catch(err => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
  case POST_IDEA:
    return {
      ...state,
      data: action.data 
    };
  case GET_COAUTORS:
    return {
      ...state,
      coautors: getSelectOptionsWithIgnore(action.data, action.ignoreId) 
    };
  case GET_TUTORS:
    return {
      ...state,
      tutors: getSelectOptionsWithIgnore(action.data, action.ignoreId) 
    };
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
  case TOGGLE_LOADING:
    return { ...state, loading: action.loading};
  default:
    return state;
  }
};
