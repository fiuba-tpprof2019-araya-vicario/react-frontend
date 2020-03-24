import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import {
  getYearFromDate,
  getStudentsNames,
  getTutorsNames
} from '../../utils/services/functions';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_PUBLIC_PROJECTS = 'HYDRATE_PUBLIC_PROJECTS';
const HYDRATE_PUBLIC_PROJECT = 'HYDRATE_PUBLIC_PROJECT';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

const initialState = {
  alert: null,
  loading: false,
  projects: [],
  project: {}
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

export const hydrateProject = (data) => ({
  type: HYDRATE_PUBLIC_PROJECT,
  data
});

export const hydrateProjects = (data) => ({
  type: HYDRATE_PUBLIC_PROJECTS,
  data
});

export const getProject = (projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.project(projectId), config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateProject(data));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const getProjects = (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.projectsPublicated, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateProjects(data));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const getInitialData = () => (dispatch) => {
  getProjects(dispatch);
};

const fetchProjectsTable = (data) =>
  data.map((project, index) => {
    const {
      Presentation,
      Creator,
      Students,
      Tutor,
      Cotutors,
      Type,
      name
    } = project;
    const {
      description,
      presentation_url: presentationURL,
      presentation_name: presentationName,
      presentation_visible: presentationVisible,
      documentation_url: documentationURL,
      documentation_name: documentationName,
      documentation_visible: documentationVisible,
      createdAt
    } = Presentation;

    return {
      id: index,
      name,
      description,
      year: getYearFromDate(createdAt),
      students: getStudentsNames(Creator, Students),
      tutors: getTutorsNames(Tutor, Cotutors),
      type: Type.name,
      presentationURL,
      presentationName,
      presentationVisible,
      documentationURL,
      documentationName,
      documentationVisible
    };
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_PUBLIC_PROJECTS:
      return {
        ...state,
        projects: fetchProjectsTable(action.data)
      };
    case HYDRATE_PUBLIC_PROJECT:
      return {
        ...state,
        project: action.data
      };
    default:
      return state;
  }
};
