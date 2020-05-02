import React from 'react';
import { mount } from 'enzyme';
// import { expect } from 'chai';
import Field from './Field';

describe('Field', () => {
  let fieldComponent;
  let controlId;
  let label;
  let validationState;
  let validationMessage;
  let bsSize;
  let required;
  let className;
  let information;
  let inputComponent;

  beforeEach(() => {
    controlId = 'control-id';
    label = 'label';
    validationState = 'error';
    validationMessage = 'message';
    bsSize = 'small';
    required = 'required';
    className = 'className';
    information = 'information';

    fieldComponent = mount(
      <Field
        controlId={controlId}
        label={label}
        bsSize={bsSize}
        required={required}
        className={className}
        information={information}
        validationState={validationState}
        validationMessage={validationMessage}
        inputComponent={<textarea value="value" />}
      />
    );

    // picker = pickerComponent.find(ChromePicker);
    // input = pickerComponent.find('input[data-test-id="picker-input"]');
    inputComponent = fieldComponent.find('textarea');
  });

  context('when rendering with all props', () => {
    it('should render input component', () => {
      inputComponent.exists().should.equal(true);
    });

    // it('should render ChromePicker hidden', () => {
    //   picker.exists().should.equal(false);
    // });

    // it('should render text input', () => {
    //   input.exists().should.equal(true);
    // });

    // it('input should have correct props', () => {
    //   input.prop('aria-invalid').should.equal(false);
    //   input.prop('aria-label').should.equal(label);
    // });

    // it('preview should have background', () => {
    //   const previewStyle = preview.at(0).prop('style');

    //   expect(previewStyle).to.have.property('backgroundColor', '#ffffff');
    // });
  });

  // context('when clicking color preview', () => {
  //   let pickerContainer;

  //   beforeEach(() => {
  //     preview.simulate('click');
  //     picker = pickerComponent.find(ChromePicker);
  //     pickerContainer = () =>
  //       pickerComponent.find('[data-test-id="picker-container"]');
  //   });

  //   it('picker should open', () => {
  //     picker.exists().should.equal(true);
  //   });

  //   it('renders a picker with css class to align from the left side', () => {
  //     expect(pickerContainer().prop('className')).to.include('align-left');
  //   });

  //   it('renders a picker with css class to align from the right side', () => {
  //     pickerComponent.setProps({ alignment: 'right' });

  //     expect(pickerContainer().prop('className')).to.include('align-right');
  //   });

  //   it('picker should hide', () => {
  //     preview.simulate('click');
  //     picker = pickerComponent.find(ChromePicker);
  //     picker.exists().should.equal(false);
  //   });
  // });
});
