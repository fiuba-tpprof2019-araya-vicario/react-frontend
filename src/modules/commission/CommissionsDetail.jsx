import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProject, approve, reprobate } from './commissionsReducer';
import { clearAlert } from '../login/authReducer';
import Title from '../../utils/Title';
import { commissionsMessages } from '../../utils/messages';
import { PROJECT_STEPS } from '../../utils/services/references';
import ShowIdea from '../../utils/components/showIdea/ShowIdea';
import history from '../../redux/history';

export class CommissionsDetail extends React.Component {
  static propTypes = {
    clearAlert: PropTypes.func,
    getProject: PropTypes.func,
    approveProposal: PropTypes.func,
    reprobateProposal: PropTypes.func,
    projectId: PropTypes.string,
    user: PropTypes.object,
    project: PropTypes.object
  };

  componentDidMount() {
    this.props.clearAlert();
    this.props.getProject(this.props.projectId);
  }

  render() {
    const { user, project, approveProposal, reprobateProposal } = this.props;

    return (
      <Fragment>
        <Title
          title={commissionsMessages.TITLE}
          subtitle={commissionsMessages.SUBTITLE}
        />
        <ShowIdea
          display-if={project.id}
          nextStepMessage={
            project.state_id === PROJECT_STEPS.PROPOSAL_UNDER_REVISION
              ? commissionsMessages.NEW_STEP_PROPOSAL_UNDER_REVISION_INFO
              : null
          }
          showBackButton
          showAcceptProposalButton={false}
          showProposal
          showApprovalButtons={
            project.state_id === PROJECT_STEPS.PROPOSAL_UNDER_REVISION
          }
          savePresentationVisibility={() => {}}
          approveProposal={approveProposal}
          reprobateProposal={reprobateProposal}
          project={project}
          user={user}
        />
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  getProject: (projectId) => {
    dispatch(getProject(projectId));
  },
  clearAlert: () => {
    dispatch(clearAlert());
  },
  approveProposal: (projectId, careerId) => {
    dispatch(approve(projectId, careerId, () => history.push('/commissions/')));
  },
  reprobateProposal: (projectId, careerId, rejectionReason) => {
    dispatch(
      reprobate(projectId, careerId, rejectionReason, () =>
        history.push('/commissions/')
      )
    );
  }
});

const mapStateToProps = (state, ownProps) => ({
  projectId: ownProps.match.params.id,
  project: state.commissionsReducer.project,
  user: state.authReducer.user
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatch
  )(CommissionsDetail)
);
