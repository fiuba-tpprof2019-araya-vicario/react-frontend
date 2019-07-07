import { getNullConfig, api } from '../../api/apiInterfaceProvider';
import { contactMessages, utilsMessages } from '../../utils/messages';
import axios from 'axios';

const CLEAR_ALERT = 'CLEAR_ALERT';
const UPLOAD_FORM = 'UPLOAD_FORM';
const QUERY_ERROR = 'QUERY_ERROR';

const initialState = {
  alert: null,
};

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const queryError = err => ({
  type: QUERY_ERROR, err
});

export const formUploaded = data => ({
  type: UPLOAD_FORM, data
});

export const upload = ({ email, name, description }) => dispatch => {
  let config = getNullConfig();
  const body = {
    email,
    name,
    description
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
      alert: {
        message: contactMessages.UPLOAD_SUCCESS,
        style: 'success',
        onDismiss: clearAlert
      }
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
  default:
    return state;
  }
};
