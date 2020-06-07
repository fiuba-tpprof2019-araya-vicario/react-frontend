import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';
import MandatoryField from './MandatoryField';
import { getIconWithOverlay } from './StatusIcon';

export default class Field extends React.Component {
  static propTypes = {
    controlId: PropTypes.string,
    validationState: PropTypes.bool,
    bsSize: PropTypes.string,
    label: PropTypes.string,
    information: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    inputComponent: PropTypes.element,
    className: PropTypes.string,
    validationMessage: PropTypes.string
  };

  render() {
    const {
      controlId,
      validationState,
      label,
      bsSize,
      required,
      className,
      information,
      validationMessage,
      inputComponent
    } = this.props;
    const key = controlId || `${label}-input`;

    return (
      <FormGroup
        validationState={validationState ? 'error' : null}
        controlId={key}
        bsSize={bsSize}
        className={className}
      >
        <ControlLabel display-if={!!label} key={`${key}-label`}>
          {label}{' '}
          <MandatoryField key={`mandatory-${key}`} display-if={required} />
          {getIconWithOverlay(information, <i className="fa fa-info-circle" />)}
        </ControlLabel>
        {inputComponent}
        <HelpBlock
          display-if={!!validationState}
          key={`${key}-help`}
          bsSize="small"
        >
          {validationMessage}
        </HelpBlock>
      </FormGroup>
    );
  }
}
