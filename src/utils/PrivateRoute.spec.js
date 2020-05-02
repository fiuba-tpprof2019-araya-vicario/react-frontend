import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

describe('PrivateRoute', () => {
  let wrapper;
  let requiredCredentials;
  let grantedCredentials;
  let isAuthenticated;

  const { location, history } = window;

  before(() => {
    delete window.location;
    delete window.history;
    window.location = { assign: sinon.spy(), replace: sinon.spy() };
    window.history = { replaceState: sinon.spy() };
  });

  afterEach(() => {
    window.location.assign.resetHistory();
  });

  after(() => {
    window.location = location;
    window.location = history;
  });

  context('when have all credentials', () => {
    const exact = true;
    const component = () => {};
    const path = '/my-path';

    beforeEach(() => {
      isAuthenticated = true;
      requiredCredentials = ['a', 'b', 'c'];
      grantedCredentials = ['a', 'b', 'c', 'd'];

      wrapper = mount(
        <BrowserRouter>
          <PrivateRoute
            exact={exact}
            component={component}
            path={path}
            isAuthenticated={isAuthenticated}
            requiredCredentials={requiredCredentials}
            grantedCredentials={grantedCredentials}
          />
        </BrowserRouter>
      );
    });

    it('should render the route component', () => {
      wrapper
        .find(Route)
        .exists()
        .should.equal(true);
    });

    it('should render have all correct params', () => {
      const route = wrapper.find(Route);

      route.prop('exact').should.equal(exact);
      route.prop('component').should.equal(component);
      route.prop('path').should.equal(path);
    });
  });

  context('when is not authenticated', () => {
    beforeEach(() => {
      isAuthenticated = false;
      requiredCredentials = ['a', 'b', 'c'];
      grantedCredentials = ['a', 'b', 'c', 'd'];

      wrapper = mount(
        <BrowserRouter>
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            requiredCredentials={requiredCredentials}
            grantedCredentials={grantedCredentials}
          />
        </BrowserRouter>
      );
    });

    it('should not render the route component', () => {
      wrapper
        .find(Route)
        .exists()
        .should.equal(false);
    });

    it('should called window.location.replace', () => {
      expect(window.location.replace.should.be.called);
    });

    it('should render have all correct params', () => {
      const route = wrapper.find(Redirect);

      route.prop('to').should.deep.equal({
        pathname: '/login',
        state: '/roles'
      });
    });
  });

  context('when does not have all required credentials', () => {
    beforeEach(() => {
      isAuthenticated = true;
      requiredCredentials = ['a', 'b', 'c'];
      grantedCredentials = ['a', 'b'];

      wrapper = mount(
        <BrowserRouter>
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            requiredCredentials={requiredCredentials}
            grantedCredentials={grantedCredentials}
          />
        </BrowserRouter>
      );
    });

    it('should not render the route component', () => {
      wrapper
        .find(Route)
        .exists()
        .should.equal(false);
    });

    it('should called window.location.replace', () => {
      expect(window.location.replace.should.be.called);
    });

    it('should render have all correct params', () => {
      const route = wrapper.find(Redirect);

      route.prop('to').should.deep.equal({ pathname: '/' });
    });
  });
});
