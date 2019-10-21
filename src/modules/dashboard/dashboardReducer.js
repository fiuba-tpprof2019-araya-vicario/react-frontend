/* eslint-disable array-callback-return */
import axios from 'axios';
import moment from 'moment';
import { getLast30Days } from '../../utils/services/functions';
import {
  api,
  getNullConfig,
  getErrorResponse
} from '../../api/apiInterfaceProvider';

const HYDRATE_DASHBOARD = 'HYDRATE_DASHBOARD';
const HYDRATE_USUARIO_BY_ID = 'HYDRATE_USUARIO_BY_ID';
const HYDRATE_POSICION = 'HYDRATE_POSICION';
const HYDRATE_TIPO_DASHBOARD = 'HYDRATE_TIPO_DASHBOARD';
const QUERY_ERROR = 'QUERY_ERROR';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const SUCCESSFUL = 'SUCCESSFUL';
const CLEAR_USUARIO_RESULT = 'CLEAR_USUARIO_RESULT';
const CLEAR_ALERT = 'CLEAR_ALERT';
const REMOVE_ROL = 'REMOVE_ROL';
const ADD_ROL = 'ADD_ROL';
const PATCH_USUARIO = 'PATCH_USUARIO';

const initialState = {
  result: [],
  alert: {},
  allTipoDashboard: [],
  activeUsuario: {},
  activeSearch: false
};

export const clearUsuarioResult = () => ({
  type: CLEAR_USUARIO_RESULT
});

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

// normal action creators
export const tipoDashboardTodos = (data) => ({
  type: HYDRATE_TIPO_DASHBOARD,
  data
});

export const dashboard = (data) => ({
  type: HYDRATE_DASHBOARD,
  data
});

export const usuarioById = (data) => ({
  type: HYDRATE_USUARIO_BY_ID,
  data
});

export const posicion = (data) => ({
  type: HYDRATE_POSICION,
  data
});

export const removerRol = (data) => ({
  type: REMOVE_ROL,
  data
});

export const agregarRol = (data) => ({
  type: ADD_ROL,
  data
});

export const patchUsuario = (data) => ({
  type: PATCH_USUARIO,
  data
});

// thunks
export const resetDashboard = () => (dispatch) => {
  const config = getNullConfig();

  axios
    .all([
      axios.get(api.usuarios, config),
      axios.get(api.comercios, config),
      axios.get(api.pedidos, config)
    ])
    .then(
      axios.spread((usuarios, comercios, pedidos) => ({
        usuarios: usuarios.data,
        comercios: comercios.data,
        pedidos: pedidos.data
      }))
    )
    .then((data) => {
      dispatch(dashboard(data));
    })
    .catch((err) => {
      if (err.response && err.response.status) {
        dispatch(queryError(getErrorResponse(err)));
      } else {
        dispatch(internalError(err));
      }
    });
  dispatch(clearUsuarioResult());
};

const fetchUsuarios = () => {
  const returnValue = { habilitados: 0, deshabilitados: 0 };

  returnValue.habilitados += Math.floor(Math.random() * 10 + 1);

  return returnValue;
};

const fetchComercios = () => {
  const returnValue = { habilitados: 0, deshabilitados: 0 };

  returnValue.habilitados += Math.floor(Math.random() * 10 + 1);

  return returnValue;
};

const fetchPedidos = (pedidosDelMes) => {
  if (pedidosDelMes) {
    const returnValue = {
      ventasHoy: 0,
      ventasMes: 0,
      pedidosEntregadosHoy: 0,
      pedidosEntregadosMes: 0,
      pedidosCanceladosHoy: 0,
      pedidosCanceladosMes: 0
    };
    const pedidos = {
      entregados: getLast30Days(),
      cancelados: getLast30Days()
    };
    const ventas = { entregados: getLast30Days(), cancelados: getLast30Days() };
    const diaDeHoy = moment();

    pedidosDelMes.map((pedido) => {
      const fechaPedido = moment(pedido.fecha, 'YYYY/MM/DD');
      const diasDiferencia = diaDeHoy.diff(fechaPedido, 'days');

      if (29 - diasDiferencia >= 0) {
        if (pedido.estado === 'Cancelado') {
          pedidos.cancelados[29 - diasDiferencia].y += 1;
          ventas.cancelados[29 - diasDiferencia].y += pedido.monto;
          if (diasDiferencia === 0) {
            returnValue.pedidosCanceladosHoy += 1;
            returnValue.pedidosCanceladosMes += 1;
          } else {
            returnValue.pedidosCanceladosMes += 1;
          }
        } else if (
          pedido.estado !== 'Cancelado' &&
          pedido.estado !== 'EnPreparacion' &&
          pedido.estado !== 'Ingresado' &&
          pedido.estado !== 'Despachado'
        ) {
          ventas.entregados[29 - diasDiferencia].y += pedido.monto;
          pedidos.entregados[29 - diasDiferencia].y += 1;
          if (diasDiferencia === 0) {
            returnValue.ventasHoy += pedido.monto;
            returnValue.ventasMes += pedido.monto;
            returnValue.pedidosEntregadosHoy += 1;
            returnValue.pedidosEntregadosMes += 1;
          } else {
            returnValue.ventasMes += pedido.monto;
            returnValue.pedidosEntregadosMes += 1;
          }
        }
      }
    });
    returnValue.pedidos = pedidos;
    returnValue.ventas = ventas;

    return returnValue;
  }

  return null;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_DASHBOARD:
      return {
        ...state,
        dashboardUsuarios: fetchUsuarios(action.data.usuarios),
        dashboardComercios: fetchComercios(action.data.comercios),
        dashboardPedidos: fetchPedidos(action.data.pedidos),
        activeSearch: true,
        alert: {}
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
    case CLEAR_USUARIO_RESULT:
      return { ...state, result: [], activeSearch: false };
    default:
      return state;
  }
};
