import axios from 'axios';
import { api } from '../../api/apiInterfaceProvider';
import { contactMessages } from '../../utils/messages';
import {
  clearAlert,
  queryError,
  toggleLoading,
  hydrateAlert
} from '../login/authReducer';

const formUploaded = () =>
  hydrateAlert({
    message: contactMessages.UPLOAD_SUCCESS,
    style: 'success',
    onDismiss: clearAlert
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
    .catch((error) => {
      dispatch(queryError(error));
      dispatch(toggleLoading({ loading: false }));
    });
};

export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
