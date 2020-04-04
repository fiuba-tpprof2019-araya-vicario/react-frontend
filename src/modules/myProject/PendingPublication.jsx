import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from '../../utils/components/showIdea/ShowIdea';
import { myProjectMessages } from '../../utils/messages';

export default class PendingPublication extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    user: PropTypes.object,
    isUserCreator: PropTypes.bool,
    uploadPresentation: PropTypes.func,
    editPresentationData: PropTypes.func,
    uploadDocumentation: PropTypes.func
  };

  render() {
    const {
      project,
      user,
      isUserCreator,
      uploadPresentation,
      uploadDocumentation,
      editPresentationData
    } = this.props;

    return (
      <ShowIdea
        nextStepMessage={myProjectMessages.NEW_STEP_PENDING_PUBLICATION_INFO}
        project={project}
        user={user}
        isUserCreator={isUserCreator}
        showProposal
        showPresentation
        editPresentationData={editPresentationData}
        uploadPresentation={uploadPresentation}
        uploadDocumentation={uploadDocumentation}
      />
    );
  }
}
