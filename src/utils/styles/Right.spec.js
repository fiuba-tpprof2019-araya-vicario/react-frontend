import { shallow } from 'enzyme';
import React from 'react';
import { Row } from 'react-bootstrap';
import Right from './Right';

describe('Right', () => {
  let rightElement;
  let children;

  context('when rendering right element', () => {
    before(() => {
      children = 'some boring text that nobody wanna see';
      rightElement = shallow(<Right>{children}</Right>).find(Row);
    });

    it('should render the principal row', () => {
      rightElement.exists().should.equal(true);
    });

    it('should modal have correct props', () => {
      rightElement.prop('align').should.equals('right');
      rightElement.prop('children').should.equals(children);
    });
  });
});
