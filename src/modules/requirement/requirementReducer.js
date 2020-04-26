import axios from 'axios';
import Bluebird from 'bluebird';
import {
  getConfig,
  getConfigMultipart,
  api
} from '../../api/apiInterfaceProvider';
import {
  formatterDate,
  getDescriptionByRequirementStatus
} from '../../utils/services/functions';
import { getInitialData as loadCreateProjectData } from '../myProject/myProjectReducer';
import { queryError, toggleLoading } from '../login/authReducer';

const HYDRATE_REQUIREMENTS = 'HYDRATE_REQUIREMENTS';
const EDIT_REQUIREMENT = 'EDIT_REQUIREMENT';
const UPLOAD_REQUIREMENT = 'UPLOAD_REQUIREMENT';

const initialState = {
  alert: null,
  loading: false,
  requirements: null
};

const hydrateRequirements = (data) => ({
  type: HYDRATE_REQUIREMENTS,
  data
});

const requirementsUploaded = () => ({
  type: UPLOAD_REQUIREMENT
});

const requirementsEdited = () => ({
  type: EDIT_REQUIREMENT
});

export const getRequirements = (dispatch) => {
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

export const getInitialData = (userId) => (dispatch) =>
  Bluebird.join(
    dispatch(loadCreateProjectData(userId)),
    getRequirements(dispatch)
  );

export const editRequirement = (id, form) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfig();

  axios
    .put(api.requirement(id), form, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(requirementsEdited());
      dispatch(getRequirements(dispatch));
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
      dispatch(getRequirements(dispatch));
      dispatch(toggleLoading({ loading: false }));
    })
    .catch((err) => {
      dispatch(toggleLoading({ loading: false }));
      dispatch(queryError(err));
    });
};

export const uploadRequirement = (form) => (dispatch) => {
  dispatch(toggleLoading({ loading: true }));
  const config = getConfigMultipart();
  const formData = new FormData();

  formData.append('file', form.file);
  formData.append('name', form.name);
  formData.append('description', form.description);

  axios
    .post(api.requirements, formData, config)
    .then((res) => res.data.data)
    .then(() => {
      dispatch(requirementsUploaded());
      getRequirements(dispatch);
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
      name: rowObject.name,
      description: rowObject.description,
      file_url: rowObject.file_url,
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
    default:
      return state;
  }
};
