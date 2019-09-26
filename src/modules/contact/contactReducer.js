import axios from 'axios';
import { api } from '../../api/apiInterfaceProvider';
import { contactMessages } from '../../utils/messages';

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
  const body = {
    email,
    name,
    description
  };

  axios
    .post(api.contact, body)
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
    default:
      return state;
  }
};
