import { getConfig, api } from '../../api/apiInterfaceProvider'
import { utilsMessages } from '../../utils/messages'
import axios from 'axios'

const CLEAR_ALERT = 'CLEAR_ALERT'
const HYDRATE_REQUESTS = 'HYDRATE_REQUESTS'
const QUERY_ERROR = 'QUERY_ERROR'
const TOGGLE_LOADING = 'TOGGLE_LOADING'

const initialState = {
  alert: null,
  loading: false,
  requests: null
}

const toggleLoading = ({ loading }) => ({
  type: TOGGLE_LOADING,
  loading
})

export const clearAlert = () => ({
  type: CLEAR_ALERT
})

export const queryError = err => ({
  type: QUERY_ERROR, err
})

export const hydrateRequests = data => ({
  type: HYDRATE_REQUESTS, data
})

export const getRequests = () => dispatch => {
  dispatch(toggleLoading({ loading: true }))
  let config = getConfig()
  axios.get(api.requests, config)
    .then(res => res.data.data)
    .then(data => {
      dispatch(toggleLoading({ loading: false }))
      dispatch(hydrateRequests(data))
    })
    .catch(err => {
      dispatch(toggleLoading({ loading: false }))
      dispatch(queryError(err))
    })
}

export const acceptRequest = (requestId) => dispatch => {
  dispatch(toggleLoading({ loading: true }))
  let config = getConfig()
  const body = {
    type: 'tutor',
    status: 'accepted'
  }
  axios.put(api.acceptRequest(requestId), body, config)
    .then(res => res.data.data)
    .then(data => {
      dispatch(toggleLoading({ loading: false }))
    })
    .catch(err => {
      dispatch(toggleLoading({ loading: false }))
      dispatch(queryError(err))
    })
}

export const rejectRequest = (requestId) => dispatch => {
  dispatch(toggleLoading({ loading: true }))
  let config = getConfig()
  const body = {
    type: 'tutor',
    status: 'rejected'
  }
  axios.put(api.rejectRequest(requestId), body, config)
    .then(res => res.data.data)
    .then(data => {
      dispatch(toggleLoading({ loading: false }))
    })
    .catch(err => {
      dispatch(toggleLoading({ loading: false }))
      dispatch(queryError(err))
    })
}

const fetchRequestTable = (data) => {
  let returnValue = []
  console.log('data request: ', data)
  data.map(function (rowObject) {
    returnValue.push({
      id: rowObject.id,
      creator: `${rowObject.User.name} ${rowObject.User.surname}`,
      project: rowObject.Project.name,
      created_at: rowObject.createdAt,
      updated_at: rowObject.updatedAt
    })
  })
  return returnValue
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE_REQUESTS:
      return {
        ...state,
        requests: fetchRequestTable(action.data)
      }
    case QUERY_ERROR:
      return {
        ...state,
        alert: {
          message: utilsMessages.QUERY_ERROR,
          style: 'danger',
          onDismiss: clearAlert
        }
      }
    case CLEAR_ALERT:
      return { ...state, alert: null }
    case TOGGLE_LOADING:
      return { ...state, loading: action.loading }
    default:
      return state
  }
}
