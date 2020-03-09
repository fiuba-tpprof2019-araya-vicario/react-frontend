import PropTypes from 'prop-types';
import React from 'react';
import EnableModal from '../../../modals/EnableModal';
import { requestMessages } from '../../../messages';

export default class EnablePresentationModal extends React.Component {
  static propTypes = {
    onEnable: PropTypes.func,
    projectId: PropTypes.number,
    name: PropTypes.string
  };

  getRef() {
    return this.ref;
  }

  render() {
    return (
      <EnableModal
        element="Presentación"
        projectId={this.props.projectId}
        action={this.props.onEnable}
        name={this.props.name}
        message={requestMessages.ENABLE_WARNING}
        ref={(modal) => {
          this.ref = modal;
        }}
      />
    );
  }
}
