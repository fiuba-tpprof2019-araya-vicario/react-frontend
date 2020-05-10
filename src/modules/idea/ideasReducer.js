import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import {
  formatterDate,
  getStudentsNames,
  getTutorsNames
} from '../../utils/services/functions';
import { queryError, toggleLoading } from '../login/authReducer';

const HYDRATE_IDEAS = 'HYDRATE_IDEAS';
const HYDRATE_IDEA = 'HYDRATE_IDEA';

const hydrateProject = (data) => ({
  type: HYDRATE_IDEA,
  data
});

const hydrateProjects = (data) => ({
  type: HYDRATE_IDEAS,
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
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const getProjects = (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.projectsCreated, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateProjects(data));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const getInitialData = () => (dispatch) => {
  getProjects(dispatch);
};

const fetchProjectsTable = (data) =>
  data.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    students: getStudentsNames(project.Creator, project.Students),
    tutors: getTutorsNames(project.Tutor, project.Cotutors),
    type: project.Type.name,
    created_at: formatterDate(project.createdAt)
  }));

export default (state = { projects: [], project: {} }, action) => {
  switch (action.type) {
    case HYDRATE_IDEAS:
      return {
        ...state,
        projects: fetchProjectsTable(action.data)
      };
    case HYDRATE_IDEA:
      return {
        ...state,
        project: action.data
      };
    default:
      return state;
  }
};
