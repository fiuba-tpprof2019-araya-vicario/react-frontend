import axios from 'axios';
import { api } from '../../api/apiInterfaceProvider';
import { contactMessages } from '../../utils/messages';
import { clearAlert, queryError, toggleLoading } from '../login/authReducer';

const UPLOAD_FORM = 'UPLOAD_FORM';

const initialState = {
  alert: null,
  loading: false
};

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
