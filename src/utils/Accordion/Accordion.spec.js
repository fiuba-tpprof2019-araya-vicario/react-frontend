import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Accordion from './Accordion';

describe('Accordion', () => {
  let wrapper;
  let title;
  let children;
  let expanded;
  let annexes;

  context('when annexes it empty', () => {
    before(() => {
      title = 'my spectacular title';
      children = <span>hello</span>;
      expanded = true;
      annexes = [];

      wrapper = mount(
        <Accordion expanded={expanded} title={title} annexes={annexes}>
          {children}
        </Accordion>
      );
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
        .should.include(title);
    });

    it('should has the correct className', () => {
      wrapper
        .find(FontAwesomeIcon)
        .prop('className')
        .should.deep.equals('expanded');
    });

    it('should icon be the correct', () => {
      wrapper
        .find(FontAwesomeIcon)
        .prop('icon')
        .should.deep.equals(faChevronDown);
    });

    it('should the correct body', () => {
      wrapper
        .find(Panel.Body)
        .prop('children')
        .should.equal(children);
    });

    it('should not have any annexes', () => {
      expect(wrapper.find(ListGroup).length).to.equal(0);
    });
  });

  context('when having more than one annexed', () => {
    before(() => {
      title = 'my spectacular title';
      children = <span>hello</span>;
      expanded = false;
      annexes = [<span>a</span>, <span>b</span>, <span>c</span>];

      wrapper = mount(
        <Accordion expanded={expanded} title={title} annexes={annexes}>
          {children}
        </Accordion>
      );
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
        .should.include(title);
    });

    it('should has the correct className', () => {
      wrapper
        .find(FontAwesomeIcon)
        .prop('className')
        .should.deep.equals('closed');
    });

    it('should icon be the correct', () => {
      wrapper
        .find(FontAwesomeIcon)
        .prop('icon')
        .should.deep.equals(faChevronDown);
    });

    it('should the correct body', () => {
      wrapper
        .find(Panel.Body)
        .prop('children')
        .should.equal(children);
    });

    it('should have three annexes', () => {
      const listGroupItems = wrapper.find(ListGroupItem);

      expect(listGroupItems.length).to.equal(3);
      listGroupItems
        .at(0)
        .prop('children')
        .should.equals(annexes[0]);
      listGroupItems
        .at(1)
        .prop('children')
        .should.equals(annexes[1]);
      listGroupItems
        .at(2)
        .prop('children')
        .should.equals(annexes[2]);
    });
  });
});
