import { BASE } from './api';

// Api routes phrases
const LOGIN = 'auth';
const PROJECTS = 'projects';
const USERS = 'users';
const REQUESTS = 'requests';
const REQUIREMENTS = 'requirements';
const CONTACT = 'contacts';

export const api = {
  base: BASE,
  login: BASE + LOGIN,
  contact: BASE + CONTACT,
  projects: BASE + PROJECTS,
  users: BASE + USERS,
  requestsTutors: `${BASE + REQUESTS}/tutors`,
  requestsStudents: `${BASE + REQUESTS}/students`,
  requirements: BASE + REQUIREMENTS,
  requirement: (id) => `${BASE + REQUIREMENTS}/${id}`,
  project: (id) => `${BASE + PROJECTS}/${id}`,
  acceptTutorRequest: (id) => `${BASE + REQUESTS}/tutors/${id}`,
  rejectTutorRequest: (id) => `${BASE + REQUESTS}/tutors/${id}`,
  acceptStudentRequest: (id) => `${BASE + REQUESTS}/students/${id}`,
  rejectStudentRequest: (id) => `${BASE + REQUESTS}/students/${id}`
};

const getStoredToken = () => localStorage.getItem('token');

export const getConfig = () => ({
  headers: {
    Authorization: getStoredToken()
  }
});

export const getNullConfig = () => ({
  headers: {}
});

export const getFirebaseConfig = () => ({
  crossdomain: 'true',
  dataType: 'jsonp',
  headers: {
    crossdomain: 'true',
    dataType: 'jsonp',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*'
  }
});

export const getMultipartFormDataConfig = () => ({
  headers: {
    Authorization: getStoredToken(),
    'content-type': 'multipart/form-data'
  }
});

export const getFileConfig = () => ({
  headers: {
    Authorization: getStoredToken()
  },
  responseType: 'blob'
});

export const getErrorResponse = (err) => ({
  status: err.response.status,
  message: err.response.data.message.msg
});

export const getPostAppServerBody = (nombre, url) => ({
  id: null,
  name: nombre,
  url,
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
