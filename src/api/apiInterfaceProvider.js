
import { BASE } from './api';

// Api routes phrases
const LOGIN = 'token';
const APPSERVERS = 'servers';
const FILES = 'files';

export const api = {
  base: BASE,
  login: BASE + LOGIN,
  appServers: BASE + APPSERVERS,
  files: BASE + FILES,
  appServer: (id) => {
    return BASE + APPSERVERS + '/' + id;
  },
  file: (id) => {
    return BASE + FILES + '/' + id;
  },
};

const getStoredToken = () => (localStorage.getItem('token'));

export const getConfig = () => ({
  headers: {
    'Authorization': getStoredToken(),
  }
});

export const getNullConfig = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  }
});

export const getFirebaseConfig = () => ({
  crossdomain: 'true',
  dataType : 'jsonp',
  headers: {
    'crossdomain': 'true',
    'dataType': 'jsonp',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  }
});

export const getMultipartFormDataConfig = () => ({
  headers: {
    'Authorization': getStoredToken(),
    'content-type': 'multipart/form-data'
  }
});

export const getFileConfig = () => ({
  headers: {
    'Authorization': getStoredToken(),
    
  },
  responseType: 'blob'
});

export const getErrorResponse = (err) => {
  return { status: err.response.status, message: err.response.data.message.msg };
};

export const getPostAppServerBody = (nombre, url) => ({
  id: null,
  name: nombre,
  url: url,
  _rev: null,
  created_by: null,
  created_at: null,
  last_connection: null
});

export const getPostFileUploadBody = (archivo) => {
  const formData = new FormData();
  formData.append('file', archivo);
  formData.append('id', null);
  formData.append('_rev', null);
  formData.append('resource', null);
  formData.append('created_at', null);
  formData.append('created_by', null);
  formData.append('updated_at', null);
  formData.append('filename', null);
  formData.append('size', null);
  return formData;
};