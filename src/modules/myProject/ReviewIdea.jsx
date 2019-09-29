import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from '../../utils/components/ShowIdea';
import { myProjectMessages } from '../../utils/messages';

export default class ReviewIdea extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    user: PropTypes.object,
    isUserCreator: PropTypes.bool,
    showUploadIdeaModal: PropTypes.func,
    showAbandonIdeaModal: PropTypes.func
  };

  render() {
    const {
      project,
      user,
      isUserCreator,
      showUploadIdeaModal,
      showAbandonIdeaModal
    } = this.props;

    return (
      <ShowIdea
        nextStepMessage={myProjectMessages.NEW_STEP_PROJECT_CREATED_INFO}
        project={project}
        user={user}
        isUserCreator={isUserCreator}
        showAbandonButton
        showUploadIdeaModal={showUploadIdeaModal}
        showAbandonIdeaModal={showAbandonIdeaModal}
      />
    );
  }
}
