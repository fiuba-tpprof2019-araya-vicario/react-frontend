import { mount } from 'enzyme';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FullRow from './FullRow';

describe('FullRow', () => {
  let wrapper;
  let children;
  let id;

  context('when having more than one children', () => {
    beforeEach(() => {
      children = [<p />, <textarea />, 'simple text'];
      id = 'the-id-of-my-element';

      wrapper = mount(<FullRow id={id}>{children}</FullRow>);
    });

    it('should render principal row', () => {
      wrapper
        .find(Row)
        .exists()
        .should.equal(true);
    });

    it('should have correct children amount', () => {
      wrapper.find(Col).should.have.lengthOf(children.length);
    });

    it('should all children with correct props', () => {
      const items = wrapper.find(Col);

      items.forEach((item, index) => {
        item.prop('sm').should.equals(4);
        item.prop('md').should.equals(4);
        item.prop('lg').should.equals(4);
        item.prop('children').should.equals(children[index]);
      });
    });
  });

  context('when having exact one children', () => {
    beforeEach(() => {
      children = <p />;
      id = 'the-id-of-my-element';

      wrapper = mount(<FullRow id={id}>{children}</FullRow>);
    });

    it('should render principal row', () => {
      wrapper
        .find(Row)
        .exists()
        .should.equal(true);
    });

    it('should render the only col', () => {
      wrapper
        .find(Col)
        .exists()
        .should.equal(true);
    });

    it('should all children with correct props', () => {
      const item = wrapper.find(Col);

      item.prop('sm').should.equals(12);
      item.prop('md').should.equals(12);
      item.prop('lg').should.equals(12);
      item.prop('children').should.equals(children);
    });
  });
});
