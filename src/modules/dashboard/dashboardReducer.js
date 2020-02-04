import axios from 'axios';
import { api, getNullConfig } from '../../api/apiInterfaceProvider';
import { getMonthTextFromNumber } from '../../utils/services/functions';

const HYDRATE_DASHBOARD = 'HYDRATE_DASHBOARD';
const QUERY_ERROR = 'QUERY_ERROR';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const SUCCESSFUL = 'SUCCESSFUL';
const CLEAR_ALERT = 'CLEAR_ALERT';

const initialState = {
  result: [],
  alert: {},
  data: []
};

export const clearAlert = () => ({
  type: CLEAR_ALERT
});

export const queryError = (err) => ({
  type: QUERY_ERROR,
  err
});

export const internalError = (err) => ({
  type: INTERNAL_ERROR,
  err
});

export const successful = (text) => ({
  type: SUCCESSFUL,
  text
});

export const dashboard = (data) => ({
  type: HYDRATE_DASHBOARD,
  data
});

export const resetDashboard = (year) => (dispatch) => {
  const config = getNullConfig();

  axios
    .get(`${api.dashboard}?year=${year}`, config)
    .then(({ data }) => {
      dispatch(dashboard(data.data));
    })
    .catch((err) => {
      dispatch(internalError(err));
    });
};

const fetchProjects = (data) => {
  const projects = {
    progress: data.map((project) => ({
      x: getMonthTextFromNumber(project.month),
      y: parseInt(project.progress, 10) + Math.random()
    })),
    terminated: data.map((project) => ({
      x: getMonthTextFromNumber(project.month),
      y: parseInt(project.terminated, 10) + Math.random()
    })),
    total: [
      {
        angle: data.reduce((acum, value) => acum + value.progress, 0) + 2,
        label: 'en progreso'
      },
      {
        angle: data.reduce((acum, value) => acum + value.terminated, 0) + 7,
        label: 'terminados'
      }
    ]
  };

  console.log(projects);

  return projects;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_DASHBOARD:
      return {
        ...state,
        projects: fetchProjects(action.data)
      };
    case QUERY_ERROR:
      return {
        ...state,
        alert: { style: 'danger', text: JSON.stringify(action.err.message) }
      };
    case INTERNAL_ERROR:
      return {
        ...state,
        alert: { style: 'danger', text: 'Ocurrió un error inesperado' }
      };
    case SUCCESSFUL:
      return { ...state, alert: { style: 'success', text: action.text } };
    case CLEAR_ALERT:
      return { ...state, alert: {} };
    default:
      return state;
  }
};
