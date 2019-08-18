import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import axios from 'axios';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_REQUIREMENTS = 'HYDRATE_REQUIREMENTS';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';

const initialState = {
  alert: null,
  loading: false,
  requirements: null
};

const toggleLoading = ({ loading }) => ({
  type: TOGGLE_LOADING,
  loading
});

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const queryError = err => ({
  type: QUERY_ERROR, err
});

export const hydrateRequirements = data => ({
  type: HYDRATE_REQUIREMENTS, data
});

export const getRequirements = () => dispatch => {
  dispatch(toggleLoading({ loading: true }));
  let config = getConfig();
  axios.get(api.requirements, config)
    .then(res => res.data.data)
    .then(data => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateRequirements(data));
    })
    .catch(err => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

const fetchRequirementTable = (data) => {
  let returnValue = [];
  data.map(function (rowObject) {
    returnValue.push({
      id: rowObject.id,
      creator: `${rowObject.Creator.name} ${rowObject.Creator.surname}`,
      requirement: rowObject.name,
      created_at: rowObject.createdAt,
      updated_at: rowObject.updatedAt,
      status: rowObject.status
    });
  });
  return returnValue;
};

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_REQUIREMENTS:
    return {
      ...state,
      requirements: fetchRequirementTable(action.data)
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
