import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from '../../utils/components/showIdea/ShowIdea';
import { myProjectMessages } from '../../utils/messages';

export default class PendingPresentation extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    user: PropTypes.object,
    isUserCreator: PropTypes.bool
  };

  render() {
    const { project, user, isUserCreator } = this.props;

    return (
      <ShowIdea
        nextStepMessage={
          myProjectMessages.NEW_STEP_PROPOSAL_UNDER_REVISION_INFO
        }
        project={project}
        user={user}
        isUserCreator={isUserCreator}
        showProposal
      />
    );
  }
}
