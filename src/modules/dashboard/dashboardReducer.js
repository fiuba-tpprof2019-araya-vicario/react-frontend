import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import { getMonthTextFromNumber } from '../../utils/services/functions';
import { internalError } from '../login/authReducer';

const HYDRATE_DASHBOARD = 'HYDRATE_DASHBOARD';

const initialState = {
  result: [],
  alert: {},
  data: []
};

export const dashboard = (data) => ({
  type: HYDRATE_DASHBOARD,
  data
});

export const resetDashboard = (year) => (dispatch) => {
  const config = getConfig();

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
    default:
      return state;
  }
};
