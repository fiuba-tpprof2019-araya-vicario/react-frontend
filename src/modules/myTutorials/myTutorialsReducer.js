import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import { formatterDate } from '../../utils/services/functions';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_MY_TUTORIALS = 'HYDRATE_MY_TUTORIALS';
const EDIT_MY_TUTORIALS = 'EDIT_MY_TUTORIALS';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const UPLOAD_MY_TUTORIALS = 'UPLOAD_MY_TUTORIALS';

const initialState = {
  alert: null,
  loading: false,
  myTutorials: [],
  myCoTutorials: []
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

export const hydrateMyTutorials = (data) => ({
  type: HYDRATE_MY_TUTORIALS,
  data
});

export const myTutorialsUploaded = () => ({
  type: UPLOAD_MY_TUTORIALS
});

export const myTutorialsEdited = () => ({
  type: EDIT_MY_TUTORIALS
});

export const abandonIdea = (projectId, memberId) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .delete(api.abandonTutorProject(projectId, memberId), config)
    .then((res) => res.data.data)
    .then(() => {
      // dispatch(ideaUploaded(null));
      // getActiveProject(null, dispatch);
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(queryError(err));
      dispatch(toggleLoading({ loading: false }));
    });
};

export const getMyTutorials = () => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.projectsTutor, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateMyTutorials(data));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

const fetchMyTutorialsTable = (data) =>
  data.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    type: project.Type.name,
    created_at: formatterDate(project.createdAt),
    status: project.State.name
  }));

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_MY_TUTORIALS:
      return {
        ...state,
        myTutorials: fetchMyTutorialsTable(action.data.Tutorials),
        myCoTutorials: fetchMyTutorialsTable(action.data.Cotutorials)
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
