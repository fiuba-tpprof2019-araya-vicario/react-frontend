import PropTypes from 'prop-types';
import React from 'react';
import RejectModal from '../../../utils/modals/RejectModal';
import { requestMessages } from '../../../utils/messages';

export default class DeleteRequirementModal extends React.Component {
  static propTypes = {
    onReject: PropTypes.func,
    id: PropTypes.number
  };

  getRef() {
    return this.ref;
  }

  render() {
    return (
      <RejectModal
        element="Requerimiento"
        id={this.props.id}
        onDelete={this.props.onReject}
        message={requestMessages.REJECT_WARNING}
        ref={(modal) => {
          this.ref = modal;
        }}
      />
    );
  }
}
