import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import MandatoryField from './MandatoryField';

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
        <ControlLabel
          display-if={!!this.props.label}
          key={`${this.props.controlId}label`}
        >
          {this.props.label}
          <MandatoryField display-if={this.props.required} />
        </ControlLabel>
        {this.props.inputComponent}
        <HelpBlock
          display-if={!!this.props.validationState}
          key={`${this.props.controlId}help`}
          bsSize="small"
        >
          {this.props.validationMessage}
        </HelpBlock>
      </FormGroup>
    );
  }
}
