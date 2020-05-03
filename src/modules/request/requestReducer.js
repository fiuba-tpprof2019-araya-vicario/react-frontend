import axios from 'axios';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import {
  formatterDate,
  getDescriptionByRequestStatus
} from '../../utils/services/functions';
import { queryError, toggleLoading } from '../login/authReducer';

const HYDRATE_REQUESTS_TUTORS = 'HYDRATE_REQUESTS_TUTORS';
const HYDRATE_REQUESTS_STUDENTS = 'HYDRATE_REQUESTS_STUDENTS';
const POST_IDEA = 'POST_IDEA';

const ideaAccepted = (data) => ({
  type: POST_IDEA,
  data
});

export const hydrateRequestsStudents = (data) => ({
  type: HYDRATE_REQUESTS_STUDENTS,
  data
});

export const hydrateRequestsTutors = (data) => ({
  type: HYDRATE_REQUESTS_TUTORS,
  data
});

export const getRequestsTutors = (dispatch) => {
  const config = getConfig();

  axios
    .get(api.requestsTutors, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(hydrateRequestsTutors(data));
    })
    .catch((error) => {
      dispatch(queryError(error));
    });
};

export const getRequestsStudents = (dispatch) => {
  const config = getConfig();

  axios
    .get(api.requestsStudents, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(hydrateRequestsStudents(data));
    })
    .catch((error) => {
      dispatch(queryError(error));
    });
};

export const getRequestsWithDispatch = (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  Promise.all([getRequestsTutors(dispatch), getRequestsStudents(dispatch)])
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const getRequests = () => (dispatch) =>
  getRequestsWithDispatch(dispatch);

export const acceptTutorRequest = (requestId) => (dispatch) => {
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
      getRequestsWithDispatch(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const acceptStudentRequest = (requestId, projectId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    status: 'accepted'
  };

  axios
    .put(api.acceptStudentRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(ideaAccepted(projectId));
      getRequestsWithDispatch(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const rejectTutorRequest = (requestId) => (dispatch) => {
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
      getRequestsWithDispatch(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

export const rejectStudentRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    status: 'rejected'
  };

  axios
    .put(api.rejectStudentRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      getRequestsWithDispatch(dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((error) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(error));
    });
};

const fetchRequestTable = (data) => {
  const returnValue = [];

  data.forEach((rowObject) => {
    returnValue.push({
      id: rowObject.id,
      projectId: rowObject.Project.id,
      creator: `${rowObject.User.name} ${rowObject.User.surname}`,
      project: rowObject.Project.name,
      created_at: formatterDate(rowObject.createdAt),
      updated_at: formatterDate(rowObject.updatedAt),
      status: getDescriptionByRequestStatus(rowObject.status)
    });
  });

  return returnValue;
};

export default (state = { tutorRequests: [], studentRequests: [] }, action) => {
  switch (action.type) {
    case HYDRATE_REQUESTS_TUTORS:
      return {
        ...state,
        tutorRequests: fetchRequestTable(action.data)
      };
    case HYDRATE_REQUESTS_STUDENTS:
      return {
        ...state,
        studentRequests: fetchRequestTable(action.data)
      };
    default:
      return state;
  }
};
