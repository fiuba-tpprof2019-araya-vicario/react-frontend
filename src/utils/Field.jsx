import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import MandatoryField from './forms/MandatoryField';

export default class Field extends React.Component {
  static propTypes = {
    controlId: PropTypes.string,
    validationState: PropTypes.bool,
    bsSize: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    inputComponent: PropTypes.element,
    validationMessage: PropTypes.string
  };

  render() {
    return (
      <FormGroup
        key={`${this.props.controlId}group`}
        validationState={this.props.validationState ? 'error' : null}
        controlId={this.props.controlId}
        bsSize={this.props.bsSize}
      >
        <ControlLabel key={`${this.props.controlId}label`}>
          {this.props.label}
          {this.props.required ? <MandatoryField /> : ''}
        </ControlLabel>
        {this.props.inputComponent}
        {this.props.validationState && (
          <HelpBlock key={`${this.props.controlId}help`} bsSize="small">
            {this.props.validationMessage}
          </HelpBlock>
        )}
      </FormGroup>
    );
  }
}
