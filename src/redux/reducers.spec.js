import { routerReducer } from 'react-router-redux';
import commissionsReducer from '../modules/commission/commissionsReducer';
import contactReducer from '../modules/contact/contactReducer';
import dashboardReducer from '../modules/dashboard/dashboardReducer';
import ideasReducer from '../modules/idea/ideasReducer';
import authReducer from '../modules/login/authReducer';
import myProjectReducer from '../modules/myProject/myProjectReducer';
import myTutorialsReducer from '../modules/myTutorials/myTutorialsReducer';
import myUserReducer from '../modules/myUser/myUserReducer';
import publicProjectsReducer from '../modules/publicProjects/publicProjectsReducer';
import requestReducer from '../modules/request/requestReducer';
import requirementReducer from '../modules/requirement/requirementReducer';
import userReducer from '../modules/user/userReducer';
import reducers from './reducers';

const combineReducers = (expectedState = {}, action = {}, $reducers) =>
  Object.keys($reducers).reduce(
    (accumulator, reducer) => ({
      ...accumulator,
      [reducer]: expectedState[reducer]
        ? expectedState[reducer]
        : $reducers[reducer](undefined, action)
    }),
    expectedState
  );

const getEmptyState = (expectedState, action) =>
  combineReducers(expectedState, action, {
    authReducer,
    contactReducer,
    dashboardReducer,
    myProjectReducer,
    userReducer,
    ideasReducer,
    commissionsReducer,
    myTutorialsReducer,
    publicProjectsReducer,
    myUserReducer,
    requestReducer,
    requirementReducer,
    routerReducer
  });

describe('reducers', () => {
  let initialState;
  let result;
  let expectedInitialState;
  let expectedState;
  let action;

  context('when type is empty', () => {
    beforeEach(() => {
      initialState = { authReducer: 'a', dashboardReducer: 'b' };
      expectedState = { authReducer: 'a', dashboardReducer: 'b' };
      action = {};
      expectedInitialState = getEmptyState(expectedState, action);
      result = reducers(initialState, action);
    });

    it('should return the the combined', () =>
      result.should.deep.equal(expectedInitialState));
  });

  context('when type is LOGOUT_USER', () => {
    beforeEach(() => {
      initialState = {
        ...getEmptyState(expectedState, action),
        contactReducer: { not: 'showingProp' }
      };
      expectedState = {};
      action = { type: 'LOGOUT_USER' };
      expectedInitialState = getEmptyState(expectedState, action);
      result = reducers(initialState, action);
    });

    it('should return the initial state', () =>
      result.should.deep.equal(expectedInitialState));
  });

  context('when type is LOGIN_USER', () => {
    beforeEach(() => {
      sinon.spy(localStorage, 'setItem');

      initialState = {};
      expectedState = {};
      action = { type: 'LOGIN_USER', data: { token: 'my-token' } };
      expectedInitialState = getEmptyState(expectedState, action);
      result = reducers(initialState, action);
    });

    it('should return the initial state with token', () =>
      result.should.deep.equal(expectedInitialState));

    it('should store the token in localStorage', () =>
      localStorage.setItem.should.have.been.calledOnceWith(
        'token',
        action.data.token
      ));
  });
});
