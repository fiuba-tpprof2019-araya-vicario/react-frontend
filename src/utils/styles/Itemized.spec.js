import { mount } from 'enzyme';
import React from 'react';
import { Row } from 'react-bootstrap';
import Itemized from './Itemized';

describe('Itemized', () => {
  let wrapper;
  let items;
  let title;

  context('when rendering with correct props', () => {
    before(() => {
      items = ['first text', 'maybe the second', 'and here comes the third'];
      title = 'The adventures of Tom Sayer';

      wrapper = mount(<Itemized title={title} items={items} />);
    });

    it('should render principal row', () => {
      wrapper
        .find(Row)
        .exists()
        .should.equal(true);
    });

    it('should render the correct title', () => {
      const titleElement = wrapper.find('[data-test-id="items-title"]');

      titleElement.exists().should.equal(true);
      titleElement.text().should.equal(title);
    });

    it('should render the item list', () => {
      const titleElement = wrapper.find('[data-test-id="items-list"]');

      titleElement.exists().should.equal(true);
      titleElement.prop('style').should.deep.equals({ listStyleType: 'disc' });
      titleElement.prop('children').should.have.lengthOf(3);

      const list = titleElement.prop('children');

      list[0].key.should.equals(`item-0`);
      list[0].props.children.should.equals(items[0]);
      list[1].key.should.equals(`item-1`);
      list[1].props.children.should.equals(items[1]);
      list[2].key.should.equals(`item-2`);
      list[2].props.children.should.equals(items[2]);
    });
  });
});
