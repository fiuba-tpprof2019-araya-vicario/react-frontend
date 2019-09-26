import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import { commissionsMessages } from '../../utils/messages';
import {
  getStudentsNames,
  formatterDate,
  getTutorsNames
} from '../../utils/services/functions';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_COMMISSIONS = 'HYDRATE_COMMISSIONS';
const HYDRATE_COMMISSION = 'HYDRATE_COMMISSION';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const ABANDON_COMMISSION = 'ABANDON_COMMISSION';

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

export const abandonedIdea = () => ({
  type: ABANDON_COMMISSION
});

export const hydrateProject = (data) => ({
  type: HYDRATE_COMMISSION,
  data
});

export const hydrateProjects = (data) => ({
  type: HYDRATE_COMMISSIONS,
  data
});

export const rejectIdea = (projectId, memberId, postAction = () => {}) => (
  dispatch
) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .delete(api.abandonTutorProject(projectId, memberId), config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(abandonedIdea());
      postAction();
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

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
    .get(api.projectsInAppreciation, config)
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

export const acceptRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    type: 'tutor',
    status: 'accepted'
  };

  axios
    .put(api.acceptTutorRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getProjects(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const rejectRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    type: 'tutor',
    status: 'rejected'
  };

  axios
    .put(api.rejectTutorRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getProjects(dispatch);
      dispatch(toggleLoading({ loading: false }));
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
  data.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    students: getStudentsNames(project.Creator, project.Students),
    tutors: getTutorsNames(project.Tutor, project.Cotutors),
    type: project.Type.name,
    created_at: formatterDate(project.createdAt)
  }));

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_COMMISSIONS:
      return {
        ...state,
        projects: fetchProjectsTable(action.data)
      };
    case HYDRATE_COMMISSION:
      return {
        ...state,
        project: action.data
      };
    case ABANDON_COMMISSION:
      return {
        ...state,
        alert: {
          message: commissionsMessages.ABANDON_SUCCESS,
          style: 'success',
          onDismiss: clearAlert
        }
      };
    default:
      return state;
  }
};
