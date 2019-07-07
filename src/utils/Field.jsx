import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export class Field extends React.Component {
  render() {
    return (
      <FormGroup validationState={this.props.validationState} controlId={this.props.controlId} bsSize={this.props.size}  >
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl key={this.props.controlKey} defaultValue={this.props.defaultValue} bsSize={this.props.size} type={this.props.type}
          readOnly={this.props.readOnly} disabled={this.props.disabled} />
      </FormGroup>
    );
  }
}