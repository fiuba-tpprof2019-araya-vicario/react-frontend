import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { STATES } from '../services/references';
import * as statusIcon from './StatusIcon';

describe('StatusIcon', () => {
  describe('getStatusIcon', () => {
    const type = 'my type';
    const element = 'my element';
    let status;
    let overlayTrigger;
    let wrapper;

    context('when rendering accepted icon', () => {
      beforeEach(() => {
        status = STATES.accepted;
        wrapper = mount(statusIcon.getStatusIcon(type, status, element));
        overlayTrigger = wrapper.find(OverlayTrigger);
      });

      it('should render overlay trigger component', () => {
        overlayTrigger.exists().should.equal(true);

        overlayTrigger
          .prop('overlay')
          .props.children.should.equal('El my type ha aceptado la my element');
        overlayTrigger.prop('overlay').props.id.should.equal('top');
        overlayTrigger.prop('placement').should.equal('top');
      });

      it('should not render tooltip', () => {
        const tooltip = wrapper.find(Tooltip);

        tooltip.exists().should.equal(false);
      });

      it('should render content icon', () => {
        const text = overlayTrigger.find('[data-test-id="icon"]');

        text.prop('className').should.equals('fa fa-check action successText');
        text.text().should.equal('');
      });
    });

    context('when rendering rejected icon', () => {
      beforeEach(() => {
        status = STATES.rejected;
        wrapper = mount(statusIcon.getStatusIcon(type, status, element));
        overlayTrigger = wrapper.find(OverlayTrigger);
      });

      it('should render overlay trigger component', () => {
        overlayTrigger.exists().should.equal(true);

        overlayTrigger
          .prop('overlay')
          .props.children.should.equal('El my type ha rechazado la my element');
        overlayTrigger.prop('overlay').props.id.should.equal('top');
        overlayTrigger.prop('placement').should.equal('top');
      });

      it('should not render tooltip', () => {
        const tooltip = wrapper.find(Tooltip);

        tooltip.exists().should.equal(false);
      });

      it('should render content icon', () => {
        const text = overlayTrigger.find('[data-test-id="icon"]');

        text
          .prop('className')
          .should.equals('fa fa-times-circle action dangerText');
        text.text().should.equal('');
      });
    });

    context('when rendering pending icon', () => {
      beforeEach(() => {
        status = STATES.pending;
        wrapper = mount(statusIcon.getStatusIcon(type, status, element));
        overlayTrigger = wrapper.find(OverlayTrigger);
      });

      it('should render overlay trigger component', () => {
        overlayTrigger.exists().should.equal(true);

        overlayTrigger
          .prop('overlay')
          .props.children.should.equal(
            'El my type todavía no ha aceptado la my element'
          );
        overlayTrigger.prop('overlay').props.id.should.equal('top');
        overlayTrigger.prop('placement').should.equal('top');
      });

      it('should not render tooltip', () => {
        const tooltip = wrapper.find(Tooltip);

        tooltip.exists().should.equal(false);
      });

      it('should render content icon', () => {
        const text = overlayTrigger.find('[data-test-id="icon"]');

        text
          .prop('className')
          .should.equals('fa fa-clock-o action warningText');
        text.text().should.equal('');
      });
    });
  });

  describe('getIconWithOverlay', () => {
    const message = 'this is my best message';
    const icon = <br />;
    const placement = 'left';
    let overlayTrigger;
    let wrapper;

    context('when passing all props', () => {
      beforeEach(() => {
        wrapper = mount(
          statusIcon.getIconWithOverlay(message, icon, placement)
        );
        overlayTrigger = wrapper.find(OverlayTrigger);
      });

      it('should render overlay trigger component', () => {
        overlayTrigger.exists().should.equal(true);

        overlayTrigger
          .prop('overlay')
          .props.children.should.equal('this is my best message');
        overlayTrigger.prop('overlay').props.id.should.equal('left');
        overlayTrigger.prop('placement').should.equal('left');
      });

      it('should not render tooltip', () => {
        const tooltip = wrapper.find(Tooltip);

        tooltip.exists().should.equal(false);
      });

      it('should render content icon', () => {
        overlayTrigger
          .find('br')
          .exists()
          .should.equal(true);
      });
    });

    context('when passing no message', () => {
      beforeEach(() => {
        wrapper = statusIcon.getIconWithOverlay('', icon, placement);
      });

      it('should render empty', () => {
        expect(wrapper).to.equal(null);
      });
    });
  });
});
