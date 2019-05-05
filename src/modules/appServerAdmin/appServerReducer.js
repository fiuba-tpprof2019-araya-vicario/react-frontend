import { getConfig, getPostAppServerBody, api } from '../../api/apiInterfaceProvider'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'

const HYDRATE_APP_SERVERS = 'HYDRATE_APP_SERVERS'
const SET_ACTIVE_APP_SERVER = 'SET_ACTIVE_APP_SERVER'
const QUERY_ERROR = 'QUERY_ERROR'
const INTERNAL_ERROR = 'INTERNAL_ERROR'
const SET_ACTIVE_METRICS = 'SET_ACTIVE_METRICS'
const SET_UNACTIVE_METRICS = 'SET_UNACTIVE_METRICS'

const initialState = {
  appServers: [],
  alert: {},
  active: null,
  activeMetricsData: []
}

export const queryError = err => ({
  type: QUERY_ERROR, err
})

// 

export const internalError = err => ({
  type: INTERNAL_ERROR, err
})

// Action creators
export const hydrateAppServers = data => ({
  type: HYDRATE_APP_SERVERS, data
})

export const setActiveAppServer = id => ({
  type: SET_ACTIVE_APP_SERVER, id
})

export const setActiveMetricsData = data => ({
  type: SET_ACTIVE_METRICS, data
})

export const setUnactiveMetricsData = data => ({
  type: SET_UNACTIVE_METRICS, data
})


// Thunks
export const getAppServers = () => dispatch => {
  let config = getConfig()
  axios.get(api.appServers, config)
    .then(res => res.data)
    .then(data => {
      dispatch(hydrateAppServers(data))
    })
    .catch(err => {
      dispatch(queryError(err))
    })
}

export const fetchMetrics = (server) => dispatch => {
  let config = getConfig()
  axios.get(server.url + '/monitor/', config)
    .then(res => res.data)
    .then(data => {
      dispatch(setActiveMetricsData(data))
    })
    .catch(() => {
      dispatch(setUnactiveMetricsData(null))
    })
}

export const getAppServerDetail = (appServerId) => dispatch => {
  let config = getConfig()
  axios.get(api.appServers+'/'+appServerId, config)
    .then(res => res.data)
    .then(data => {
      dispatch(setActiveAppServer(appServerId))
      dispatch(fetchMetrics(data.Server))
    })
    .catch(err => {
      dispatch(queryError(err))
    })
}

export const createAppServer = (nombre, url) => dispatch => {
  let config = getConfig()
  let body = getPostAppServerBody(nombre, url)
  axios.post(api.appServers, body, config)
    .then(() => {
      dispatch(getAppServers())
    })
    .catch(err => {
      dispatch(queryError(err))
    })
}

export const deleteAppServer = (serverId) => dispatch =>{
  let config = getConfig()
  axios.delete(api.appServer(serverId), config)
    .then(res => res.data.data)
    .then(() => {
      dispatch(getAppServers())
    })
    .catch(err => {
      dispatch(queryError(err))
    })
} 

const fetchAppServersTable = (data) => {
  let returnValue = []
  data.map(function (rowObject) {
    returnValue.push({ id: rowObject.id, name: rowObject.name, url: rowObject.url, created_by: rowObject.created_by, created_at: rowObject.created_at })
  })
  return returnValue
}

const fetchAppServerById = (appServers, id) => {
  return _.find(appServers, { id: id })
}

const parseMetrics = (data) => {
  let returnValue = []
  if(data){
    for (let key in data) {
      let endpoints = data[key]
      endpoints.map(function (rowObject) {
        returnValue.push({
          x: moment(rowObject.day+' '+rowObject.hour+':00:00', 'YYYY-MM-DD HH:mm:ss').valueOf(),
          y: rowObject.hour
        })
      })
    }              
    returnValue.sort(function (a, b) {
      if (a.x > b.x) {
        return 1
      }
      if (a.x < b.x) {
        return -1
      }
      return 0
    })
  }
  return returnValue
}

export default (state = initialState, action) => {
  switch (action.type) {
  case HYDRATE_APP_SERVERS:
    return {
      ...state,
      appServers: fetchAppServersTable(action.data.Servers),
    }
  case SET_ACTIVE_APP_SERVER:
    return {
      ...state,
      active: fetchAppServerById(state.appServers, action.id)
    }
  case SET_ACTIVE_METRICS:
    return {
      ...state,
      activeMetricsData: parseMetrics(action.data)
    }
  case SET_UNACTIVE_METRICS:
    return {
      ...state,
      activeMetricsData: null
    }      
  default:
    return state
  }
}
