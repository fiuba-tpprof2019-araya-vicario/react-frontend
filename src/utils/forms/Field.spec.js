import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import {
  FormGroup,
  ControlLabel,
  OverlayTrigger,
  HelpBlock
} from 'react-bootstrap';
import Field from './Field';
import MandatoryField from './MandatoryField';

describe('Field', () => {
  let fieldComponent;
  let controlId;
  let label;
  let formGroup;
  const onChange = () => {};

  context('when rendering with all props', () => {
    let inputComponent;
    let className;
    let bsSize;
    let controlLabel;

    beforeEach(() => {
      controlId = 'control-id';
      label = 'label';
      bsSize = 'small';
      className = 'className';

      fieldComponent = mount(
        <Field
          controlId={controlId}
          label={label}
          bsSize={bsSize}
          className={className}
          inputComponent={<textarea onChange={onChange} value="value" />}
        />
      );

      inputComponent = fieldComponent.find('textarea');
      formGroup = fieldComponent.find(FormGroup);
      controlLabel = fieldComponent.find(ControlLabel);
    });

    it('should render input component', () => {
      inputComponent.exists().should.equal(true);
    });

    it('should render formGroup component', () => {
      formGroup.exists().should.equal(true);
      const formGroupProps = formGroup.props();

      formGroupProps.bsSize.should.equal(bsSize);
      formGroupProps.className.should.equal(className);
    });

    it('should render controlLabel component', () => {
      controlLabel.exists().should.equal(true);
      expect(controlLabel.text()).to.contain(label);
    });
  });

  context('when rendering with required and information', () => {
    let controlLabel;
    let required;
    let information;
    let mandatoryField;
    let overlayTrigger;

    beforeEach(() => {
      label = 'label';
      information = 'information';
      required = true;

      fieldComponent = mount(
        <Field
          label={label}
          required={required}
          information={information}
          inputComponent={<textarea onChange={onChange} value="value" />}
        />
      );

      formGroup = fieldComponent.find(FormGroup);
      controlLabel = fieldComponent.find(ControlLabel);
      mandatoryField = fieldComponent.find(MandatoryField);
      overlayTrigger = fieldComponent.find(OverlayTrigger);
    });

    it('should render formGroup component', () => {
      formGroup.exists().should.equal(true);
    });

    it('should render controlLabel component', () => {
      controlLabel.exists().should.equal(true);
      controlLabel.should.have.lengthOf(1);
      expect(controlLabel.text()).to.contain(label);
    });

    it('should render mandatoryField component', () => {
      mandatoryField.exists().should.equal(true);
    });

    it('should render overlayTrigger component', () => {
      overlayTrigger.exists().should.equal(true);
    });
  });

  context('when rendering with error', () => {
    let validationState;
    let validationMessage;
    let helpBlock;

    beforeEach(() => {
      validationState = true;
      validationMessage = 'a message';

      fieldComponent = mount(
        <Field
          validationState={validationState}
          validationMessage={validationMessage}
          inputComponent={<textarea onChange={onChange} value="value" />}
        />
      );

      helpBlock = fieldComponent.find(HelpBlock);
    });

    it('should render helpBlock component', () => {
      helpBlock.exists().should.equal(true);
      helpBlock.prop('children').should.equal(validationMessage);
      helpBlock.prop('bsSize').should.equal('small');
    });
  });
});
