import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from './ShowIdea';

export default class PendingProposal extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    userId: PropTypes.number,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func
  };

  render() {
    const {
      project,
      userId,
      isUserCreator,
      showUploadIdeaModal,
      showAbandonIdeaModal
    } = this.props;

    return (
      <ShowIdea
        project={project}
        userId={userId}
        isUserCreator={isUserCreator}
        showUploadIdeaModal={showUploadIdeaModal}
        showAbandonIdeaModal={showAbandonIdeaModal}
      />
    );
  }
}
