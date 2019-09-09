import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from '../../utils/components/ShowIdea';
import { myProjectMessages } from '../../utils/messages';

export default class PendingProposal extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    userId: PropTypes.number,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func,
    uploadProposalUrl: PropTypes.func
  };

  render() {
    const {
      project,
      userId,
      isUserCreator,
      showUploadIdeaModal,
      showAbandonIdeaModal,
      uploadProposalUrl
    } = this.props;

    return (
      <ShowIdea
        nextStepMessage={myProjectMessages.NEW_STEP_PROJECT_CREATED_INFO}
        project={project}
        userId={userId}
        isUserCreator={isUserCreator}
        showProposal
        showAbandonButton
        showUploadIdeaModal={showUploadIdeaModal}
        showAbandonIdeaModal={showAbandonIdeaModal}
        uploadProposalUrl={uploadProposalUrl}
      />
    );
  }
}
