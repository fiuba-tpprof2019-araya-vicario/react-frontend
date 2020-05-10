import { mount } from 'enzyme';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import MandatoryField from './MandatoryField';

describe('MandatoryField', () => {
  let overlayTrigger;
  let wrapper;

  context('when rendering component', () => {
    beforeEach(() => {
      wrapper = mount(<MandatoryField />);
      overlayTrigger = wrapper.find(OverlayTrigger);
    });

    it('should render overlay trigger component', () => {
      overlayTrigger.exists().should.equal(true);

      overlayTrigger
        .prop('overlay')
        .props.children.should.equal('Este campo es requerido');
      overlayTrigger.prop('overlay').props.id.should.equal('top');
      overlayTrigger.prop('placement').should.equal('top');
    });

    it('should not render tooltip', () => {
      const tooltip = wrapper.find(Tooltip);

      tooltip.exists().should.equal(false);
    });

    it('should render mandatory symbol', () => {
      const text = overlayTrigger.find('span');

      text.prop('style').should.deep.equal({ color: '#CB3837' });
      text.text().should.equal('*');
    });
  });
});
