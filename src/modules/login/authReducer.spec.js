import configureStore from 'redux-mock-store';
import axios from 'axios';
import { expect } from 'chai';
import { CALL_HISTORY_METHOD } from 'react-router-redux';
import { api } from '../../api/apiInterfaceProvider';
import { thunk } from '../../../test/thunkMiddleware';
import {
  clearAlert,
  toggleLoading,
  queryError,
  internalError,
  successful,
  hydrateAlert,
  myProfile,
  clearErrors,
  logout,
  loginUser,
  loginWithGoogle
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
    store = mockStore(initialState);
  });

  describe('clearAlert', () => {
    it('should return correct values', () => {
      clearAlert().should.deep.equal({ type: 'CLEAR_ALERT' });
    });
  });

  describe('toggleLoading', () => {
    it('should return correct values', () => {
      toggleLoading({ loading: false }).should.deep.equal({
        type: 'TOGGLE_LOADING',
        loading: false
      });
    });
  });

  describe('queryError', () => {
    it('should return correct values', () => {
      queryError('query').should.deep.equal({
        type: 'QUERY_ERROR',
        error: 'query'
      });
    });
  });

  describe('hydrateAlert', () => {
    it('should return correct values', () => {
      hydrateAlert('alert').should.deep.equal({
        type: 'HYDRATE_ALERT',
        alert: 'alert'
      });
    });
  });

  describe('internalError', () => {
    it('should return correct values', () => {
      internalError('my-error').should.deep.equal({
        type: 'INTERNAL_ERROR',
        error: 'my-error'
      });
    });
  });

  describe('successful', () => {
    it('should return correct values', () => {
      successful('random-text').should.deep.equal({
        type: 'SUCCESSFUL',
        text: 'random-text'
      });
    });
  });

  describe('clearErrors', () => {
    it('should return correct values', () => {
      clearErrors().should.deep.equal({ type: 'CLEAR_ERRORS' });
    });
  });

  describe('logout', () => {
    it('should return correct values', () => {
      logout().should.deep.equal({ type: 'LOGOUT_USER' });
    });
  });

  describe('myProfile', () => {
    beforeEach(() => {
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

  describe('loginUser', () => {
    const username = 'my.best@email.com';
    const password = 'asd1234';
    let promise;

    context('when can get the token from server', () => {
      beforeEach(() => {
        sinon.stub(axios, 'post').resolves({ data: { token: 'my-token' } });
        expectedActions = [
          {
            type: 'LOGIN_USER',
            data: { token: 'my-token', user: { email: username } }
          },
          {
            type: CALL_HISTORY_METHOD,
            payload: {
              method: 'push',
              args: ['/']
            }
          }
        ];

        promise = store.dispatch(loginUser(username, password));
      });

      it('axios should have been called', () =>
        axios.post.should.have.been.deep.calledOnceWith(api.login, {
          username,
          password
        }));

      it('executes expected actions', () =>
        promise.then(() =>
          expect(store.getActions()).to.deep.equals(expectedActions)
        ));
    });

    context('when fails to get the token', () => {
      beforeEach(() => {
        sinon.stub(axios, 'post').rejects({ error: 'some-funny-error' });
        expectedActions = [
          {
            type: 'LOGIN_ERROR',
            error: { error: 'some-funny-error' }
          }
        ];

        promise = store.dispatch(loginUser(username, password));
      });

      it('axios should have been called', () =>
        axios.post.should.have.been.deep.calledOnceWith(api.login, {
          username,
          password
        }));

      it('executes expected actions', () =>
        promise.then(() =>
          store.getActions().should.to.deep.equals(expectedActions)
        ));
    });
  });

  describe('loginWithGoogle', () => {
    const googleResponse = {
      tokenId: '1234',
      profileObj: { email: 'my.best@email.com', name: 'Messi' }
    };
    const user = {
      id: 'id',
      projectId: 'final-project',
      email: 'my.best@email.com',
      name: 'Messi',
      credentials: ['a', 'b', 'c'],
      careers: ['1', '2', '3'],
      interests: ['football', 'tennis']
    };
    let promise;

    context('when can get the token from server', () => {
      beforeEach(() => {
        sinon.stub(axios, 'post').resolves({
          data: { data: { token: '1234', ...user } }
        });
        expectedActions = [
          {
            type: 'LOGIN_USER',
            data: {
              token: '1234',
              user
            }
          },
          {
            type: CALL_HISTORY_METHOD,
            payload: {
              method: 'push',
              args: ['/']
            }
          }
        ];

        promise = store.dispatch(loginWithGoogle(googleResponse));
      });

      it('axios should have been called', () =>
        axios.post.should.have.been.deep.calledOnceWith(api.login, {
          id_token: googleResponse.tokenId,
          email: googleResponse.profileObj.email,
          name: googleResponse.profileObj.name
        }));

      it('executes expected actions', () =>
        promise.then(() =>
          expect(store.getActions()).to.deep.equals(expectedActions)
        ));
    });

    context('when fails to get the token', () => {
      beforeEach(() => {
        sinon.stub(axios, 'post').rejects({ error: 'some-funny-error' });
        expectedActions = [
          {
            type: 'LOGIN_ERROR',
            error: { error: 'some-funny-error' }
          }
        ];

        promise = store.dispatch(loginWithGoogle(googleResponse));
      });

      it('axios should have been called', () =>
        axios.post.should.have.been.deep.calledOnceWith(api.login, {
          id_token: googleResponse.tokenId,
          email: googleResponse.profileObj.email,
          name: googleResponse.profileObj.name
        }));

      it('executes expected actions', () =>
        promise.then(() =>
          store.getActions().should.to.deep.equals(expectedActions)
        ));
    });
  });
});
