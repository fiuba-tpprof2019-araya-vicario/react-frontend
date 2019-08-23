import axios from 'axios';
import Bluebird from 'bluebird';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import { formatterDate } from '../../utils/services/funtions';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_REQUESTS_TUTORS = 'HYDRATE_REQUESTS_TUTORS';
const HYDRATE_REQUESTS_STUDENTS = 'HYDRATE_REQUESTS_STUDENTS';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

const initialState = {
  alert: null,
  loading: false,
  requests: null
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
    .catch((err) => {
      dispatch(queryError(err));
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
    .catch((err) => {
      dispatch(queryError(err));
    });
};

export const getRequests = () => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  Bluebird.join(getRequestsTutors(dispatch), getRequestsStudents(dispatch))
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

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
      dispatch(toggleLoading({ loading: false }));
    })
    .catch(() => {
      dispatch(toggleLoading({ loading: false }));
    });
};

export const acceptStudentRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    type: 'student',
    status: 'accepted'
  };

  axios
    .put(api.acceptStudentRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch(() => {
      dispatch(toggleLoading({ loading: false }));
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
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const rejectStudentRequest = (requestId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();
  const body = {
    type: 'student',
    status: 'rejected'
  };

  axios
    .put(api.rejectStudentRequest(requestId), body, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

const fetchRequestTable = (data) => {
  const returnValue = [];

  data.forEach((rowObject) => {
    returnValue.push({
      id: rowObject.id,
      creator: `${rowObject.User.name} ${rowObject.User.surname}`,
      project: rowObject.Project.name,
      created_at: formatterDate(rowObject.createdAt),
      updated_at: formatterDate(rowObject.updatedAt)
    });
  });

  return returnValue;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_REQUESTS_TUTORS:
      return {
        ...state,
        studentRequests: fetchRequestTable(action.data)
      };
    case HYDRATE_REQUESTS_STUDENTS:
      return {
        ...state,
        tutorRequests: fetchRequestTable(action.data)
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
