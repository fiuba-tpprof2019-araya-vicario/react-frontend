/* Dependencies */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/* Import Other Reducers */
import authReducer from '../modules/login/authReducer';
import appServerReducer from '../modules/appServerAdmin/appServerReducer';
import filesReducer from '../modules/fileAdmin/fileReducer';


/* Combine & Export Reducers to Store */
const appReducer = combineReducers({
  authReducer: authReducer,
  appServerReducer: appServerReducer,
  filesReducer: filesReducer,
  routerReducer
});

const storeToken = (data) => {
  localStorage.setItem('token', data.token.token);
};

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = undefined;
  } else if (action.type === 'LOGIN_USER'){
    storeToken(action.data);
  }
  return appReducer(state, action);
};



export default rootReducer;