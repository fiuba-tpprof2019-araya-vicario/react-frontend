import PropTypes from 'prop-types';
import React from 'react';
import DeleteModal from '../../../utils/modals/DeleteModal';
import { requirementMessages } from '../../../utils/messages';

export default class DeleteRequirementModal extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func,
    id: PropTypes.number
  };

  render() {
    return (
      <DeleteModal
        element="Requerimiento"
        id={this.props.id}
        onDelete={this.props.onDelete}
        message={requirementMessages.DELETE_WARNING}
        ref={(modal) => {
          this.ref = modal;
        }}
      />
    );
  }
}
