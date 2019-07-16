import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import references from '../../utils/services/references';
import { getSelectOption, getSelectOptions, getSelectOptionsWithIgnore, getOnlyField } from '../../utils/services/funtions';
import axios from 'axios';
import Bluebird from 'bluebird';

const CLEAR_ALERT = 'CLEAR_ALERT';
const GET_TUTORS = 'GET_TUTORS';
const GET_COAUTORS = 'GET_COAUTORS';
const GET_ACTIVE_PROJECT = 'GET_ACTIVE_PROJECT';
const GET_PROJECT_TYPES = 'GET_PROJECT_TYPES';
const POST_IDEA = 'POST_IDEA';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

const initialState = {
  alert: null,
  loading: false,
  project: null,
  coautors: null,
  projectTypes: null,
  tutors: null
};

const toggleLoading = ({ loading }) => ({
  type: TOGGLE_LOADING,
  loading
});

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const queryError = err => ({
  type: QUERY_ERROR,
  err
});

export const ideaUploaded = data => ({
  type: POST_IDEA,
  data
});

export const projectTypesUploaded = data => ({
  type: GET_PROJECT_TYPES,
  data
});

export const activeProjectUploaded = data => ({
  type: GET_ACTIVE_PROJECT,
  data
});

export const coautorsUploaded = (data, ignoreId) => ({
  type: GET_COAUTORS,
  data,
  ignoreId
});

export const tutorsUploaded = (data, ignoreId) => ({
  type: GET_TUTORS,
  data,
  ignoreId
});

export const getInitialData = (ignoreId, projectId) => dispatch => {
  dispatch(toggleLoading({ loading: true }));
  Bluebird.join(
    getTutors(ignoreId, dispatch),
    getActiveProject(projectId, dispatch),
    getProjectTypes(dispatch),
    getCoautors(ignoreId, dispatch))
    .then(() => 
      dispatch(toggleLoading({ loading: false }))
    );
};

const getProjectTypes = (dispatch) => {
  dispatch(projectTypesUploaded([
    {
      value: 1,
      label: 'Trabajo Profesional'
    },
    {
      value: 2,
      label: 'Tesis' 
    }
  ]));
};

const getActiveProject = (projectId, dispatch) => {
  console.log('projectId', projectId);
  if(!projectId) {
    return Bluebird.resolve();
  }
  let config = getConfig();

  return axios
    .get(api.project(projectId), config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(activeProjectUploaded(data));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

const getTutors = (ignoreId, dispatch) => {
  let config = getConfig();
  return axios
    .get(api.users+'?profile_id='+references.PROFILES.TUTOR, config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(tutorsUploaded(data, ignoreId));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

const getCoautors = (ignoreId, dispatch) => {
  let config = getConfig();
  return axios
    .get(api.users+'?profile_id='+references.PROFILES.STUDENT, config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(coautorsUploaded(data, ignoreId));
    })
    .catch(err => {
      dispatch(queryError(err));
    });
};

export const uploadIdea = ({title, description, coautors, type, autor, tutor_id}) => dispatch => {
  dispatch(toggleLoading({ loading: true }));
  let config = getConfig();
  const body = {
    name: title,
    description,
    autor,
    tutor_id,
    cotutors: [],
    students: getOnlyField(coautors),
    type
  };

  axios
    .post(api.projects, body, config)
    .then(res => res.data.data)
    .then((data) => {
      dispatch(ideaUploaded(data));
      dispatch(toggleLoading({ loading: false }));
    })
    .catch(err => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

const getFormattedProject = (project) => {
  return {
    ...project,
    tutors: getSelectOptions(project.tutors),
    type: getSelectOption(project.Type),
    students: getSelectOptions(project.Students),
    tutor: { ...project.tutor, ...getSelectOption(project.tutor)}
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_COAUTORS:
    return {
      ...state,
      coautors: getSelectOptionsWithIgnore(action.data, action.ignoreId) 
    };
  case GET_ACTIVE_PROJECT:
    return {
      ...state,
      project: getFormattedProject(action.data)
    };
  case GET_PROJECT_TYPES:
    return {
      ...state,
      projectTypes: action.data 
    };
  case GET_TUTORS:
    return {
      ...state,
      tutors: getSelectOptionsWithIgnore(action.data, action.ignoreId) 
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
    return { ...state, loading: action.loading};
  default:
    return state;
  }
};
