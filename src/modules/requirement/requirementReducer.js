import axios from 'axios';
import { getConfig, api } from '../../api/apiInterfaceProvider';
import { utilsMessages } from '../../utils/messages';
import {
  formatterDate,
  getDescriptionByRequirementStatus
} from '../../utils/services/funtions';

const CLEAR_ALERT = 'CLEAR_ALERT';
const HYDRATE_REQUIREMENTS = 'HYDRATE_REQUIREMENTS';
const EDIT_REQUIREMENT = 'EDIT_REQUIREMENT';
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

export const requirementsEdited = () => ({
  type: EDIT_REQUIREMENT
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

export const editRequirement = (id, form) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .put(api.requirement(id), form, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(requirementsEdited());
      dispatch(getRequirements());
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const deleteRequirement = (id) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .delete(api.requirement(id), config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(requirementsEdited());
      dispatch(getRequirements());
      dispatch(toggleLoading({ loading: false }));
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
      description: rowObject.description,
      created_at: formatterDate(rowObject.createdAt),
      updated_at: formatterDate(rowObject.updatedAt),
      status: getDescriptionByRequirementStatus(rowObject.status)
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
