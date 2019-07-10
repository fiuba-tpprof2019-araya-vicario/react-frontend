import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import references from '../../utils/services/references';
import { getSelectOptions } from '../../utils/services/funtions';
import axios from 'axios';
import Bluebird from 'bluebird';

const CLEAR_ALERT = 'CLEAR_ALERT';
const GET_TUTORS = 'GET_TUTORS';
const GET_COAUTORS = 'GET_COAUTORS';
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

export const coautorsUploaded = data => ({
  type: GET_COAUTORS,
  data
});

export const tutorsUploaded = data => ({
  type: GET_TUTORS,
  data
});

export const getInitialData = () => dispatch => {
  dispatch(toggleLoading({ loading: true }));
  Bluebird.join(getTutors(dispatch),getCoautors(dispatch))
    .then(() => 
      dispatch(toggleLoading({ loading: false }))
    );
};

const getTutors = (dispatch) => {
  let config = getConfig();

  return axios
    .get(api.users+'?profile_id='+references.PROFILES.TUTOR, config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(tutorsUploaded(data));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

const getCoautors = (dispatch) => {
  let config = getConfig();
  return axios
    .get(api.users+'?profile_id='+references.PROFILES.STUDENT, config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(coautorsUploaded(data));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

export const uploadIdea = ({ email, name, description }) => dispatch => {
  dispatch(toggleLoading({ loading: true }));
  let config = getConfig();
  const body = {
    email,
    name,
    description
  };

  axios
    .post(api.contact, body, config)
    .then(res => res)
    .then(() => {
      dispatch(coautorsUploaded());
      dispatch(toggleLoading({ loading: false }));
    })
    .catch(err => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_COAUTORS:
    return {
      ...state,
      coautors: getSelectOptions(action.data) 
    };
  case GET_TUTORS:
    return {
      ...state,
      tutors: getSelectOptions(action.data) 
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
