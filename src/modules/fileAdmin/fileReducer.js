import { getConfig, getMultipartFormDataConfig, getPostFileUploadBody, api } from '../../api/apiInterfaceProvider';
import axios from 'axios';

const HYDRATE_FILES = 'HYDRATE_FILES';
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
export const hydrateFiles = data => ({
  type: HYDRATE_FILES, data
});

// Thunks
export const getFiles = () => dispatch => {
  let config = getConfig();
  axios.get(api.files, config)
    .then(res => res.data)
    .then(data => {
      dispatch(hydrateFiles(data));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

export const uploadFile = (file,nombre) => dispatch => {
  let config = getMultipartFormDataConfig();
  var f = new File([file], nombre);
  let body = getPostFileUploadBody(f);
  axios.post(api.files, body, config)
    .then(res => res.data.data)
    .then(() => {
      dispatch(getFiles());
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

export const deleteFile = (fileId) => dispatch =>{
  let config = getConfig();
  axios.delete(api.file(fileId), config)
    .then(res => res.data.data)
    .then(() => {
      dispatch(getFiles());
    })
    .catch(err => {
      dispatch(queryError(err));
    });
}; 

const fetchFilesTable = (data) => {
  let returnValue = [];
  data.map(function (rowObject) {
    returnValue.push({ 
      id: rowObject.id, 
      filename: rowObject.filename, 
      size: rowObject.size,
      created_at: rowObject.created_at,
      updated_at: rowObject.updated_at 
    });
  });
  return returnValue;
};

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_FILES:
    return {
      ...state,
      result: fetchFilesTable(action.data.Files),
      alert: {},
    };
  default:
    return state;
  }
};
