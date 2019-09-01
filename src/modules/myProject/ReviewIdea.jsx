import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from './ShowIdea';
import { myProjectMessages } from '../../utils/messages';

export default class ReviewIdea extends React.Component {
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
        nextStepMessage={myProjectMessages.NEW_STEP_PROJECT_CREATED_INFO}
        project={project}
        userId={userId}
        isUserCreator={isUserCreator}
        showUploadIdeaModal={showUploadIdeaModal}
        showAbandonIdeaModal={showAbandonIdeaModal}
      />
    );
  }
}
