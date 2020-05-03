// import * as router from 'react-router-redux';
import configureStore from 'redux-mock-store';
import { expect } from 'chai';
import { CALL_HISTORY_METHOD } from 'react-router-redux';
import { thunk } from '../../../test/thunkMiddleware';
import {
  clearAlert,
  toggleLoading,
  queryError,
  internalError,
  successful,
  hydrateAlert,
  myProfile,
  loginError
} from './authReducer';

describe('authReducer', () => {
  const initialState = {};
  let storeSpy;
  let mockStore;
  let store;
  let expectedActions;

  beforeEach(() => {
    storeSpy = sinon.spy();
    mockStore = configureStore([thunk(storeSpy)]);
  });

  context('clearAlert', () => {
    it('should return correct values', () => {
      clearAlert().should.deep.equal({ type: 'CLEAR_ALERT' });
    });
  });

  context('toggleLoading', () => {
    it('should return correct values', () => {
      toggleLoading({ loading: false }).should.deep.equal({
        type: 'TOGGLE_LOADING',
        loading: false
      });
    });
  });

  context('queryError', () => {
    it('should return correct values', () => {
      queryError('query').should.deep.equal({
        type: 'QUERY_ERROR',
        error: 'query'
      });
    });
  });

  context('loginError', () => {
    it('should return correct values', () => {
      loginError('error').should.deep.equal({
        type: 'LOGIN_ERROR',
        error: 'error'
      });
    });
  });

  context('hydrateAlert', () => {
    it('should return correct values', () => {
      hydrateAlert('alert').should.deep.equal({
        type: 'HYDRATE_ALERT',
        alert: 'alert'
      });
    });
  });

  context('internalError', () => {
    it('should return correct values', () => {
      internalError('my-error').should.deep.equal({
        type: 'INTERNAL_ERROR',
        error: 'my-error'
      });
    });
  });

  context('successful', () => {
    it('should return correct values', () => {
      successful('random-text').should.deep.equal({
        type: 'SUCCESSFUL',
        text: 'random-text'
      });
    });
  });

  context('myProfile', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      expectedActions = [
        {
          type: CALL_HISTORY_METHOD,
          payload: {
            method: 'push',
            args: ['/my_user']
          }
        }
      ];

      return store.dispatch(myProfile());
    });

    it('executes expected actions', () =>
      expect(store.getActions()).to.be.deep.equal(expectedActions));

    it('executes expected actions', () =>
      expect(storeSpy.should.be.calledOnceWith({ type: 'MY_PROFILE' })));
  });
});
