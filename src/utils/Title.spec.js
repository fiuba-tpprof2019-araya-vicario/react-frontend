import { mount } from 'enzyme';
import React from 'react';
import Title from './Title';

describe('Title', () => {
  let wrapper;
  let title;
  let subtitle;

  context('when have all props', () => {
    beforeEach(() => {
      title = 'my spectacular title';
      subtitle = 'my  not so spectacular subtitle';

      wrapper = mount(<Title title={title} subtitle={subtitle} />);
    });

    it('should render the title', () => {
      wrapper
        .find('[data-test-id="title"]')
        .exists()
        .should.equal(true);
    });

    it('should title have correct text', () => {
      wrapper
        .find('[data-test-id="title"]')
        .text()
        .should.equal(title);
    });

    it('should render the subtitle', () => {
      wrapper
        .find('[data-test-id="subtitle"]')
        .exists()
        .should.equal(true);
    });

    it('should subtitle have correct text', () => {
      wrapper
        .find('[data-test-id="subtitle"]')
        .text()
        .should.equal(subtitle);
    });
  });

  context('when have title only', () => {
    beforeEach(() => {
      title = 'my second spectacular title';
      subtitle = null;

      wrapper = mount(<Title title={title} subtitle={subtitle} />);
    });

    it('should render the title', () => {
      wrapper
        .find('[data-test-id="title"]')
        .exists()
        .should.equal(true);
    });

    it('should title have correct text', () => {
      wrapper
        .find('[data-test-id="title"]')
        .text()
        .should.equal(title);
    });

    it('should not render the subtitle', () => {
      wrapper
        .find('[data-test-id="subtitle"]')
        .exists()
        .should.equal(false);
    });
  });
});
