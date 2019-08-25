import axios from 'axios';
import Bluebird from 'bluebird';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import references from '../../utils/services/references';
import {
  getSelectOption,
  getSelectOptions,
  getSelectOptionsWithIgnore,
  getOnlyField,
  getFullName
} from '../../utils/services/functions';

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

export const queryError = (err) => ({
  type: QUERY_ERROR,
  err
});

export const ideaUploaded = (data) => ({
  type: POST_IDEA,
  data
});

export const projectTypesUploaded = (data) => ({
  type: GET_PROJECT_TYPES,
  data
});

export const activeProjectUploaded = (data) => ({
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

const getProjectTypes = (dispatch) => {
  dispatch(
    projectTypesUploaded([
      {
        value: 1,
        label: 'Trabajo Profesional'
      },
      {
        value: 2,
        label: 'Tesis'
      }
    ])
  );
};

const getActiveProject = (projectId, dispatch) => {
  if (!projectId) {
    return Bluebird.resolve();
  }
  const config = getConfig();

  return axios
    .get(api.project(projectId), config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(activeProjectUploaded(data));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

const getTutors = (ignoreId, dispatch) => {
  const config = getConfig();

  return axios
    .get(`${api.users}?profile_id=${references.PROFILES.TUTOR}`, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(tutorsUploaded(data, ignoreId));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

const getCoautors = (ignoreId, dispatch) => {
  const config = getConfig();

  return axios
    .get(`${api.users}?profile_id=${references.PROFILES.STUDENT}`, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(coautorsUploaded(data, ignoreId));
    })
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const uploadIdea = ({
  title,
  description,
  coautors,
  type,
  autor,
  tutorId
}) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    name: title,
    description,
    autor,
    tutor_id: tutorId,
    cotutors: [],
    students: getOnlyField(coautors),
    type
  };

  axios
    .post(api.projects, body, config)
    .then((res) => res.data.data)
    .then((projectId) => {
      dispatch(ideaUploaded(projectId));
      getActiveProject(projectId, dispatch);
    })
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const getInitialData = (ignoreId, projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  Bluebird.join(
    getTutors(ignoreId, dispatch),
    getActiveProject(projectId, dispatch),
    getProjectTypes(dispatch),
    getCoautors(ignoreId, dispatch)
  )
    .then(() => dispatch(toggleLoading({ loading: false })))
    .catch(() => {
      dispatch(toggleLoading({ loading: false }));
    });
};

export const editIdea = (
  projectId,
  { title, description, coautors, type, autor, tutorId }
) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    name: title,
    description,
    autor,
    tutorId,
    cotutors: [],
    students: getOnlyField(coautors),
    type
  };

  axios
    .put(api.projects(projectId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(ideaUploaded(projectId));
      getActiveProject(projectId, dispatch);
    })
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

const getFormattedProject = (project) => ({
  ...project,
  cotutors: getSelectOptions(project.Cotutors, { getLabel: getFullName }),
  students: getSelectOptions(project.Students, { getLabel: getFullName }),
  tutor: {
    ...project.Tutor,
    ...getSelectOption(project.Tutor, { getLabel: getFullName })
  },
  creator: {
    ...project.Creator,
    ...getSelectOption(project.Creator, { getLabel: getFullName })
  },
  type: getSelectOption(project.Type, {})
});

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
      return { ...state, loading: action.loading };
    default:
      return state;
  }
};
