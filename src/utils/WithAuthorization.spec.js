import React from 'react';
import { mount } from 'enzyme';
import { WithAuthorization } from './WithAuthorization';

describe('WithAuthorization', () => {
  let wrapper;
  let requiredCredentials;
  let grantedCredentials;

  context('when have all credentials', () => {
    beforeEach(() => {
      requiredCredentials = ['a', 'b', 'c'];
      grantedCredentials = ['a', 'b', 'c', 'd'];

      wrapper = mount(
        <WithAuthorization
          requiredCredentials={requiredCredentials}
          grantedCredentials={grantedCredentials}
        >
          <textarea />
        </WithAuthorization>
      );
    });

    it('should render children component', () => {
      wrapper
        .find('textarea')
        .exists()
        .should.equal(true);
    });
  });

  context('when not having all credentials', () => {
    beforeEach(() => {
      requiredCredentials = ['a', 'b', 'c'];
      grantedCredentials = ['a', 'b', 'd'];

      wrapper = mount(
        <WithAuthorization
          requiredCredentials={requiredCredentials}
          grantedCredentials={grantedCredentials}
        >
          <textarea />
        </WithAuthorization>
      );
    });

    it('should not render children component', () => {
      wrapper
        .find('textarea')
        .exists()
        .should.equal(false);
    });
  });

  context('when required credentials is string', () => {
    beforeEach(() => {
      requiredCredentials = 'b';
      grantedCredentials = ['a', 'b', 'd'];

      wrapper = mount(
        <WithAuthorization
          requiredCredentials={requiredCredentials}
          grantedCredentials={grantedCredentials}
        >
          <textarea />
        </WithAuthorization>
      );
    });

    it('should render children component', () => {
      wrapper
        .find('textarea')
        .exists()
        .should.equal(true);
    });
  });

  context('when not have the required credential', () => {
    beforeEach(() => {
      requiredCredentials = 'b';
      grantedCredentials = [];

      wrapper = mount(
        <WithAuthorization
          requiredCredentials={requiredCredentials}
          grantedCredentials={grantedCredentials}
        >
          <textarea />
        </WithAuthorization>
      );
    });

    it('should not render children component', () => {
      wrapper
        .find('textarea')
        .exists()
        .should.equal(false);
    });
  });

  context('when there is no required credentials', () => {
    beforeEach(() => {
      requiredCredentials = null;
      grantedCredentials = ['a', 'b', 'd'];

      wrapper = mount(
        <WithAuthorization
          requiredCredentials={requiredCredentials}
          grantedCredentials={grantedCredentials}
        >
          <textarea />
        </WithAuthorization>
      );
    });

    it('should render children component', () => {
      wrapper
        .find('textarea')
        .exists()
        .should.equal(true);
    });
  });
});
