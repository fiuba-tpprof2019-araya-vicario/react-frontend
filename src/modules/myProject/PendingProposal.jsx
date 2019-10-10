import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from '../../utils/components/showIdea/ShowIdea';
import { myProjectMessages } from '../../utils/messages';

export default class PendingProposal extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    user: PropTypes.object,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func,
    uploadProposal: PropTypes.func,
    acceptProposal: PropTypes.func
  };

  render() {
    const {
      project,
      user,
      isUserCreator,
      showUploadIdeaModal,
      showAbandonIdeaModal,
      acceptProposal,
      uploadProposal
    } = this.props;

    return (
      <ShowIdea
        nextStepMessage={myProjectMessages.NEW_STEP_PROJECT_ACCEPTED_INFO}
        project={project}
        user={user}
        isUserCreator={isUserCreator}
        acceptProposal={acceptProposal}
        showProposal
        showAbandonButton
        showUploadIdeaModal={showUploadIdeaModal}
        showAbandonIdeaModal={showAbandonIdeaModal}
        uploadProposal={uploadProposal}
      />
    );
  }
}
