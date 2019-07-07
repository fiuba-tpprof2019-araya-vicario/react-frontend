import { getNullConfig, api } from '../../api/apiInterfaceProvider';
import axios from 'axios';

const UPLOAD_FORM = 'UPLOAD_FORM';
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
      dispatch(formUploaded(err));
    });
};

export default (state = initialState, action) => {
  switch (action.type) {
  case UPLOAD_FORM:
    return {
      ...state,
      successMessage: 'El requerimiento se ha cargado correctamente. Espera a que personal de FIUBA se contacte con usted',
    };
  default:
    return state;
  }
};
