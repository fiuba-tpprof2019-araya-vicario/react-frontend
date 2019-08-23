import axios from 'axios';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_REQUIREMENTS = 'HYDRATE_REQUIREMENTS';
const QUERY_ERROR = 'QUERY_ERROR';
const TOGGLE_LOADING = 'TOGGLE_LOADING';
const UPLOAD_REQUIREMENT = 'UPLOAD_REQUIREMENT';

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

export const queryError = (err) => ({
  type: QUERY_ERROR,
  err
});

export const hydrateRequirements = (data) => ({
  type: HYDRATE_REQUIREMENTS,
  data
});

export const requirementsUploaded = () => ({
  type: UPLOAD_REQUIREMENT
});

export const getRequirements = () => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .get(api.requirements, config)
    .then((res) => res.data.data)
    .then((data) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(hydrateRequirements(data));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const uploadRequirement = (form) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .post(api.requirements, form, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(requirementsUploaded());
      dispatch(getRequirements());
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

const fetchRequirementTable = (data) => {
  const returnValue = [];

  data.forEach((rowObject) => {
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
