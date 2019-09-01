import axios from 'axios';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import { formatterDate } from '../../utils/services/functions';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_MY_TUTORIALSS = 'HYDRATE_MY_TUTORIALSS';
const EDIT_MY_TUTORIALS = 'EDIT_MY_TUTORIALS';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const UPLOAD_MY_TUTORIALS = 'UPLOAD_MY_TUTORIALS';

const initialState = {
  alert: null,
  loading: false,
  myTutorials: null
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
  type: HYDRATE_MY_TUTORIALSS,
  data
});

export const myTutorialsUploaded = () => ({
  type: UPLOAD_MY_TUTORIALS
});

export const myTutorialsEdited = () => ({
  type: EDIT_MY_TUTORIALS
});

export const getMyTutorials = () => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.projects, config)
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

const fetchMyTutorialsTable = (data) => {
  const returnValue = [];

  data.forEach((rowObject) => {
    returnValue.push({
      id: rowObject.id,
      // creator: `${rowObject.Creator.name} ${rowObject.Creator.surname}`,
      name: rowObject.name,
      // description: rowObject.description,
      created_at: formatterDate(rowObject.createdAt),
      updated_at: formatterDate(rowObject.updatedAt)
      // status: getDescriptionByMyTutorialsStatus(rowObject.status)
    });
  });

  return returnValue;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_MY_TUTORIALSS:
      return {
        ...state,
        myTutorials: fetchMyTutorialsTable(action.data)
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
