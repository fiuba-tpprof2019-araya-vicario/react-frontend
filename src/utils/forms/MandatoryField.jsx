import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class MandatoryField extends React.Component {
  static propTypes = { key: PropTypes.string };
  static defaultProps = { key: 'mandatory-message' };

  render() {
    return (
      <OverlayTrigger
        key={this.props.key}
        placement="top"
        overlay={<Tooltip id="top">Este campo es requerido</Tooltip>}
      >
        <span style={{ color: '#CB3837' }}>*</span>
      </OverlayTrigger>
    );
  }
}
