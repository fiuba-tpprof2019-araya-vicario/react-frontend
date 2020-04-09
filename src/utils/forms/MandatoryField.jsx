import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class MandatoryField extends React.Component {
  render() {
    return (
      <OverlayTrigger
        key="mandatory-message"
        placement="top"
        overlay={<Tooltip id="top">Este campo es requerido</Tooltip>}
      >
        <span style={{ color: '#CB3837' }}>*</span>
      </OverlayTrigger>
    );
  }
}
