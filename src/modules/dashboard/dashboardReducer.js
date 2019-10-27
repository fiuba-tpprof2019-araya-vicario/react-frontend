/* eslint-disable array-callback-return */
// import axios from 'axios';
// import moment from 'moment';
import { getLast30Days } from '../../utils/services/functions';
import {
  // api,
  getNullConfig
  // getErrorResponse
} from '../../api/apiInterfaceProvider';

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

export const resetDashboard = () => (dispatch) => {
  const config = getNullConfig();

  dispatch(dashboard(config));

  // axios
  //   .get(api.dashboard, config)
  //   .then((data) => {
  //     dispatch(dashboard(data));
  //   })
  //   .catch((err) => {
  //     if (err.response && err.response.status) {
  //       dispatch(queryError(getErrorResponse(err)));
  //     } else {
  //       dispatch(internalError(err));
  //     }
  //   });
};

const fetchProjects = () => {
  const projects = {
    terminated: getLast30Days(),
    inProgress: getLast30Days()
  };

  // const fechaPedido = moment(pedido.fecha, 'YYYY/MM/DD');
  // const diasDiferencia = diaDeHoy.diff(fechaPedido, 'days');

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
