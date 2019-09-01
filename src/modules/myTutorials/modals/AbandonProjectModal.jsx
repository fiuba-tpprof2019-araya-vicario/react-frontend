import PropTypes from 'prop-types';
import React from 'react';
import { myProjectMessages } from '../../../utils/messages';
import AbandonModal from '../../../utils/modals/AbandonModal';

export default class AbandonProjectModal extends React.Component {
  static propTypes = {
    onAbandon: PropTypes.func,
    id: PropTypes.number
  };

  getRef() {
    return this.ref;
  }

  render() {
    return (
      <AbandonModal
        element="Proyecto"
        id={this.props.id}
        onAbandon={this.props.onAbandon}
        message={myProjectMessages.ABANDON_WARNING}
        ref={(modal) => {
          this.ref = modal;
        }}
      />
    );
  }
}
