/* Dependencies */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/* Import Other Reducers */
import authReducer from '../modules/login/authReducer';
import contactReducer from '../modules/contact/contactReducer';
import myProjectReducer from '../modules/myProject/myProjectReducer';
import userReducer from '../modules/user/userReducer';
import ideasReducer from '../modules/idea/ideasReducer';
import dashboardReducer from '../modules/dashboard/dashboardReducer';
import commissionsReducer from '../modules/commission/commissionsReducer';
import myTutorialsReducer from '../modules/myTutorials/myTutorialsReducer';
import myUserReducer from '../modules/myUser/myUserReducer';
import requestReducer from '../modules/request/requestReducer';
import requirementReducer from '../modules/requirement/requirementReducer';

/* Combine & Export Reducers to Store */
const appReducer = combineReducers({
  authReducer,
  contactReducer,
  dashboardReducer,
  myProjectReducer,
  userReducer,
  ideasReducer,
  commissionsReducer,
  myTutorialsReducer,
  myUserReducer,
  requestReducer,
  requirementReducer,
  routerReducer
});

const storeToken = (data) => {
  localStorage.setItem('token', data.token);
};

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER') {
    return appReducer(undefined, action);
  } else if (action.type === 'LOGIN_USER') {
    storeToken(action.data);
  }

  return appReducer(state, action);
};

export default rootReducer;
