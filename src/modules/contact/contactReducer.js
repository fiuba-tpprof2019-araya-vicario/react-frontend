import axios from 'axios';
import { getNullConfig, api } from '../../api/apiInterfaceProvider';
import { contactMessages, utilsMessages } from '../../utils/messages';

const CLEAR_ALERT = 'CLEAR_ALERT';
const UPLOAD_FORM = 'UPLOAD_FORM';
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

export const queryError = (err) => ({
  type: QUERY_ERROR,
  err
});

export const formUploaded = (data) => ({
  type: UPLOAD_FORM,
  data
});

export const upload = ({ email, name, description }) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getNullConfig();
  const body = {
    email,
    name,
    description
  };

  axios
    .post(api.contact, body, config)
    .then((res) => res)
    .then(() => {
      dispatch(formUploaded());
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
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
    case TOGGLE_LOADING:
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
