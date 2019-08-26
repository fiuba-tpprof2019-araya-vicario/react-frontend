import PropTypes from 'prop-types';
import React from 'react';
import AcceptModal from '../../../utils/modals/AcceptModal';
import { requestMessages } from '../../../utils/messages';

export default class AcceptRequestModal extends React.Component {
  static propTypes = {
    onAccept: PropTypes.func,
    id: PropTypes.number
  };

  getRef() {
    return this.ref;
  }

  render() {
    return (
      <AcceptModal
        element="Requerimiento"
        id={this.props.id}
        onDelete={this.props.onAccept}
        message={requestMessages.ACCEPT_WARNING}
        ref={(modal) => {
          this.ref = modal;
        }}
      />
    );
  }
}
