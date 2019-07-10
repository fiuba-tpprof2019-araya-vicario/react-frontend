import React from 'react';
import { FormGroup, ControlLabel } from 'react-bootstrap';

export default class Field extends React.Component {
  render() {
    return (
      <FormGroup key={this.props.controlId + 'group'} validationState={this.props.validationState} controlId={this.props.controlId} bsSize={this.props.bsSize}  >
        <ControlLabel key={this.props.controlId + 'label'}>{this.props.label}</ControlLabel>
        { this.props.inputComponent }
        {this.props.validationState == 'error' &&
        <HelpBlock key={this.props.controlId + 'help'} bsSize="small" >{this.props.validationMessage}</HelpBlock>}
      </FormGroup>
    );
  }
}