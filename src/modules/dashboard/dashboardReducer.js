import axios from 'axios';
import { api, getConfig } from '../../api/apiInterfaceProvider';
import { getMonthTextFromNumber } from '../../utils/services/functions';
import { internalError } from '../login/authReducer';

const HYDRATE_DASHBOARD = 'HYDRATE_DASHBOARD';

const dashboard = (data) => ({
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
    .catch((error) => {
      dispatch(internalError(error));
    });
};

const fetchProjects = (data) => {
  const totalInProgress = data.reduce(
    (acum, value) => acum + value.progress,
    0
  );
  const totalTerminated = data.reduce(
    (acum, value) => acum + value.terminated,
    0
  );
  const projects = {
    progress: data.map((project) => ({
      x: getMonthTextFromNumber(project.month),
      y: parseInt(project.progress, 10)
    })),
    terminated: data.map((project) => ({
      x: getMonthTextFromNumber(project.month),
      y: parseInt(project.terminated, 10)
    })),
    total: [
      {
        angle: totalInProgress,
        value: totalInProgress,
        detail: 'En progreso'
      },
      {
        angle: totalTerminated,
        value: totalTerminated,
        detail: 'Terminados'
      }
    ]
  };

  return projects;
};

export default (
  state = { projects: { progress: [], terminated: [], total: [] } },
  action
) => {
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
