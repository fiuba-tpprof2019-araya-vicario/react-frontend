import axios from 'axios';
import Bluebird from 'bluebird';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import { PROFILES } from '../../utils/services/references';
import {
  getSelectOption,
  getSelectOptions,
  getSelectOptionsWithIgnore,
  getStudentIsApproved,
  getOnlyField,
  getFullName
} from '../../utils/services/functions';

const CLEAR_ALERT = 'CLEAR_ALERT';
const GET_TUTORS = 'GET_TUTORS';
const GET_COAUTORS = 'GET_COAUTORS';
const GET_CAREERS = 'GET_CAREERS';
const GET_ACTIVE_PROJECT = 'GET_ACTIVE_PROJECT';
const GET_PROJECT_TYPES = 'GET_PROJECT_TYPES';
const POST_IDEA = 'POST_IDEA';
const ABANDON_IDEA = 'ABANDON_IDEA';
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

export const ideaAbandoned = (data) => ({
  type: ABANDON_IDEA,
  data
});

export const projectTypesLoaded = (data) => ({
  type: GET_PROJECT_TYPES,
  data
});

export const careersLoaded = (data) => ({
  type: GET_CAREERS,
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
    projectTypesLoaded([
      {
        value: 1,
        label: 'Trabajo Profesional'
      },
      {
        value: 2,
        label: 'Tesis'
      },
      {
        value: 3,
        label: 'Trabajo Práctico'
      }
    ])
  );
};

const getCareers = (dispatch) => {
  dispatch(
    careersLoaded([
      {
        value: 1,
        label: 'Departamento Informática'
      },
      {
        value: 2,
        label: 'Departamento Civil'
      },
      {
        value: 3,
        label: 'Departamento Electrónica'
      },
      {
        value: 4,
        label: 'Departamento Química'
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
    .get(`${api.users}?profile_id=${PROFILES.TUTOR}`, config)
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
    .get(`${api.users}?profile_id=${PROFILES.STUDENT}`, config)
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
  careers,
  description,
  coautors,
  type,
  tutorId
}) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    name: title,
    careers: getOnlyField(careers),
    description,
    tutor_id: tutorId,
    cotutors: [],
    students: getOnlyField(coautors),
    type: type.value
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
    getCareers(dispatch),
    getCoautors(ignoreId, dispatch)
  )
    .then(() => dispatch(toggleLoading({ loading: false })))
    .catch(() => {
      dispatch(toggleLoading({ loading: false }));
    });
};

export const editIdea = (
  projectId,
  { title, description, coautors, type, autor, tutorId, careers }
) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    name: title,
    careers: getOnlyField(careers),
    description,
    autor,
    tutor_id: tutorId,
    cotutors: [],
    students: getOnlyField(coautors),
    type: type.value
  };

  axios
    .put(api.project(projectId), body, config)
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

export const abandonIdea = (projectId, memberId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .delete(api.abandonStudentProject(projectId, memberId), config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(ideaUploaded(null));
      getActiveProject(null, dispatch);
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
  students: getSelectOptions(project.Students, {
    getLabel: getFullName,
    getFixed: getStudentIsApproved
  }),
  careers: getSelectOptions(project.Careers, {
    getLabel: (careers) => careers.name
  }),
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
    case GET_CAREERS:
      return {
        ...state,
        careers: action.data
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
