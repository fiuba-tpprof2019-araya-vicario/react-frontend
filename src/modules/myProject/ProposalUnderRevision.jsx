import PropTypes from 'prop-types';
import React from 'react';
import ShowIdea from '../../utils/components/ShowIdea';
import { myProjectMessages } from '../../utils/messages';

export default class ProposalUnderRevision extends React.Component {
  static propTypes = {
    project: PropTypes.object,
    userId: PropTypes.number,
    isUserCreator: PropTypes.bool
  };

  render() {
    const { project, userId, isUserCreator } = this.props;

    return (
      <ShowIdea
        nextStepMessage={
          myProjectMessages.NEW_STEP_PROPOSAL_UNDER_REVISION_INFO
        }
        project={project}
        userId={userId}
        isUserCreator={isUserCreator}
        showProposal
      />
    );
  }
}
