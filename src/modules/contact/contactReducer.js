import { getNullConfig, api } from '../../api/apiInterfaceProvider';
import axios from 'axios';

const UPLOAD_FORM = 'HYDRATE_FILES';
const QUERY_ERROR = 'QUERY_ERROR';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const initialState = {
  result: [],
  alert: {},
};

export const queryError = err => ({
  type: QUERY_ERROR, err
});

export const internalError = err => ({
  type: INTERNAL_ERROR, err
});

// Action creators
export const formUploaded = data => ({
  type: UPLOAD_FORM, data
});

export const upload = (email, name) => dispatch => {
  let config = getNullConfig();
  const body = {
    email,
    name
  };

  axios.post(api.contact, body, config)
    .then(res => res)
    .then(() => {
      dispatch(formUploaded());
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPLOAD_FORM:
    return {
      ...state,
      alert: {},
    };
  default:
    return state;
  }
};
