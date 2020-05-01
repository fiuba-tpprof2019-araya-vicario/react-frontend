import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import {
  getYearFromDate,
  getStudentsNames,
  getTutorsNames
} from '../../utils/services/functions';
import { queryError, toggleLoading } from '../login/authReducer';

const HYDRATE_PUBLIC_PROJECTS = 'HYDRATE_PUBLIC_PROJECTS';

const hydrateProjects = (data) => ({
  type: HYDRATE_PUBLIC_PROJECTS,
  data
});

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

export default (state = { projects: [], project: {} }, action) => {
  switch (action.type) {
    case HYDRATE_PUBLIC_PROJECTS:
      return {
        ...state,
        projects: fetchProjectsTable(action.data)
      };
    default:
      return state;
  }
};
